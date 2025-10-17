// src/data/rooms.ts
type SymbolId = "muji" | "cream" | "industrial" | "minimal";
export type Room = {
  id: string;
  image: string;
  title: string;
  style: SymbolId;
  isUgly: boolean;
};

export const rooms: Room[] = [
  // 日式無印 (muji) — 5 組漂亮 / 醜
  { id: "muji1-pretty", image: "/rooms/muji1_pretty.jpg", title: "無印房間1", style: "muji", isUgly: false },
  { id: "muji1-ugly",   image: "/rooms/muji1_ugly.jpg",   title: "無印房間1（醜）", style: "muji", isUgly: true  },
  { id: "muji2-pretty", image: "/rooms/muji2_pretty.jpg", title: "無印房間2", style: "muji", isUgly: false },
  { id: "muji2-ugly",   image: "/rooms/muji2_ugly.jpg",   title: "無印房間2（醜）", style: "muji", isUgly: true  },
  // ...繼續 muji3/4/5 pretties & uglies

  // 奶油雲朵 (cream) — 5 組漂亮 / 醜
  { id: "cream1-pretty", image: "/rooms/cream1_pretty.jpg", title: "奶油房間1", style: "cream", isUgly: false },
  { id: "cream1-ugly",   image: "/rooms/cream1_ugly.jpg",   title: "奶油房間1（醜）", style: "cream", isUgly: true  },
  // ...cream2/3/4/5 pretties & uglies

  // 工業 (industrial) — 5 組
  { id: "industrial1-pretty", image: "/rooms/industrial1_pretty.jpg", title: "工業房間1", style: "industrial", isUgly: false },
  { id: "industrial1-ugly",   image: "/rooms/industrial1_ugly.jpg",   title: "工業房間1（醜）", style: "industrial", isUgly: true  },
  // ...industrial2/3/4/5 pretties & uglies

  // 極簡 (minimal) — 5 組
  { id: "minimal1-pretty", image: "/rooms/minimal1_pretty.jpg", title: "極簡房間1", style: "minimal", isUgly: false },
  { id: "minimal1-ugly",   image: "/rooms/minimal1_ugly.jpg",   title: "極簡房間1（醜）", style: "minimal", isUgly: true  },
  // ...minimal2/3/4/5 pretties & uglies
];
