// app/swipe/page.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";

export type SymbolId = "muji" | "cream" | "industrial" | "minimal";

type Counts = Record<SymbolId, number>;
const ZERO_COUNTS: Counts = { muji: 0, cream: 0, industrial: 0, minimal: 0 };

const THRESHOLD = 80;
const COLOR_BLUE = "#0057AD";
const COLOR_YELLOW = "#FBDA0C";

export default function SwipePage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [dx, setDx] = useState(0);
  const startX = useRef<number | null>(null);

  // 初始化階段 — 清除所有舊紀錄，確保每次都是乾淨開局
  useEffect(() => {
    console.log(" 清除舊的配對資料中…");
    localStorage.removeItem("likedCounts");
    localStorage.removeItem("matchedIds");
    localStorage.removeItem("finalOutcome");
    localStorage.removeItem("finalStyle");
    localStorage.removeItem("swipeIndex");

    // 重新初始化
    localStorage.setItem("likedCounts", JSON.stringify(ZERO_COUNTS));
    console.log(" 初始化完成：likedCounts 重設為", ZERO_COUNTS);
  }, []);

  // 初始化 index（若想保留上次進度可保留這段）
  useEffect(() => {
    const saved = localStorage.getItem("swipeIndex");
    if (saved) {
      const i = parseInt(saved, 10);
      if (!isNaN(i)) setIndex(i);
    }
  }, []);

  // 滑完全部 → 決定結果
  useEffect(() => {
    if (index >= rooms.length) {
      localStorage.removeItem("swipeIndex");
      finalizeMatch();
    }
  }, [index]);

  // 禁止滾動
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // ---- helpers ----
  const addLikeToStyle = (style: SymbolId) => {
    try {
      const raw = localStorage.getItem("likedCounts");
      const counts: Counts = raw ? JSON.parse(raw) : { ...ZERO_COUNTS };
      counts[style] = (counts[style] ?? 0) + 1;
      localStorage.setItem("likedCounts", JSON.stringify(counts));
      console.log("💙 已喜歡風格:", style, counts);
    } catch { }
  };

  const pushMatched = (id: string) => {
    try {
      const raw = localStorage.getItem("matchedIds");
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      if (!arr.includes(id)) {
        arr.push(id);
        localStorage.setItem("matchedIds", JSON.stringify(arr));
      }
    } catch { }
  };

  const nextIndex = () => {
    setIndex((prev) => {
      const next = Math.min(prev + 1, rooms.length);
      localStorage.setItem("swipeIndex", next.toString());
      return next;
    });
  };

  const settle = (dir: "left" | "right") => {
    const current = rooms[index];
    if (!current) return;
    if (dir === "right") {
      addLikeToStyle(current.style as SymbolId);
      pushMatched(current.id);
    }
    nextIndex();
  };

  const finalizeMatch = () => {
    try {
      const counts: Counts = JSON.parse(localStorage.getItem("likedCounts") || JSON.stringify(ZERO_COUNTS));
      console.log("[FINALIZE] 統計結果:", counts);
  
      const totalLikes = Object.values(counts).reduce((a, b) => a + b, 0);
  
      if (totalLikes === 0) {
        localStorage.setItem("finalOutcome", "coldBeauty");
        localStorage.removeItem("finalStyle");
        router.replace("/match");
        return;
      }
  
      const entries = Object.entries(counts) as [SymbolId, number][];
      const max = Math.max(...entries.map(([, v]) => v));
      const topStyles = entries.filter(([, v]) => v === max && v > 0).map(([k]) => k);
  
      // 🌊 海王條件（嚴一些）：至少三個風格並列最高票
      if (topStyles.length >= 3) {
        console.log("🏖 海王模式觸發（≥3 風格同票）", topStyles);
        localStorage.setItem("finalOutcome", "seaKing");
        localStorage.removeItem("finalStyle");
        router.replace("/match");
        return;
      }
  
      let winner: SymbolId;
      if (topStyles.length === 2) {
        winner = topStyles[Math.floor(Math.random() * 2)];
      } else {
        winner = topStyles[0];
      }
  
      localStorage.setItem("finalOutcome", "style");
      localStorage.setItem("finalStyle", winner);
      router.replace("/match");
    } catch (err) {
      console.error("❌ finalizeMatch 發生錯誤:", err);
      router.replace("/");
    }
  };
  


  // ---- pointer handlers ----
  const onStart = (x: number) => (startX.current = x);
  const onMove = (x: number) => {
    if (startX.current !== null) setDx(x - startX.current);
  };
  const onEnd = () => {
    const abs = Math.abs(dx);
    if (abs > THRESHOLD) settle(dx > 0 ? "right" : "left");
    setDx(0);
    startX.current = null;
  };

  const current = rooms[index];
  if (!current) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-dvh flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-xl font-semibold mb-2">計算你的命定風格中…</h2>
        <p className="text-gray-500">請稍候</p>
      </main>
    );
  }

  const progressText = `${Math.min(index + 1, rooms.length)} / ${rooms.length}`;
  const rotate = Math.max(-12, Math.min(12, dx / 10));
  const cardStyle: React.CSSProperties = {
    transform: `translateX(${dx}px) rotate(${rotate}deg)`,
    transition: startX.current === null ? "transform 0.2s ease" : undefined,
  };

  const badgeOpacity = Math.min(1, Math.abs(dx) / THRESHOLD);
  const dragRatio = Math.max(-1, Math.min(1, dx / THRESHOLD));
  const neutral = Math.abs(dx) <= 6;
  const goingRight = dragRatio > 0.06;
  const goingLeft = dragRatio < -0.06;
  const mag = Math.min(Math.abs(dx) / THRESHOLD, 1);
  const SIZE = 88;
  const SCALE_PLUS = 0.35;

  return (
    <main className="relative mx-auto h-dvh max-w-screen-sm overflow-hidden px-4 pt-16 pb-28">
      {/* 左上 Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>

      {/* 卡片區 */}
      <section className="pt-6 pb-24">
        <p className="mt-2 mb-8 text-center text-2xl text-gray-500">{progressText}</p>
        <div
          className="relative mx-auto w-full max-w-sm select-none touch-none"
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseMove={(e) => startX.current !== null && onMove(e.clientX)}
          onMouseUp={onEnd}
          onMouseLeave={() => startX.current !== null && onEnd()}
        >
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            style={cardStyle}
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              className="object-cover pointer-events-none select-none"
            />

            <div className="absolute inset-x-0 bottom-0 rounded-t-[18px] bg-white/95 p-3">
              <p className="text-[20px] font-semibold leading-tight" style={{ color: COLOR_BLUE }}>
                {current.price?.toLocaleString("en-US", { maximumFractionDigits: 0 }) ?? "10,000"} TWD / Month
              </p>
              {current.location && (
                <span
                  className="mt-2 inline-block rounded-sm px-2 py-0.5 text-[11px] font-semibold"
                  style={{ background: COLOR_YELLOW, color: "#1a1a1a" }}
                >
                  {current.location.city.toUpperCase()}, {current.location.district.toUpperCase()}
                </span>
              )}
            </div>

            {dx > 0 && (
              <div className="absolute left-6 top-6" style={{ transform: "rotate(-10deg)", opacity: badgeOpacity }}>
                <Image src="/like.svg" alt="LIKE" width={200} height={100} />
              </div>
            )}
            {dx < 0 && (
              <div className="absolute right-6 top-6" style={{ transform: "rotate(10deg)", opacity: badgeOpacity }}>
                <Image src="/nope.svg" alt="NOPE" width={200} height={100} />
              </div>
            )}
          </div>

          {/* 浮動 SVG 按鈕 */}
          <div
            className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 flex items-center gap-16"
            style={{ bottom: "-4.5rem" }}
          >
            {(() => {
              const btnBase =
                "pointer-events-auto p-0 m-0 border-0 bg-transparent outline-none focus:outline-none";

              const iconStyle = (active: boolean): React.CSSProperties => ({
                width: "100%",
                height: "100%",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
                transform: `scale(${active ? 1 + SCALE_PLUS * mag : 1})`,
                transformOrigin: "center",
                transition: "transform 120ms ease",
              });

              const Btn = ({
                type,
                active,
                hidden,
                onClick,
              }: {
                type: "like" | "nope";
                active: boolean;
                hidden: boolean;
                onClick: () => void;
              }) => {
                const src =
                  type === "like"
                    ? active
                      ? "/icons/blueheart.svg"
                      : "/icons/heart.svg"
                    : active
                      ? "/icons/bluecross.svg"
                      : "/icons/cross.svg";

                return (
                  <button
                    aria-label={type === "like" ? "Like" : "Nope"}
                    className={btnBase}
                    style={{
                      width: SIZE,
                      height: SIZE,
                      opacity: hidden ? 0 : 1,
                      visibility: hidden ? "hidden" : "visible",
                    }}
                    onClick={onClick}
                  >
                    <img src={src} alt="" aria-hidden style={iconStyle(active)} />
                  </button>
                );
              };

              return (
                <>
                  <Btn
                    type="nope"
                    active={goingLeft}
                    hidden={!neutral && !goingLeft}
                    onClick={() => {
                      setDx(-(THRESHOLD + 1));
                      setTimeout(onEnd, 0);
                    }}
                  />
                  <Btn
                    type="like"
                    active={goingRight}
                    hidden={!neutral && !goingRight}
                    onClick={() => {
                      setDx(THRESHOLD + 1);
                      setTimeout(onEnd, 0);
                    }}
                  />
                </>
              );
            })()}
          </div>
        </div>
        
      </section>

      {/* 固定底部 tab */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur z-40">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 text-center">
          {/* ✅ 改成 Select */}
          <button
            className="p-3 text-sm font-medium"
            onClick={() => router.push("/select")}
          >
            <Image
              src="/icons/tab-match.svg"
              alt="Select"
              width={24}
              height={24}
              className="mx-auto mb-1"
              priority
            />
            Select
          </button>

          <button
            className="p-3 text-sm font-medium"
            onClick={() => router.push("/swipe")}
          >
            <Image
              src="/icons/tab-like.svg"
              alt="Likes"
              width={24}
              height={24}
              className="mx-auto mb-1"
              priority
            />
            Likes
          </button>

          <button
            className="p-3 text-sm font-medium"
            onClick={async () => {
              try {
                await navigator.share?.({
                  title: "IKEA Swipe Match",
                  url: location.href,
                });
              } catch { }
            }}
          >
            <Image
              src="/icons/tab-share.svg"
              alt="Share"
              width={24}
              height={24}
              className="mx-auto mb-1"
              priority
            />
            Share
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>

    </main>
  );
}
