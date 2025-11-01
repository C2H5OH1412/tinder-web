// app/match/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SymbolId = "muji" | "cream" | "industrial" | "minimal";
type Outcome = "style" | "seaKing" | "coldBeauty";

// 說明文字
const CAPTION_BY_STYLE: Record<SymbolId, string> = {
  cream: "來看看 Miss Butter 軟綿綿的房間裡有什麼",
  muji: "來看看 Mr.Muji 樸實自然的房間裡有什麼",
  minimal: "來看看 Mr.Simple 俐落的房間裡有什麼",
  industrial: "來看看 Mr.Pipe 豪放的房間裡有什麼",
};
const CAPTION_SEAKING = "你的愛滿溢成海，你很值得擁有一隻 IKEA 鯊鯊";
const CAPTION_COLDBEAUTY = "紅塵世俗都入不了你的眼，看來只有 IKEA 雪狐能和你相伴左右";

// 頭貼
const AVATAR_BY_STYLE: Record<SymbolId, string> = {
  muji: "/avatars/gosig.jpeg",
  cream: "/avatars/dvardhare.jpeg",
  industrial: "/avatars/aftonsparvs.jpeg",
  minimal: "/avatars/lilleplutt.jpeg",
};
const AVATAR_BY_OUTCOME = {
  seaKing: "/avatars/blahaj.jpeg",
  coldBeauty: "/avatars/skogsduva.jpeg",
} as const;

// 目標連結
const IKEA_BLAHAJ_URL =
  "https://www.ikea.com.tw/zh/products/kids-toys/comfort-toys/blahaj-art-10373589";
const IKEA_SKOGSDUVA_URL =
  "https://www.ikea.com.tw/zh/products/kids-toys/comfort-toys/skogsduva-art-40576892";

const IKEA_BLUE = "#0057AD";

export default function MatchPage() {
  const router = useRouter();

  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [styleAvatar, setStyleAvatar] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome>("style");
  const [finalStyle, setFinalStyle] = useState<SymbolId | null>(null);

  // 讀 localStorage
  useEffect(() => {
    const avatarId = localStorage.getItem("pref_avatar");
    if (avatarId) setUserAvatar(`/avatars/${avatarId}.png`);

    const o = (localStorage.getItem("finalOutcome") || "style") as Outcome;
    setOutcome(o);

    if (o === "style") {
      const fs = localStorage.getItem("finalStyle") as SymbolId | null;
      setFinalStyle(fs);
      if (fs && AVATAR_BY_STYLE[fs]) setStyleAvatar(AVATAR_BY_STYLE[fs]);
    } else {
      setStyleAvatar(AVATAR_BY_OUTCOME[o]);
    }
  }, []);

  // 依結果決定 GO 的目的地
  const goTarget =
    outcome === "seaKing"
      ? IKEA_BLAHAJ_URL
      : outcome === "coldBeauty"
      ? IKEA_SKOGSDUVA_URL
      : "/results";
  const isExternal = goTarget.startsWith("http");

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm overflow-hidden">
      {/* 背景黃漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500" />

      {/* 放大的 match.png（可以超過螢幕寬度；不阻擋點擊） */}
      <div className="absolute mt-30 inset-x-0 z-0 flex justify-center pointer-events-none">
        <Image
          src="/match.png"
          alt="Match"
          width={2000}                         // 提供較大固尺寸，避免壓縮失真
          height={900}
          priority
          className="
            h-auto max-w-none select-none
            w-[150vw] sm:w-[130vw] md:w-[110vw]
            -translate-y-2 sm:translate-y-2
          "
        />
      </div>

      {/* 內容（移除字版的 It’s a MATCH，保留你的圖） */}
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start px-6 pt-28 pb-28">
        {/* 頭像（稍微重疊，壓在 match.png 上） */}
        <section className="relative mt-6 flex justify-center z-10">
          <div className="relative mt-50 h-36 w-36 overflow-hidden rounded-full ring-4 ring-yellow-200 shadow-xl">
            {userAvatar && (
              <Image src={userAvatar} alt="User" fill className="object-cover" />
            )}
          </div>
          <div className="relative -ml-6 mt-50 h-36 w-36 overflow-hidden rounded-full ring-4 ring-yellow-200 shadow-xl">
            {styleAvatar && (
              <Image src={styleAvatar} alt="Style" fill className="object-cover" />
            )}
          </div>
        </section>

        {/* 說明文字（放大） */}
        <p className="mt-6 text-center text-[22px] sm:text-[26px] leading-relaxed text-[#0A2E57]/85 px-4">
          {outcome === "style" && finalStyle
            ? CAPTION_BY_STYLE[finalStyle]
            : outcome === "seaKing"
            ? CAPTION_SEAKING
            : CAPTION_COLDBEAUTY}
        </p>
      </div>

      {/* GO 按鈕（與首頁/Select 一致） */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto max-w-screen-sm px-4 pb-5 mb-[env(safe-area-inset-bottom)]">
          {isExternal ? (
            // 海王 / 高嶺之花：外連到 IKEA
            <a
              href={goTarget}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "group flex h-12 w-full items-center rounded-full bg-white shadow-lg",
                "transition-[background,transform,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:shadow-xl",
              ].join(" ")}
              aria-label="GO"
            >
              <span
                className="pl-5 pr-3 font-bold"
                style={{ color: IKEA_BLUE, fontSize: "18px", letterSpacing: "0.06em" }}
              >
                GO
              </span>
              <span className="relative top-[1px] mr-3 flex-1" aria-hidden="true">
                <span className="block w-full" style={{ borderTop: `1.5px solid ${IKEA_BLUE}` }} />
              </span>
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
            </a>
          ) : (
            // 一般配對：跳 /results
            <button
              onClick={() => router.push(goTarget)}
              className={[
                "group flex h-12 w-full items-center rounded-full bg-white shadow-lg",
                "transition-[background,transform,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:shadow-xl",
              ].join(" ")}
              aria-label="GO"
            >
              <span
                className="pl-5 pr-3 font-bold"
                style={{ color: IKEA_BLUE, fontSize: "18px", letterSpacing: "0.06em" }}
              >
                GO
              </span>
              <span className="relative top-[1px] mr-3 flex-1" aria-hidden="true">
                <span className="block w-full" style={{ borderTop: `1.5px solid ${IKEA_BLUE}` }} />
              </span>
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
          )}
        </div>
      </div>
    </main>
  );
}
