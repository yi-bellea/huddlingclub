export const meonjiInvitation = {
  name: "먼지",
  age: 11,
  title: "먼지의 11번째 생일파티",
  birthday: "2027-09-15",
  partyTime: null as string | null,
  place: null as string | null,
  address: null as string | null,
  dressCode: "편하게 와. 예쁘게 웃어주면 더 좋아.",
  invitation: {
    title: "그래서 말인데...",
    paragraphs: [
      "이번에 내 생일파티를 하기로 했어!",
      "케이크도 있고,\n맛있는 것도 있고,\n나도 있어.",
      "사실 사람들이 많이 오면\n조금 부끄러울지도 몰라.",
      "그래도...\n너는 와줬으면 좋겠어.",
    ],
    emphasis: "나랑 생일 같이 보내줄래?",
  },
  rsvp: {
    title: "그래서... 올 거야?",
    paragraphs: [
      "나 기다리는 거 잘해.",
      "근데 네가 오는지 알면\n꼬리를 조금 더 흔들 것 같아.",
    ],
    attendingLabel: "먼지 보러 갈게! 🐾",
    notAttendingLabel: "미안해, 먼지야 ㅠㅠ",
    attendingMessage: "진짜 오는 거야?!\n\n나 지금 꼬리 흔드는 중!\n\n그날 만나자. 약속이야! 🐶",
    notAttendingMessage: "아쉽지만 괜찮아.\n\n다음에 만나면\n많이 예뻐해 줘야 해.",
  },
  closing: {
    title: "와주면 참 좋겠다.",
    paragraphs: [
      "그날은 내가 주인공이지만,\n네가 오면 더 특별한 날이 될 것 같아.",
      "선물은 괜찮아.",
    ],
  },
} as const;

// 실제 먼지 사진을 public/meonji/에 넣고 경로와 설명을 등록하면 갤러리에 표시됩니다.
export const meonjiPhotos: { src: string; alt: string }[] = [];

export function getBirthdayLabel() {
  const [year, month, day] = meonjiInvitation.birthday.split("-").map(Number);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    weekday: "short",
  }).format(new Date(Date.UTC(year, month - 1, day)));
  return `${year}. ${String(month).padStart(2, "0")}. ${String(day).padStart(2, "0")}. ${weekday.toUpperCase()}`;
}

export type BirthdayCountdown =
  | { state: "upcoming"; days: number; hours: number; minutes: number }
  | { state: "birthday" }
  | { state: "past" };

// 행사 시간은 미정이므로 한국 시간 기준 생일 날짜가 시작되는 시각까지 계산합니다.
export function getBirthdayCountdown(now = new Date()): BirthdayCountdown {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const number = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const year = number("year");
  const month = number("month");
  const day = number("day");
  const today = Date.UTC(year, month - 1, day);
  const [birthdayYear, birthdayMonth, birthdayDay] = meonjiInvitation.birthday.split("-").map(Number);
  const birthday = Date.UTC(birthdayYear, birthdayMonth - 1, birthdayDay);

  if (today > birthday) return { state: "past" };
  if (today === birthday) return { state: "birthday" };

  const minutesRemaining = Math.max(
    0,
    Math.floor((birthday - Date.UTC(year, month - 1, day, number("hour"), number("minute"))) / 60_000),
  );

  return {
    state: "upcoming",
    days: Math.round((birthday - today) / 86_400_000),
    hours: Math.floor(minutesRemaining / 60) % 24,
    minutes: minutesRemaining % 60,
  };
}
