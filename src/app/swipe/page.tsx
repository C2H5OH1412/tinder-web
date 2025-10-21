"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";

// 定義四種象徵風格的型別（保留原樣）
export type SymbolId = "muji" | "cream" | "industrial" | "minimal";

const THRESHOLD = 80;

// 僅供 UI 用的色票
const COLOR_BLUE = "#0057AD";
const COLOR_YELLOW = "#FBDA0C";
const COLOR_GRAY = "#7e8592";

export default function SwipePage() {
  const router = useRouter();

  // 狀態（保留原樣）
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolId | null>(null);
  const [index, setIndex] = useState(0);
  const [dx, setDx] = useState(0);
  const startX = useRef<number | null>(null);

  // 讀取先前儲存的進度（原樣）
  useEffect(() => {
    const saved = localStorage.getItem("swipeIndex");
    if (saved) {
      const i = parseInt(saved, 10);
      if (!isNaN(i)) setIndex(i);
    }
  }, []);

  // 滑完清除（原樣）
  useEffect(() => {
    if (index >= rooms.length) {
      localStorage.removeItem("swipeIndex");
    }
  }, [index]);

  // 檢查 avatar 和 symbol（原樣）
  useEffect(() => {
    const a = localStorage.getItem("avatar");
    const s = localStorage.getItem("symbol") as SymbolId | null;
    if (!a || !s) {
      router.replace("/select");
      return;
    }
    if (["muji", "cream", "industrial", "minimal"].includes(s)) {
      setSelectedSymbol(s);
    } else {
      router.replace("/select");
    }
  }, [router]);

  // 目前要顯示的房間（原樣）
  const current = rooms[index];

  // 進度顯示（原樣）
  const progressText = useMemo(() => {
    return `${Math.min(index + 1, rooms.length)} / ${rooms.length}`;
  }, [index]);

  // 儲存配對成功（原樣）
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

  // 遞增 index（原樣）
  const nextIndex = () => {
    setIndex((prev) => {
      const next = Math.min(prev + 1, rooms.length);
      localStorage.setItem("swipeIndex", next.toString());
      return next;
    });
  };

  // 拖曳開始/移動/結束（原樣）
  const onStart = (x: number) => {
    startX.current = x;
  };

  const onMove = (x: number) => {
    if (startX.current !== null) {
      setDx(x - startX.current);
    }
  };

  // 判斷滑動方向並處理（原樣）
  const settle = (dir: "left" | "right") => {
    if (!current) return;

    if (dir === "right") {
      if (current.isUgly) {
        nextIndex();
        router.push("/fail");
        return;
      }
      if (current.style === selectedSymbol) {
        pushMatched(current.id);
        nextIndex();
        router.push("/match");
        return;
      }
      nextIndex();
      return;
    }

    // 左滑
    nextIndex();
  };

  // 拖曳結束（原樣）
  const onEnd = () => {
    if (!current) return;
    if (Math.abs(dx) > THRESHOLD) {
      settle(dx > 0 ? "right" : "left");
    }
    setDx(0);
    startX.current = null;
  };

  // 已滑完（原樣）
  if (!current) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-dvh flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-semibold mb-2">配對完成！</h2>
        <p className="text-gray-600 mb-6">沒有更多房間了。</p>
        <div className="flex gap-3">
          <Link href="/results" className="rounded-2xl bg-yellow-300 px-5 py-3 font-semibold hover:brightness-95">
            查看我的配對
          </Link>
          <Link href="/" className="rounded-2xl border px-5 py-3">回首頁</Link>
        </div>
      </main>
    );
  }

  const rotate = Math.max(-12, Math.min(12, dx / 10));
  const cardStyle = {
    transform: `translateX(${dx}px) rotate(${rotate}deg)`,
    transition: startX.current === null ? "transform 0.2s ease" : undefined,
  } as const;

  // 浮水印透明度
  const badgeOpacity = Math.min(1, Math.abs(dx) / THRESHOLD);

  // 兩顆圓鈕的「UI 高亮」判斷（僅 UI）
  const likeActive = dx > 6;
  const nopeActive = dx < -6;
  // 放大比例：距離門檻的比例（0→1）
