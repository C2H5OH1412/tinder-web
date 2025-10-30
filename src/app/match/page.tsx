// app/match/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

type SymbolId = "muji" | "cream" | "industrial" | "minimal";
type Outcome = "style" | "seaKing" | "coldBeauty";

const IKEA_BLUE = "#0057AD";

const CAPTION_BY_STYLE: Record<SymbolId, string> = {
  cream: "來看看 Miss Butter 軟綿綿的房間裡有什麼",
  muji: "來看看 Mr.Muji 樸實自然的房間裡有什麼",
  minimal: "來看看 Mr.Simple 俐落的房間裡有什麼",
  industrial: "來看看 Mr.Pipe 豪放的房間裡有什麼",
};
const CAPTION_SEAKING = "海王：你的愛滿溢成海，你很值得擁有一隻 IKEA 鯊鯊";
const CAPTION_COLDBEAUTY = "高嶺之花：紅塵世俗都入不了你的眼，看來只有 IKEA 雪狐能和你相伴左右";

const AVATAR_BY_STYLE: Record<SymbolId, string> = {
  muji: "/avatars/gosig.jpeg",
  cream: "/avatars/dvardhare.jpeg",
  industrial: "/avatars/aftonsparvs.jpeg",
  minimal: "/avatars/lilleplutt.jpeg",
};
const AVATAR_BY_OUTCOME: Record<Exclude<Outcome, "style">, string> = {
  seaKing: "/avatars/blahaj.jpeg",
  coldBeauty: "/avatars/skogsduva.jpeg",
};


export default function MatchPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [styleAvatar, setStyleAvatar] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome>("style");
  const [finalStyle, setFinalStyle] = useState<SymbolId | null>(null);

  // 保險：清掉前一頁可能設的 overflow:hidden
  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "";
    body.style.overflow = "";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    const avatarId = localStorage.getItem("pref_avatar");
    if (avatarId) setUserAvatar(`/avatars/${avatarId}.png`);

    const o = (localStorage.getItem("finalOutcome") || "style") as Outcome;
    setOutcome(o);

    if (o === "style") {
      const fs = localStorage.getItem("finalStyle") as SymbolId | null;
      setFinalStyle(fs);
      if (fs) setStyleAvatar(AVATAR_BY_STYLE[fs]);
    } else {
      setFinalStyle(null);
      setStyleAvatar(AVATAR_BY_OUTCOME[o]);
    }
  }, []);

  const caption = useMemo(() => {
    if (outcome === "seaKing") return CAPTION_SEAKING;
    if (outcome === "coldBeauty") return CAPTION_COLDBEAUTY;
    return finalStyle ? CAPTION_BY_STYLE[finalStyle] : "";
  }, [outcome, finalStyle]);

  const goResults = () => router.push("/results");

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm overflow-visible pb-28">
      {/* 背景黃漸層 */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500" />

      {/* 放大的 match.png（可超出；下移一些） */}
      <div className="pointer-events-none absolute left-1/2 top-16 -z-20 -translate-x-1/2 w-[175%] max-w-none">
        <Image src="/match.png" alt="Match" width={1400} height={560} priority className="w-full h-auto" />
      </div>

      {/* 內容整體往下、置中 */}
      <div className="relative z-10 flex flex-col items-center pt-28 px-6">
        {/* 圓頭貼：重疊、置中 */}
        <section className="mt-60 flex justify-center">
          <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-yellow-200 shadow-xl">
            <img
              src={typeof userAvatar === "string" ? userAvatar : "/user-fallback.png"}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative -ml-6 h-36 w-36 overflow-hidden rounded-full ring-4 ring-yellow-200 shadow-xl">
            <img
              src={typeof styleAvatar === "string" ? styleAvatar : "/style-fallback.png"}
              alt="Style"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 說明文字 */}
        <p className="mt-6 text-center text-[21px] leading-relaxed text-[#0A2E57]/85">
          {caption}
        </p>

        {/* 防被底部按鈕遮擋的空白（保險） */}
        <div className="h-24" />
      </div>

      {/* 底部 GO 按鈕用 Portal 掛到 body，避免被任何容器影響 */}
      {mounted &&
        createPortal(
          <div
            className="fixed inset-x-0 z-[9999]"
            style={{ bottom: "calc(env(safe-area-inset-bottom) + 400px)" }}
          >
            <div className="mx-auto max-w-screen-sm px-4 pb-5 mb-[env(safe-area-inset-bottom)]">
              <button
                onClick={goResults}
                className={[
                  "group flex h-12 w-100 items-center rounded-full bg-white shadow-lg",
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
                  <span className="block w-full transition-colors duration-200" style={{ borderTop: `1.5px solid ${IKEA_BLUE}` }} />
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
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
