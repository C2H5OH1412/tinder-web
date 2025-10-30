"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const IKEA_BLUE = "#0058A3";

export default function ReadyPage() {
  const router = useRouter();

  const start = () => {
    // 這裡不改動其他邏輯，直接開始 swipe
    router.push("/swipe");
  };

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm bg-white px-4 pt-14 pb-32">
      {/* 左上小 IKEA Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={64} height={26} priority />
      </a>

      {/* 置中文字區 */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          快來尋找你的夢中情房
        </h1>
        <p className="mt-8 whitespace-pre-line text-xl font-extrabold text-black/90">
          接下來請{"\n"}「右滑你的type」
        </p>
      </section>

      {/* GO 按鈕（與首頁/Select 一致） */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto mb-[env(safe-area-inset-bottom)] max-w-screen-sm px-4 pb-5">
          <button
            onClick={start}
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
      </div>

      {/* hover 反轉 */}
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