const mag = Math.min(Math.abs(dx) / THRESHOLD, 1);
// 左滑放大左鍵、右滑放大右鍵；最大 +25%
const scaleNope = 1 + (dx < 0 ? 0.25 * mag : 0);
const scaleLike = 1 + (dx > 0 ? 0.25 * mag : 0);

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm px-4 pt-16 pb-28">
      {/* 左上 Logo（原樣） */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>

      {/* 卡片區（加上浮水印與底部資訊條的 UI） */}
      <section className="pt-6 pb-24">
        <div
          className="mx-auto w-full max-w-sm select-none touch-pan-y"
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchMove={(e) => onMove(e.touches[0].clientX)}
          onTouchEnd={onEnd}
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseMove={(e) => startX.current !== null && onMove(e.clientX)}
          onMouseUp={onEnd}
          onMouseLeave={() => startX.current !== null && onEnd()}
        >
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] bg-white"
            style={cardStyle}
          >
            <Image src={current.image} alt={current.title} fill className="object-cover" priority />

            {/* 下半白色資訊條（純 UI，不動資料/判斷） */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-t-[18px] bg-white/96 p-3">
              {/* 價格 */}
              <p className="text-[20px] font-semibold leading-tight" style={{ color: "#0057AD" }}>
                {current.price?.toLocaleString("en-US", { maximumFractionDigits: 0 }) ?? "10,000"} TWD / Month
              </p>

              {/* 地點：把 { city, district } 轉成文字再渲染 */}
              {current.location && (
                <span
                  className="mt-2 inline-block rounded-sm px-2 py-0.5 text-[11px] font-semibold"
                  style={{ background: "#FBDA0C", color: "#1a1a1a" }}
                >
                  {/* 大寫地名 */}
                  {/* {`${current.location.city}, ${current.location.district}`} */}
                  {current.location.city.toUpperCase()}, {current.location.district.toUpperCase()}
                </span>
              )}
            </div>


            {/* LIKE / NOPE 浮水印 */}
            {dx > 0 && (
              <div
                className="pointer-events-none absolute left-6 top-6"
                style={{ transform: "rotate(-10deg)", opacity: badgeOpacity }}
              >
                <Image src="/like.svg" alt="LIKE" width={200} height={100} />
              </div>
            )}
            {dx < 0 && (
              <div
                className="pointer-events-none absolute right-6 top-6"
                style={{ transform: "rotate(10deg)", opacity: badgeOpacity }}
              >
                <Image src="/nope.svg" alt="NOPE" width={200} height={100} />
              </div>
            )}
          </div>
        </div>

        {/* 進度 */}
        <p className="mt-3 text-center text-sm text-gray-500">{progressText}</p>
      </section>

      {/* 浮動圓形操作鈕（提高層級到 z-50） */}
<div className="pointer-events-none absolute inset-x-0 bottom-[94px] z-50">
  <div className="pointer-events-auto mx-auto flex max-w-screen-sm items-center justify-center gap-6">
    {/* NOPE */}
    <button
      aria-label="Nope"
      onClick={() => {
        setDx(-(THRESHOLD + 1));
        setTimeout(onEnd, 0);
      }}
      className={[
        "h-14 w-14 rounded-full shadow-md transition-transform",
        dx < -6 ? "" : "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
        background: "transparent",
        transform: `scale(${scaleNope})`,
        transition: "transform 120ms ease", // 平滑放大
      }}
    >
      <img
        src={dx < -6 ? "/icons/bluecross.svg" : "/icons/cross.svg"}
        alt="Nope"
        width={56}
        height={56}
        className="mx-auto block"
      />
    </button>

    {/* LIKE */}
    <button
      aria-label="Like"
      onClick={() => {
        setDx(THRESHOLD + 1);
        setTimeout(onEnd, 0);
      }}
      className={[
        "h-14 w-14 rounded-full shadow-md transition-transform",
        dx > 6 ? "" : "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
        background: "transparent",
        transform: `scale(${scaleLike})`,
        transition: "transform 120ms ease",
      }}
    >
      <img
        src={dx > 6 ? "/icons/blueheart.svg" : "/icons/heart.svg"}
        alt="Like"
        width={56}
        height={56}
        className="mx-auto block"
      />
    </button>
  </div>
</div>




      {/* 底部 Tab（保留你的三欄；若要再換成你自製的 SVG 圖示，只需替換 src） */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur z-40">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 text-center">
          <button
            className="p-3 text-sm font-medium"
            onClick={async () => {
              try {
                await navigator.share?.({ title: "IKEA Swipe Match", url: location.href });
              } catch { }
            }}
          >
            {/* 這裡可換成你的 tab icon：/tab/share.svg */}
            <Image src="/icons/tab-match.svg" alt="Match" width={24} height={24} className="mx-auto mb-1" priority />
            Match
          </button>
          <button
            className="p-3 text-sm font-medium"
            onClick={() => {
              setDx(THRESHOLD + 1);
              setTimeout(onEnd, 0);
            }}
          >
            {/* 這裡可換成你的 tab icon：/tab/likes.svg */}
            <Image src="/icons/tab-like.svg" alt="Likes" width={24} height={24} className="mx-auto mb-1" priority />
            Likes
          </button>
          <button
            className="p-3 text-sm font-medium"
            onClick={async () => {
              try {
                await navigator.share?.({ title: "IKEA Swipe Match", url: location.href });
              } catch { }
            }}
          >
            {/* 這裡可換成你的 tab icon：/tab/share.svg */}
            <Image src="/icons/tab-share.svg" alt="Share" width={24} height={24} className="mx-auto mb-1" priority />
            Share
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </main>
  );
}
