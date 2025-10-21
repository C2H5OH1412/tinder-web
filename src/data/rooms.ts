// src/data/rooms.ts
type SymbolId = "muji" | "cream" | "industrial" | "minimal";

export type Room = {
  id: string;
  image: string;
  title: string;
  style: SymbolId;
  isUgly: boolean;
  // 新增
  price: number; // TWD / Month
  location: { city: string; district: string };
};

/**
 * 先保留你原本的 40 筆資料（不含 price/location）
 * 順序不要變，等下會依序把地點與價格套進去（每 2 筆為一組：pretty/ugly）
 */
type BaseRoom = Omit<Room, "price" | "location">;

const baseRooms: BaseRoom[] = [
  // 日式無印 (muji) — 5 組漂亮 / 醜
  { id: "muji1-pretty", image: "/rooms/muji1_pretty.png", title: "無印房間1", style: "muji", isUgly: false },
  { id: "muji1-ugly",   image: "/rooms/muji1_ugly.png",   title: "無印房間1（醜）", style: "muji", isUgly: true  },
  { id: "muji2-pretty", image: "/rooms/muji2_pretty.png", title: "無印房間2", style: "muji", isUgly: false },
  { id: "muji2-ugly",   image: "/rooms/muji2_ugly.png",   title: "無印房間2（醜）", style: "muji", isUgly: true  },
  { id: "muji3-pretty", image: "/rooms/muji3_pretty.png", title: "無印房間3", style: "muji", isUgly: false },
  { id: "muji3-ugly",   image: "/rooms/muji3_ugly.png",   title: "無印房間3（醜）", style: "muji", isUgly: true  },
  { id: "muji4-pretty", image: "/rooms/muji4_pretty.png", title: "無印房間4", style: "muji", isUgly: false },
  { id: "muji4-ugly",   image: "/rooms/muji4_ugly.png",   title: "無印房間4（醜）", style: "muji", isUgly: true  },
  { id: "muji5-pretty", image: "/rooms/muji5_pretty.png", title: "無印房間5", style: "muji", isUgly: false },
  { id: "muji5-ugly",   image: "/rooms/muji5_ugly.png",   title: "無印房間5（醜）", style: "muji", isUgly: true  },

  // 奶油雲朵 (cream) — 5 組漂亮 / 醜
  { id: "cream1-pretty", image: "/rooms/cream1_pretty.png", title: "奶油房間1", style: "cream", isUgly: false },
  { id: "cream1-ugly",   image: "/rooms/cream1_ugly.png",   title: "奶油房間1（醜）", style: "cream", isUgly: true  },
  { id: "cream2-pretty", image: "/rooms/cream2_pretty.png", title: "奶油房間2", style: "cream", isUgly: false },
  { id: "cream2-ugly",   image: "/rooms/cream2_ugly.png",   title: "奶油房間2（醜）", style: "cream", isUgly: true  },
  { id: "cream3-pretty", image: "/rooms/cream3_pretty.png", title: "奶油房間3", style: "cream", isUgly: false },
  { id: "cream3-ugly",   image: "/rooms/cream3_ugly.png",   title: "奶油房間3（醜）", style: "cream", isUgly: true  },
  { id: "cream4-pretty", image: "/rooms/cream4_pretty.png", title: "奶油房間4", style: "cream", isUgly: false },
  { id: "cream4-ugly",   image: "/rooms/cream4_ugly.png",   title: "奶油房間4（醜）", style: "cream", isUgly: true  },
  { id: "cream5-pretty", image: "/rooms/cream5_pretty.png", title: "奶油房間5", style: "cream", isUgly: false },
  { id: "cream5-ugly",   image: "/rooms/cream5_ugly.png",   title: "奶油房間5（醜）", style: "cream", isUgly: true  },

  // 工業 (industrial) — 5 組
  { id: "industrial1-pretty", image: "/rooms/industrial1_pretty.png", title: "工業房間1", style: "industrial", isUgly: false },
  { id: "industrial1-ugly",   image: "/rooms/industrial1_ugly.png",   title: "工業房間1（醜）", style: "industrial", isUgly: true  },
  { id: "industrial2-pretty", image: "/rooms/industrial2_pretty.png", title: "工業房間2", style: "industrial", isUgly: false },
  { id: "industrial2-ugly",   image: "/rooms/industrial2_ugly.png",   title: "工業房間2（醜）", style: "industrial", isUgly: true  },
  { id: "industrial3-pretty", image: "/rooms/industrial3_pretty.png", title: "工業房間3", style: "industrial", isUgly: false },
  { id: "industrial3-ugly",   image: "/rooms/industrial3_ugly.png",   title: "工業房間3（醜）", style: "industrial", isUgly: true  },
  { id: "industrial4-pretty", image: "/rooms/industrial4_pretty.png", title: "工業房間4", style: "industrial", isUgly: false },
  { id: "industrial4-ugly",   image: "/rooms/industrial4_ugly.png",   title: "工業房間4（醜）", style: "industrial", isUgly: true  },
  { id: "industrial5-pretty", image: "/rooms/industrial5_pretty.png", title: "工業房間5", style: "industrial", isUgly: false },
  { id: "industrial5-ugly",   image: "/rooms/industrial5_ugly.png",   title: "工業房間5（醜）", style: "industrial", isUgly: true  },

  // 極簡 (minimal) — 5 組
  { id: "minimal1-pretty", image: "/rooms/minimal1_pretty.jpg", title: "極簡房間1", style: "minimal", isUgly: false },
  { id: "minimal1-ugly",   image: "/rooms/minimal1_ugly.jpg",   title: "極簡房間1（醜）", style: "minimal", isUgly: true  },
  { id: "minimal2-pretty", image: "/rooms/minimal2_pretty.jpg", title: "極簡房間2", style: "minimal", isUgly: false },
  { id: "minimal2-ugly",   image: "/rooms/minimal2_ugly.jpg",   title: "極簡房間2（醜）", style: "minimal", isUgly: true  },
  { id: "minimal3-pretty", image: "/rooms/minimal3_pretty.jpg", title: "極簡房間3", style: "minimal", isUgly: false },
  { id: "minimal3-ugly",   image: "/rooms/minimal3_ugly.jpg",   title: "極簡房間3（醜）", style: "minimal", isUgly: true  },
  { id: "minimal4-pretty", image: "/rooms/minimal4_pretty.jpg", title: "極簡房間4", style: "minimal", isUgly: false },
  { id: "minimal4-ugly",   image: "/rooms/minimal4_ugly.jpg",   title: "極簡房間4（醜）", style: "minimal", isUgly: true  },
  { id: "minimal5-pretty", image: "/rooms/minimal5_pretty.jpg", title: "極簡房間5", style: "minimal", isUgly: false },
  { id: "minimal5-ugly",   image: "/rooms/minimal5_ugly.jpg",   title: "極簡房間5（醜）", style: "minimal", isUgly: true  },
];

