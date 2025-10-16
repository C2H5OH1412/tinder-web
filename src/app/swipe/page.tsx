"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const THRESHOLD = 80;
const demoImages = Array.from({ length: 10 }).map((_, i) => `/rooms/room-${(i % 5) + 1}.jpg`);

export default function SwipePage() {
  const router = useRouter();

  // 若沒完成選擇，擋回 /select
  useEffect(() => {
    const a = localStorage.getItem("avatar");
    const s = localStorage.getItem("symbol");
    const validSymbol = s && ["cozy", "minimal", "retro", "nature"].includes(s);
    if (!a || !validSymbol) router.replace("/select");
  }, [router]);

  const [index, setIndex] = useState(0);
  const [dx, setDx] = useState(0);
  const startX = useRef<number | null>(null);

  const current = demoImages[index];
  const progressText = useMemo(
    () => `${Math.min(index + 1, demoImages.length)} / ${demoImages.length}`,
    [index]
  );

  const onStart = (x: number) => (startX.current = x);
  const onMove = (x: number) => {
    if (startX.current !== null) setDx(x - startX.current);
  };
  const onEnd = () => {
    if (!current) return;
    const moved = Math.abs(dx) > THRESHOLD;
    if (moved) {
      // 這裡可以加上你的業務邏輯（例如記錄喜歡/略過）
      setIndex((i) => Math.min(i + 1, demoImages.length));
    }
    setDx(0);
    startX.current = null;
  };

  // --- Tab Bar 的動作 ---
  const doShare = async () => {
    try {
      await navigator.share?.({
        title: "IKEA Swipe Match",
        url: typeof window !== "undefined" ? window.location.href : "/",
      });
    } catch {
      // 靜默失敗（桌機無 share）
    }
  };

  const doLike = () => {
    // 等同右滑：讓卡片位移超過門檻，觸發 onEnd
    setDx(THRESHOLD + 1);
    // 立即結算這次滑動
    setTimeout(onEnd, 0);
  };

  const goResults = () => {
    router.push("/results"); // 之後你做好 /results 頁就能跳過去
  };

  if (!current) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-dvh px-4 pt-16 pb-28 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold mb-2">配對完成！</h2>
        <p className="text-gray-600 mb-6">沒有更多房間了。</p>
        <div className="flex gap-3">
          <Link href="/select" className="rounded-2xl border px-5 py-3">
            重新選擇
          </Link>
          <Link href="/" className="rounded-2xl bg-yellow-300 px-5 py-3 font-semibold">
            回首頁
          </Link>
        </div>
      </main>
    );
  }

  const rotate = Math.max(-12, Math.min(12, dx / 10));
  const style = {
    transform: `translateX(${dx}px) rotate(${rotate}deg)`,
    transition: startX.current === null ? "transform 0.2s ease" : undefined,
  } as const;

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm px-4 pt-16 pb-28">
      {/* 左上 Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>

      {/* 卡片區 */}
      <section className="pt-8 pb-24"> {/* 底下留空，避免被 Tab Bar 蓋住 */}
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
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow" style={style}>
            <Image src={current} alt={`room-${index + 1}`} fill className="object-cover" priority />
          </div>
        </div>

        {/* 進度 */}
        <p className="mt-3 text-center text-sm text-gray-500">{progressText}</p>
      </section>

      {/* 固定底部 Tab Bar：Share｜Like｜Match */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur z-40">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 text-center">
          <button className="p-3 text-sm font-medium" onClick={doShare}>
            <span className="block text-xl" aria-hidden>📤</span>
            Share
          </button>

          <button className="p-3 text-sm font-medium" onClick={doLike}>
            <span className="block text-xl" aria-hidden>❤️</span>
            Like
          </button>

          <button className="p-3 text-sm font-medium" onClick={goResults}>
            <span className="block text-xl" aria-hidden>💖</span>
            Match
          </button>
        </div>
        {/* iPhone 安全區留白 */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </main>
  );
}
