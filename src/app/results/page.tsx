"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";
import { furnitureByRoom, type FurnitureItem } from "@/data/furnitures";

export type SymbolId = "muji" | "cream" | "industrial" | "minimal";

// 風格對應頭貼與暱稱
const STYLE_AVATAR: Record<SymbolId, string> = {
  muji: "/avatars/gosig.jpeg",
  cream: "/avatars/dvardhare.jpeg",
  industrial: "/avatars/aftonsparvs.jpeg",
  minimal: "/avatars/lilleplutt.jpeg",
};

const STYLE_ALIAS: Record<SymbolId, string> = {
  cream: "Miss Butter",
  muji: "Mr.Muji",
  minimal: "Mr.Simple",
  industrial: "Mr.Pipe",
};

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
const pickOne = <T,>(arr: T[]) => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null);

function Thumb({ id, name, external }: { id: string; name: string; external?: string | null }) {
  const [idx, setIdx] = useState(0);
  const candidates = useMemo(
    () => [
      `/thumbs/${id}.webp`,
      `/thumbs/${id}.jpg`,
      `/thumbs/${id}.jpeg`,
      `/thumbs/${id}.png`,
      external || "",
      "/thumbs/placeholder.png",
    ],
    [id, external]
  );
  const src = candidates[idx];
  const safeSrc = src && src.length > 0 ? src : "/thumbs/placeholder.png";
  return (
    <img
      src={safeSrc}
      alt={name}
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setIdx((i) => Math.min(i + 1, candidates.length - 1))}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentStyle, setCurrentStyle] = useState<SymbolId>("cream");
  const [groupNo, setGroupNo] = useState<number | null>(null);

  // ✅ 僅信任 swipe 寫入的 localStorage 結果
  useEffect(() => {
    setMounted(true);
    try {
      const finalOutcome = (localStorage.getItem("finalOutcome") || "style") as "style" | "seaKing" | "coldBeauty";
      // 非 style → 這頁不負責，直接回 /match
      if (finalOutcome !== "style") {
        router.replace("/match");
        return;
      }
      const fs = localStorage.getItem("finalStyle") as SymbolId | null;
      setCurrentStyle(fs ?? "cream");
    } catch {
      setCurrentStyle("cream");
    }
  }, [router]);

  // 初始化房間 pair
  useEffect(() => {
    if (!mounted) return;
    const nums = availableGroupNumbers(currentStyle);
    setGroupNo(pickOne(nums));
  }, [mounted, currentStyle]);

  const userAvatarSrc = useMemo(() => {
    const a = mounted ? localStorage.getItem("pref_avatar") : null;
    return a ? `/avatars/${a}.png` : "/avatars/boy.png";
  }, [mounted]);

  const prettyId = useMemo(() => (groupNo ? `${currentStyle}${groupNo}-pretty` : null), [currentStyle, groupNo]);
  const uglyId = useMemo(() => (groupNo ? `${currentStyle}${groupNo}-ugly` : null), [currentStyle, groupNo]);
  const prettyRoom = useMemo(() => rooms.find((r) => r.id === (prettyId ?? "")), [prettyId]);
  const uglyRoom = useMemo(() => rooms.find((r) => r.id === (uglyId ?? "")), [uglyId]);
  const items: FurnitureItem[] = useMemo(() => (prettyId ? furnitureByRoom[prettyId] ?? [] : []), [prettyId]);

  const shufflePair = () => {
    const nums = availableGroupNumbers(currentStyle);
    if (!nums.length) return;
    let next = pickOne(nums);
    if (nums.length > 1 && next === groupNo) next = pickOne(nums.filter((n) => n !== groupNo));
    setGroupNo(next ?? null);
  };

  if (!mounted) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-dvh grid place-items-center">
        <p className="text-gray-500">載入中…</p>
      </main>
    );
  }

  // ✅ 僅保留「style」情境（海王／高嶺之花不再由此頁處理）
  return (
    <div className="relative mx-auto max-w-screen-sm min-h-dvh flex flex-col bg-white">
      <main className="flex-1 overflow-y-auto px-4 pt-16 pb-[8rem]">
        {/* 左上 IKEA Logo */}
        <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
          <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
        </a>

        {/* 頭貼 */}
        <section className="mt-2 flex items-center justify-center -space-x-3">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white shadow">
            <Image src={userAvatarSrc} alt="You" fill className="object-cover" />
          </div>
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-white shadow">
            <Image src={STYLE_AVATAR[currentStyle]} alt={currentStyle} fill className="object-cover" />
          </div>
        </section>

        <div className="mt-4 flex items-baseline justify-between px-15">
          <h3 className="text-2xl font-bold text-gray-800">Before</h3>
          <h3 className="text-2xl font-bold text-gray-800">After</h3>
        </div>

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

        <section className="mt-5 px-1">
          <p className="text-xl font-extrabold tracking-wide">
            距離你追到 <span className="mx-1 text-[#0057AD]">{STYLE_ALIAS[currentStyle]}</span> 還差…
          </p>
        </section>

        {/* 家具列表 */}
        <section className="mt-4 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex gap-4 items-start rounded-lg border p-3">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                <Thumb id={it.id} name={it.name} external={it.image} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{it.name}</h4>
                {it.description && <p className="text-sm text-gray-600">{it.description}</p>}
                {it.price && <p className="mt-0.5 text-lg font-bold">{it.price}</p>}
                {it.url && (
                  <a href={it.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[#0057AD] underline">
                    前往商品頁
                  </a>
                )}
              </div>
            </div>
          ))}
          {!items.length && <p className="text-gray-500">此房間沒有對應的家具資料（或尚未建立）。</p>}
        </section>
      </main>

      {/* 固定底部 tab */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur z-40">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 text-center">
          <button className="p-3 text-sm font-medium" onClick={() => router.push("/select")}>
            <Image src="/icons/tab-match.svg" alt="Select" width={24} height={24} className="mx-auto mb-1" priority />
            Select
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
    </div>
  );
}
