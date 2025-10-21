// app/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // IKEA 色票
  const IKEA_BLUE = "#0058A3";
  // 更明顯的三段黃漸層（上更亮、中間黃、下更橙）
  const Y0 = "#FFF59E";
  const Y1 = "#FFD200";
  const Y2 = "#F2B400";

  return (
    <main
      className="min-h-dvh w-full"
      style={{
        background: `linear-gradient(180deg, ${Y0} 0%, ${Y1} 48%, ${Y2} 100%)`,
      }}
    >
      <div className="mx-auto grid min-h-dvh max-w-screen-sm grid-rows-[1fr_auto_auto_1fr] px-6">
        {/* 上方留白 */}
        <div />

        {/* 標題 */}
        <h1
          className="text-center text-3xl font-extrabold tracking-wide"
          style={{ color: IKEA_BLUE }}
        >
          GO RIGHT WITH
        </h1>

        {/* IKEA Logo */}
        <div className="mt-4 flex items-center justify-center">
          <Image
            src="/ikea.svg" // 確保檔案在 public/ikea.svg
            alt="IKEA"
            width={280}
            height={120}
            priority
          />
        </div>

        {/* 按鈕區：往上移、變瘦、去掉藍框 */}
        <div className="mt-8 flex items-center justify-center pb-12">
          <button
            onClick={() => router.push("/select")}
            aria-label="開始配對"
            className="
              group inline-flex w-full max-w-md items-center justify-start
              rounded-full px-6 py-2.5 shadow-lg
              transition-[background,transform,box-shadow] duration-200
              hover:-translate-y-0.5 hover:shadow-xl
              bg-white hover:bg-[#0058A3]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0058A3]
            "
          >
            {/* 左側文字（瘦版 → 字級略小） */}
            <span className="mr-3 text-lg font-bold tracking-[0.06em] text-[#0058A3] group-hover:text-white">
              GO
            </span>

            {/* 中間細線（略細） */}
            <span className="relative top-[1px] mr-3 block flex-1" aria-hidden="true">
              <span
                className="
                  block w-full border-t
                  transition-colors duration-200
                  border-[#0058A3] group-hover:border-white
                "
              />
            </span>

            {/* 右側箭頭（跟著反轉） */}
            <svg
              className="h-5 w-5 text-[#0058A3] group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
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
    </main>
  );
}
