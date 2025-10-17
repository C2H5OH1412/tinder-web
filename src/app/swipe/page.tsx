"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";

// 定義四種象徵風格的型別
export type SymbolId = "muji" | "cream" | "industrial" | "minimal";

const THRESHOLD = 80;

export default function SwipePage() {
  const router = useRouter();

  // 狀態：使用者選擇的象徵、當前房間索引、拖曳距離
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolId | null>(null);
  const [index, setIndex] = useState(0);
  const [dx, setDx] = useState(0);
  const startX = useRef<number | null>(null);

  /**
   * 讀取先前儲存的進度，只在第一次渲染時執行。
   * 如果 localStorage 有 swipeIndex，會用它來初始化 index。
   */
  useEffect(() => {
    const saved = localStorage.getItem("swipeIndex");
    if (saved) {
      const i = parseInt(saved, 10);
      if (!isNaN(i)) setIndex(i);
    }
  }, []);

  /**
   * 當 index 已經超過房間數量時，表示已經滑完所有房間，
   * 此時清除 localStorage 中的 swipeIndex，讓下一輪能從頭開始。
   */
  useEffect(() => {
    if (index >= rooms.length) {
      localStorage.removeItem("swipeIndex");
    }
  }, [index]);

  /**
   * 檢查 avatar 和 symbol 是否存在且合法。
   * 如果沒有相關資訊，導回 select 頁面。
   */
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

  // 目前要顯示的房間（若已經滑完則 current 會是 undefined）
  const current = rooms[index];

  // 進度顯示，例如 "3 / 40"
  const progressText = useMemo(() => {
    return `${Math.min(index + 1, rooms.length)} / ${rooms.length}`;
  }, [index]);

  /**
   * 儲存配對成功的房間 ID 至 localStorage.matchedIds
   */
  const pushMatched = (id: string) => {
    try {
      const raw = localStorage.getItem("matchedIds");
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      if (!arr.includes(id)) {
        arr.push(id);
        localStorage.setItem("matchedIds", JSON.stringify(arr));
      }
    } catch {}
  };

  /**
   * 遞增 index：
   * 1. 計算下一個索引（最多不超過 rooms.length）
   * 2. 立即寫入 localStorage.swipeIndex（非常重要，確保導頁前已經更新）
   * 3. 更新 state（畫面會反映新的 index）
   */
  const nextIndex = () => {
    setIndex((prev) => {
      const next = Math.min(prev + 1, rooms.length);
      localStorage.setItem("swipeIndex", next.toString());
      return next;
    });
  };

  /** 拖曳開始時記錄起始位置 */
  const onStart = (x: number) => {
    startX.current = x;
  };

  /** 拖曳移動時計算位移差距 dx */
  const onMove = (x: number) => {
    if (startX.current !== null) {
      setDx(x - startX.current);
    }
  };

  /**
   * 判斷滑動方向並處理：
   * - 右滑：
   *   - 是醜房間 → 先遞增索引，然後跳到 /fail
   *   - 是漂亮房間且風格一致 → 儲存匹配、先遞增索引，然後跳到 /match
   *   - 風格不符 → 直接下一張，不跳頁
   * - 左滑：直接下一張
   */
  const settle = (dir: "left" | "right") => {
    if (!current) return;

    if (dir === "right") {
      if (current.isUgly) {
        // 醜房間：進度加一再跳失敗頁
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
      // 右滑但風格不符：只進到下一張
      nextIndex();
      return;
    }

    // 左滑：直接下一張
    nextIndex();
  };

  /** 拖曳結束時判斷是否超過門檻 */
  const onEnd = () => {
    if (!current) return;
    if (Math.abs(dx) > THRESHOLD) {
      settle(dx > 0 ? "right" : "left");
    }
    setDx(0);
    startX.current = null;
  };

  // 如果 current 是 undefined，代表所有房間都已經滑完
  if (!current) {
    return (
      <main className="mx-auto max-w-screen-sm min-h-dvh flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-2xl font-semibold mb-2">配對完成！</h2>
      <p className="text-gray-600 mb-6">沒有更多房間了。</p>
      <div className="flex gap-3">
        <Link href="/results" className="rounded-2xl bg-yellow-300 px-5 py-3 font-semibold hover:brightness-95">
          查看我的配對
        </Link>
        {/* 如不需要返回首頁，下面這個可以刪除 */}
        <Link href="/" className="rounded-2xl border px-5 py-3">回首頁</Link>
      </div>
    </main>
    );
  }

  // 計算卡片旋轉角度
  const rotate = Math.max(-12, Math.min(12, dx / 10));
  const cardStyle = {
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
      <section className="pt-8 pb-24">
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
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow" style={cardStyle}>
            <Image src={current.image} alt={current.title} fill className="object-cover" priority />
          </div>
        </div>
        {/* 顯示進度 */}
        <p className="mt-3 text-center text-sm text-gray-500">{progressText}</p>
      </section>

      {/* 下方控制列：Share、Like、Match */}
      <nav className="fixed bottom-0 left-0 w-full border-t bg-white/90 backdrop-blur z-40">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 text-center">
          <button
            className="p-3 text-sm font-medium"
            onClick={async () => {
              try {
                await navigator.share?.({ title: "IKEA Swipe Match", url: location.href });
              } catch {}
            }}
          >
            <span className="block text-xl" aria-hidden>📤</span>
            Share
          </button>
          <button
            className="p-3 text-sm font-medium"
            onClick={() => {
              // 模擬右滑效果：讓 dx 大於門檻，然後呼叫 onEnd
              setDx(THRESHOLD + 1);
              setTimeout(onEnd, 0);
            }}
          >
            <span className="block text-xl" aria-hidden>❤️</span>
            Like
          </button>
          <button
            className="p-3 text-sm font-medium"
            onClick={() => router.push("/results")}
          >
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
