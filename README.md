# Huddling Club

Next.js App Router, TypeScript 5, Tailwind CSS v4로 구성한 기본 프로젝트입니다.

## Supabase 설정

Supabase SQL Editor에서 [`supabase/setup.sql`](supabase/setup.sql)을 실행합니다.
로컬 개발에서는 `.env.local`에 아래 두 값을 넣습니다.

```dotenv
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

배포 서비스에도 같은 이름으로 두 환경 변수를 등록합니다. `.env.local`은 Git에 올리지 않습니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000/create>를 여세요.

## 확인 명령어

```bash
npm run typecheck
npm run lint
npm run build
```
