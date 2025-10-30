"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";
import { furnitureByRoom, type FurnitureItem } from "@/data/furnitures";

export type SymbolId = "muji" | "cream" | "industrial" | "minimal";

// 右邊風格圓頭貼對應圖
const STYLE_AVATAR: Record<SymbolId, string> = {
  muji: "/avatars/gosig.jpeg",
  cream: "/avatars/dvardhare.jpeg",
  industrial: "/avatars/aftonsparvs.jpeg",
  minimal: "/avatars/lilleplutt.jpeg",
};

// 風格對應暱稱（文案）
const STYLE_ALIAS: Record<SymbolId, string> = {
  cream: "Miss Butter",
  muji: "Mr.Muji",
  minimal: "Mr.Simple",
  industrial: "Mr.Pipe",
};

// 從房間 id 推回 style
function styleOfRoom(roomId: string | null): SymbolId | null {
  if (!roomId) return null;
  const r = rooms.find((x) => x.id === roomId);
  return (r?.style as SymbolId | undefined) ?? null;
}

// 找出某風格有哪些「組號」（依你的命名：style + N + -pretty/-ugly）
function availableGroupNumbers(style: SymbolId): number[] {
  const nums = new Set<number>();
  rooms.forEach((r) => {
    if (r.style === style && !r.isUgly) {
      const m = r.id.match(/\d+/);
      if (m) nums.add(Number(m[0]));
    }
  });
  return [...nums].sort((a, b) => a - b);
}

const pickOne = <T,>(arr: T[]) =>
  (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null);

// 嚴格驗證 localStorage 取到的 style 是否有效
function parseStyle(s: string | null): SymbolId | null {
  return s === "muji" || s === "cream" || s === "industrial" || s === "minimal"
    ? (s as SymbolId)
    : null;
}

