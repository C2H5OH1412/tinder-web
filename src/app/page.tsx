"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm bg-white px-4 pt-16 pb-28">
      {/* 左上 IKEA Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>

      {/* 標題 */}
      <section className="mt-12 text-center">
        <h1 className="text-2xl font-bold tracking-tight">找到你的命定房間</h1>
        <p className="mt-2 text-sm text-gray-600">右滑喜歡，左滑略過；配對成功就會顯示 MATCH！</p>
      </section>

      {/* Hero/佔位圖（可自行替換） */}
      <section className="mt-8">
        <div className="mx-auto aspect-[16/10] w-full max-w-sm rounded-3xl bg-gray-100" />
      </section>

      {/* 底部「開始」按鈕（偏下） */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto mb-[env(safe-area-inset-bottom)] max-w-screen-sm px-4 pb-6">
          <button
            onClick={() => router.push("/select")}
            className="w-full rounded-2xl bg-yellow-300 px-6 py-4 font-semibold hover:brightness-95"
          >
            開始
          </button>
        </div>
      </div>
    </main>
  );
}
