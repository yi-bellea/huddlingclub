-- Supabase SQL Editor에서 한 번 실행합니다.
-- 이전에 만든 invitations/rsvps 테이블에도 적용할 수 있습니다.

create table if not exists public.invitations (
  id text primary key,
  title text not null,
  "dateTime" text not null,
  location text not null,
  body text not null,
  "hostSecretHash" text
);

create table if not exists public.rsvps (
  id text primary key,
  "invitationId" text not null references public.invitations(id),
  name text not null,
  attendance text not null check (attendance in ('yes', 'no')),
  "companionCount" integer not null check ("companionCount" between 0 and 20)
);

-- 일시 입력창은 '2027년 9월 15일 오후 3시' 같은 문장도 받습니다.
alter table public.invitations
  alter column "dateTime" type text using "dateTime"::text;
alter table public.invitations
  add column if not exists "hostSecretHash" text;

create index if not exists rsvps_invitation_id_idx
  on public.rsvps ("invitationId");

alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;

-- 앞서 제공한 공개 응답 조회 정책을 제거합니다.
drop policy if exists "Anyone can read invitations" on public.invitations;
drop policy if exists "Anyone can create invitations" on public.invitations;
drop policy if exists "Anyone can read RSVPs" on public.rsvps;
drop policy if exists "Anyone can create RSVPs" on public.rsvps;

revoke all on table public.invitations, public.rsvps from public, anon, authenticated;
grant select (id, title, "dateTime", location, body)
  on public.invitations to anon, authenticated;
grant insert on public.invitations to anon, authenticated;
grant insert on public.rsvps to anon, authenticated;

create policy "Anyone can read invitations"
  on public.invitations for select to anon, authenticated using (true);
create policy "Anyone can create invitations"
  on public.invitations for insert to anon, authenticated with check (true);
create policy "Anyone can create RSVPs"
  on public.rsvps for insert to anon, authenticated with check (true);

-- 비공개 링크의 키를 확인한 뒤에만 응답 목록을 반환합니다.
create or replace function public.get_host_responses(
  p_invitation_id text,
  p_host_secret text
)
returns setof public.rsvps
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.invitations i
    where i.id = p_invitation_id
      and i."hostSecretHash" = encode(sha256(convert_to(p_host_secret, 'UTF8')), 'hex')
  ) then
    raise exception 'Invalid host link' using errcode = 'P0001';
  end if;

  return query
    select r.* from public.rsvps r
    where r."invitationId" = p_invitation_id;
end;
$$;

revoke all on function public.get_host_responses(text, text) from public;
grant execute on function public.get_host_responses(text, text) to anon, authenticated;