export default function ResultsPage() {
  const router = useRouter();

  // 先宣告所有 hooks，避免「Rendered fewer hooks」
  const [mounted, setMounted] = useState(false);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [currentStyle, setCurrentStyle] = useState<SymbolId>("cream");
  const [groupNo, setGroupNo] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  // 讀取 outcome 與 style，並安全 fallback
  useEffect(() => {
    if (!mounted) return;

    const rawMatched = localStorage.getItem("matchedIds");
    const outcome = localStorage.getItem("finalOutcome"); // "style" | "seaKing" | "coldBeauty" | null
    const finalStyle = parseStyle(localStorage.getItem("finalStyle"));
    const prefSymbol = parseStyle(localStorage.getItem("pref_symbol"));

    let style: SymbolId | null = null;

    // 只有在 outcome === "style" 且 finalStyle 有效時才用 finalStyle
    if (outcome === "style" && finalStyle) {
      style = finalStyle;
    }

    // 次之：從第一個配對房間推回 style
    if (!style && rawMatched) {
      try {
        const ids = JSON.parse(rawMatched) as string[];
        setMatchedIds(ids);
        const s = styleOfRoom(ids[0]);
        if (s) style = s;
      } catch {
        // 忽略 JSON 解析錯誤
      }
    }

    // 最後：使用使用者偏好
    if (!style && prefSymbol) {
      style = prefSymbol;
    }

    setCurrentStyle(style ?? "cream");
  }, [mounted]);

  // 每次 style 改變就隨機抽一組
  useEffect(() => {
    if (!mounted) return;
    const nums = availableGroupNumbers(currentStyle);
    setGroupNo(pickOne(nums));
  }, [mounted, currentStyle]);

  // 使用者頭貼（左側圓）
  const userAvatarSrc = useMemo(() => {
    if (!mounted) return "/avatars/boy.png";
    const a = localStorage.getItem("pref_avatar");
    return a ? `/avatars/${a}.png` : "/avatars/boy.png";
  }, [mounted]);

  // 依 style + groupNo 組出 id
  const prettyId = useMemo(
    () => (groupNo ? `${currentStyle}${groupNo}-pretty` : null),
    [currentStyle, groupNo]
  );
  const uglyId = useMemo(
    () => (groupNo ? `${currentStyle}${groupNo}-ugly` : null),
    [currentStyle, groupNo]
  );

  const prettyRoom = useMemo(
    () => rooms.find((r) => r.id === (prettyId ?? "")),
    [prettyId]
  );
  const uglyRoom = useMemo(
    () => rooms.find((r) => r.id === (uglyId ?? "")),
    [uglyId]
  );

  // 家具列表（依漂亮房）
  const items: FurnitureItem[] = useMemo(() => {
    if (!prettyId) return [];
    return furnitureByRoom[prettyId] ?? [];
  }, [prettyId]);

  // 點左圖可重新抽同風格另一組
  const shufflePair = () => {
    const nums = availableGroupNumbers(currentStyle);
    if (!nums.length) return;
    let next = pickOne(nums);
    if (nums.length > 1 && next === groupNo) {
      next = pickOne(nums.filter((n) => n !== groupNo));
    }
    setGroupNo(next ?? null);
  };

  if (!mounted) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-dvh grid place-items-center">
        <p className="text-gray-500">載入中…</p>
      </main>
    );
  }

  return (
    <main className="relative mx-auto max-w-screen-sm min-h-dvh px-4 pt-16 pb-28">
      {/* 左上 IKEA Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>

      {/* 頭貼區：左使用者、右風格（UI 不動） */}
      <section className="mt-2 flex items-center justify-center -space-x-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white shadow">
          <Image src={userAvatarSrc} alt="You" fill className="object-cover" />
        </div>
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white shadow">
          <Image src={STYLE_AVATAR[currentStyle]} alt={currentStyle} fill className="object-cover" />
        </div>
      </section>

      {/* Before / After 標題 */}
      <div className="mt-4 flex items-baseline justify-between px-1">
        <h3 className="text-2xl font-bold text-gray-800">Before</h3>
        <h3 className="text-2xl font-bold text-gray-800">After</h3>
      </div>

      {/* 中段對比（左醜 / 右美） */}
      <section className="mt-2 grid grid-cols-2 gap-3">
        <button
          onClick={shufflePair}
          title="點我換一組對比"
          className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 shadow"
        >
          {uglyRoom ? (
            <Image src={uglyRoom.image} alt={uglyRoom.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-gray-400">No Image</div>
          )}
        </button>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 shadow">
          {prettyRoom ? (
            <Image src={prettyRoom.image} alt={prettyRoom.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-gray-400">No Image</div>
          )}
        </div>
      </section>

      {/* 文案（不動 UI） */}
      <section className="mt-5 px-1">
        <p className="text-xl font-extrabold tracking-wide">
          距離你追到
          <span className="mx-1 text-[#0057AD]">{STYLE_ALIAS[currentStyle]}</span>
          還差…
        </p>
      </section>

      {/* 家具列表（漂亮房） */}
      <section className="mt-4 space-y-4">
        {items.map((it) => (
          <div key={it.id} className="flex gap-4 items-start rounded-lg border p-3">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              {it.image ? (
                <Image src={it.image} alt={it.name} fill unoptimized className="object-cover" />
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold">{it.name}</h4>
              {it.description ? <p className="text-sm text-gray-600">{it.description}</p> : null}
              {it.price ? <p className="mt-0.5 text-lg font-bold">{it.price}</p> : null}
              {it.url ? (
                <a
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[#0057AD] underline"
                >
                  前往商品頁
                </a>
              ) : null}
            </div>
          </div>
        ))}
        {!items.length && (
          <p className="text-gray-500">此房間沒有對應的家具資料（或尚未建立）。</p>
        )}
      </section>

      {/* 底部 Tab（不動 UI） */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur z-40">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 text中心">
          <button className="p-3 text-sm font-medium" onClick={() => router.push("/results")}>
            <Image src="/icons/tab-match.svg" alt="Match" width={24} height={24} className="mx-auto mb-1" priority />
            Match
          </button>
          <button className="p-3 text-sm font-medium" onClick={() => router.push("/swipe")}>
            <Image src="/icons/tab-like.svg" alt="Likes" width={24} height={24} className="mx-auto mb-1" priority />
            Likes
          </button>
          <button
            className="p-3 text-sm font-medium"
            onClick={async () => {
              try {
                await navigator.share?.({ title: "IKEA Swipe Match", url: location.href });
              } catch {}
            }}
          >
            <Image src="/icons/tab-share.svg" alt="Share" width={24} height={24} className="mx-auto mb-1" priority />
            Share
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </main>
  );
}
