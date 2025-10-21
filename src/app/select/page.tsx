// app/select/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SymbolId = "cream" | "minimal" | "scandi" | "industrial" | "muji";

const IKEA_BLUE = "#0058A3";

// 第一段：圓形頭像
const AVATARS = [
  { id: "baby", label: "嬰兒" },
  { id: "woman", label: "女人" },
  { id: "man", label: "男人" },
  { id: "dog", label: "狗狗" },
  { id: "cat", label: "貓貓" },
  { id: "ham", label: "倉鼠" },
] as const;

const SYMBOLS: { id: SymbolId; label: string; desc?: string }[] = [
  { id: "cream", label: "奶油風" },
  { id: "minimal", label: "極簡風" },
  { id: "scandi", label: "北歐風" },
  { id: "industrial", label: "工業風" },
  { id: "muji", label: "無印風" },
];

export default function SelectPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<SymbolId | null>(null);

  // 回填
  useEffect(() => {
    const a = localStorage.getItem("pref_avatar");
    const s = localStorage.getItem("pref_symbol") as SymbolId | null;
    if (a) setAvatar(a);
    if (s && ["cream", "minimal", "scandi", "industrial", "muji"].includes(s)) {
      setSymbol(s);
    }
  }, []);

  const ready = avatar != null && symbol != null;

  const startSwipe = () => {
    if (!ready) return;
    localStorage.removeItem("swipeIndex");
    localStorage.setItem("pref_avatar", String(avatar));
    localStorage.setItem("pref_symbol", symbol!);
    router.push("/swipe");
  };

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm bg-white px-4 pt-14 pb-32">
      {/* 左上小 IKEA Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={64} height={26} priority />
      </a>

      {/* 標題 1 */}
      <section className="mt-10 text-center">
        <p className="text-[17px] font-semibold text-gray-700">請選擇你的面部</p>
      </section>

      {/* 圓形選項 3×2 */}
      <section className="mt-4">
        <div className="mx-auto grid max-w-[300px] grid-cols-3 gap-x-5 gap-y-5">
          {AVATARS.map((item) => {
            const active = avatar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAvatar(item.id)}
                aria-pressed={active}
                className={[
                  // 由原本 aspect-square 換成固定大小：56px 圓
                  "h-14 w-14 rounded-full text-[13px] font-medium",
                  "flex items-center justify-center",
                  "border-2 transition-colors",
                  active
                    ? "border-yellow-400 bg-yellow-50 text-gray-800 shadow-[0_0_0_2px_rgba(255,210,0,0.25)]"
                    : "border-gray-400/70 text-gray-500 hover:bg-gray-50",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>


      {/* 標題 2 */}
      <section className="mt-8 text-center">
        <p className="text-[17px] font-semibold text-gray-700">請選擇能夠代表你的關鍵字</p>
      </section>

      {/* 長條膠囊按鈕列表（更瘦 + 較小圓角） */}
      <section className="mt-4">
        <div className="mx-auto flex max-w-[360px] flex-col gap-3.5">
          {SYMBOLS.map((s) => {
            const active = symbol === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSymbol(s.id)}
                aria-pressed={active}
                className={[
                  // 將 h-12 -> h-10（40px），圓角 20px -> 12px，字級略降
                  "h-10 w-full rounded-[12px] text-[14px] font-medium",
                  "border-2 px-4 text-center transition-colors",
                  active
                    ? "border-yellow-400 bg-yellow-50 text-gray-800"
                    : "border-gray-400/70 text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </section>


      {/* 底部 GO 按鈕（與首頁一致：白底藍字 -> hover 藍底白字） */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto mb-[env(safe-area-inset-bottom)] max-w-screen-sm px-4 pb-5">
          <button
            disabled={!ready}
            onClick={startSwipe}
            className={[
              "group flex h-12 w-full items-center rounded-full bg-white shadow-lg",
              "transition-[background,transform,box-shadow] duration-200",
              "hover:-translate-y-0.5 hover:shadow-xl",
              ready ? "opacity-100" : "opacity-60 pointer-events-none",
            ].join(" ")}
            aria-label="GO"
          >
            {/* 左側 GO 文字 */}
            <span
              className="pl-5 pr-3 font-bold"
              style={{
                color: IKEA_BLUE,
                fontSize: "18px",
                letterSpacing: "0.06em",
              }}
            >
              GO
            </span>

            {/* 中線 */}
            <span className="relative top-[1px] mr-3 block flex-1" aria-hidden="true">
              <span
                className="block w-full transition-colors duration-200"
                style={{ borderTop: `1.5px solid ${IKEA_BLUE}` }}
              />
            </span>

            {/* 箭頭（跟著顏色反轉） */}
            <svg
              className="mr-5 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke={IKEA_BLUE}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h13" />
              <path d="M14 8l5 4-5 4" />
            </svg>
          </button>
        </div>
      </div>

      {/* hover 反轉（沿用首頁邏輯） */}
      <style jsx global>{`
        .group:hover {
          background: ${IKEA_BLUE};
        }
        .group:hover span[aria-hidden="true"] > span {
          border-color: #fff !important;
        }
        .group:hover span,
        .group:hover svg {
          color: #fff !important;
          stroke: #fff !important;
        }
      `}</style>
    </main>
  );
}