/**
 * 20 組台北地點 + 價格（漂亮/醜）
 * 依序對應 baseRooms：每 2 筆為同一地點（第 1 筆漂亮、第 2 筆醜）
 */
const TAIPEI_LOC_PRICE: Array<{
  city: string;
  district: string;
  pretty: number;
  ugly: number;
}> = [
  { city: "Taipei", district: "Daan",     pretty: 22000, ugly: 12000 },
  { city: "Taipei", district: "Xinyi",    pretty: 24000, ugly: 14000 },
  { city: "Taipei", district: "Zhongshan",pretty: 21000, ugly: 11000 },
  { city: "Taipei", district: "Songshan", pretty: 20500, ugly: 10500 },
  { city: "Taipei", district: "Zhongzheng",pretty: 21500, ugly: 11500 },
  { city: "Taipei", district: "Wanhua",   pretty: 18000, ugly:  9000 },
  { city: "Taipei", district: "Shilin",   pretty: 19000, ugly: 10000 },
  { city: "Taipei", district: "Beitou",   pretty: 17000, ugly:  8500 },
  { city: "Taipei", district: "Neihu",    pretty: 20000, ugly: 11000 },
  { city: "Taipei", district: "Nangang",  pretty: 18500, ugly:  9500 },
  { city: "Taipei", district: "Wenshan",  pretty: 17500, ugly:  9000 },
  { city: "Taipei", district: "Muzha",    pretty: 16500, ugly:  8500 },
  { city: "Taipei", district: "Jingmei",  pretty: 16000, ugly:  8000 },
  { city: "Taipei", district: "Gongguan", pretty: 19500, ugly: 10000 },
  { city: "Taipei", district: "Guting",   pretty: 19000, ugly:  9800 },
  { city: "Taipei", district: "Dongmen",  pretty: 20500, ugly: 11000 },
  { city: "Taipei", district: "Ximen",    pretty: 18500, ugly:  9500 },
  { city: "Taipei", district: "Liuzhangli",pretty:20000, ugly: 10800 },
  { city: "Taipei", district: "Dazhi",    pretty: 21000, ugly: 11500 },
  { city: "Taipei", district: "Shipai",   pretty: 17000, ugly:  9000 },
];

/**
 * 組合：把地點與價格按「每 2 筆為一組」套進 baseRooms
 */
export const rooms: Room[] = baseRooms.map((r, i) => {
  const pair = TAIPEI_LOC_PRICE[Math.floor(i / 2)] ?? TAIPEI_LOC_PRICE[0];
  return {
    ...r,
    price: r.isUgly ? pair.ugly : pair.pretty,
    location: { city: pair.city, district: pair.district },
  };
});

/**（可選）在 UI 端用這個來做價格字串：formatPrice(price) -> "10,000" */
export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 0 });
