"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type SymbolId = "muji" | "cream" | "industrial" | "minimal";
type Outcome = "style" | "seaKing" | "coldBeauty";

const CAPTION_BY_STYLE: Record<SymbolId, string> = {
  cream: "來看看 Miss Butter 軟綿綿的房間裡有什麼",
  muji: "來看看 Mr.Muji 樸實自然的房間裡有什麼",
  minimal: "來看看 Mr.Simple 俐落的房間裡有什麼",
  industrial: "來看看 Mr.Simple 豪放的房間裡有什麼",
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
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [styleAvatar, setStyleAvatar] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Outcome>("style");
  const [finalStyle, setFinalStyle] = useState<SymbolId | null>(null);

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

  const titleLines = useMemo(() => {
    if (outcome === "seaKing") return ["You are", "SEA KING"];
    if (outcome === "coldBeauty") return ["So picky…", "COLD BEAUTY"];
    return ["It’s a", "MATCH"];
  }, [outcome]);

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm overflow-hidden">
      {/* 背景黃漸層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500" />

      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start px-6 pt-20 pb-28">
        {/* 頁首圖：取代文字標題 */}
        <div className="mt-6 flex justify-center">
          <Image
            src="/match.png"
            alt="Match"
            width={320}         // 可微調
            height={140}        // 可微調
            priority
            className="h-auto w-64 sm:w-72"
          />
        </div>

        {/* 頭像組 */}
        <div className="mt-10 flex items-end gap-6">
          <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-yellow-200 shadow-xl">
            {userAvatar && <Image src={userAvatar} alt="User" fill className="object-cover" />}
          </div>
          <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-yellow-200 shadow-xl">
            {styleAvatar && <Image src={styleAvatar} alt="Style" fill className="object-cover" />}
          </div>
        </div>
        <p className="mt-5 text-center text-[14px] leading-relaxed text-[#0A2E57]/85 px-6">
          {outcome === "style" && finalStyle
            ? CAPTION_BY_STYLE[finalStyle]
            : outcome === "seaKing"
              ? CAPTION_SEAKING
              : CAPTION_COLDBEAUTY}
        </p>

        {/* 查看更多 */}
        <Link
          href="/results"
          className="mt-10 rounded-[22px] bg-white px-6 py-3 font-semibold text-[#0057AD] shadow-lg hover:brightness-95"
        >
          查看更多
        </Link>
      </div>
    </main>
  );
}
