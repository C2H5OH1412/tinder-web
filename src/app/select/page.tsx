"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SymbolId = "muji" | "cream" | "industrial" | "minimal";

const AVATARS = [1, 2, 3, 4, 5] as const;
const SYMBOLS: { id: SymbolId; label: string; emoji: string; desc: string }[] = [
  { id: "muji", label: "日式無印",   emoji: "🌿", desc: "溫潤自然、木質與棉麻交織的簡約空間" },
  { id: "cream", label: "奶油雲朵",   emoji: "☁️", desc: "柔霧白與奶油色調營造雲端般的溫柔氛圍" },
  { id: "industrial", label: "工業", emoji: "⚙️", desc: "鐵件與水泥的對話，冷冽卻有力量" },
  { id: "minimal", label: "極簡",     emoji: "⬜️", desc: "去除多餘，留白為主的純淨設計" },
];

export default function SelectPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<number | null>(null);
  const [symbol, setSymbol] = useState<SymbolId | null>(null);

  // 回填上次選擇（若有）
  useEffect(() => {
    const a = localStorage.getItem("avatar");
    const s = localStorage.getItem("symbol") as SymbolId | null;
    if (a) setAvatar(Number(a));
    if (s && ["muji","cream","industrial","minimal"].includes(s)) {
      setSymbol(s);
    }
  }, []);

  const ready = avatar != null && symbol != null;

  const startSwipe = () => {
    if (!ready) return;
    // 新一輪配對，清除舊進度
    localStorage.removeItem("swipeIndex");
    localStorage.setItem("avatar", String(avatar));
    localStorage.setItem("symbol", symbol!);
    router.push("/swipe");
  };

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm bg-white px-4 pt-16 pb-28">
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>
      <h1 className="mt-8 text-xl font-semibold">選擇你的設定</h1>
      <p className="mt-1 text-sm text-gray-600">完成以下兩步驟，開始配對！</p>

      <section className="mt-6">
        <h2 className="mb-3 text-base font-semibold">1. 選擇頭貼</h2>
        <div className="grid grid-cols-5 gap-3">
          {AVATARS.map((id) => {
            const active = avatar === id;
            return (
              <button
                key={id}
                onClick={() => setAvatar(id)}
                className={[
                  "btn aspect-square rounded-2xl border flex items-center justify-center",
                  "bg-gray-50 text-lg font-semibold",
                  active ? "ring-2 ring-yellow-400 border-yellow-300 bg-yellow-50" : "hover:bg-gray-100",
                ].join(" ")}
                aria-pressed={active}
                aria-label={`選擇頭貼 ${id}`}
              >
                {id}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-base font-semibold">2. 選擇象徵風格</h2>
        <div className="grid grid-cols-2 gap-3">
          {SYMBOLS.map((s) => {
            const active = symbol === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSymbol(s.id)}
                className={[
                  "btn h-28 rounded-2xl border bg-gray-50 p-3 text-left",
                  active ? "ring-2 ring-yellow-400 border-yellow-300 bg-yellow-50" : "hover:bg-gray-100",
                ].join(" ")}
                aria-pressed={active}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden>{s.emoji}</span>
                  <span className="font-medium">{s.label}</span>
                </div>
                <div className="mt-1 text-xs text-gray-600 line-clamp-2">{s.desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto mb-[env(safe-area-inset-bottom)] max-w-screen-sm px-4 pb-6">
          <button
            disabled={!ready}
            onClick={startSwipe}
            className={[
              "w-full rounded-2xl px-6 py-4 font-semibold btn",
              ready ? "bg-yellow-300 hover:brightness-95" : "bg-gray-200 text-gray-500",
            ].join(" ")}
          >
            開始配對
          </button>
        </div>
      </div>
    </main>
  );
}
