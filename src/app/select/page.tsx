"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IKEA_BLUE = "#0058A3";

const AVATARS = [
  { id: "boy", label: "男孩", src: "/avatars/boy.png" },
  { id: "girl", label: "女孩", src: "/avatars/girl.png" },
  { id: "baby", label: "嬰兒", src: "/avatars/baby.png" },
  { id: "dog", label: "狗狗", src: "/avatars/dog.png" },
  { id: "cat", label: "貓貓", src: "/avatars/cat.png" },
  { id: "hamster", label: "倉鼠", src: "/avatars/hamster.png" },
] as const;

export default function SelectPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);

  // 回填
  useEffect(() => {
    const a = localStorage.getItem("pref_avatar");
    if (a) setAvatar(a);
  }, []);

  const ready = avatar != null;

  const goNext = () => {
    if (!ready) return;
    // 儲存頭貼
    localStorage.setItem("pref_avatar", String(avatar));
    // 為了相容既有 swipe 的檢查，若沒有 pref_symbol 就給預設值
    if (!localStorage.getItem("pref_symbol")) {
      localStorage.setItem("pref_symbol", "muji");
    }
    router.push("/ready");
  };

  return (
    <main className="relative mx-auto min-h-dvh max-w-screen-sm bg-white px-4 pt-14 pb-32">
      {/* 左上小 IKEA Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={64} height={26} priority />
      </a>

      {/* 標題：請選擇你的頭貼 */}
      <section className="mt-10 text-center">
        <p className="text-[17px] font-semibold text-gray-700">請選擇你的頭貼</p>
      </section>

      {/* 頭像選擇（圖片圓形） */}
      <section className="mt-4">
        <div className="mx-auto grid max-w-[320px] grid-cols-3 gap-5">
          {AVATARS.map((item) => {
            const active = avatar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAvatar(item.id)}
                aria-pressed={active}
                className={[
                  "relative h-20 w-20 overflow-hidden rounded-full transition-all duration-200",
                  active
                    ? "ring-4 ring-yellow-400 scale-105 shadow-md"
                    : "ring-2 ring-gray-300 hover:scale-105",
                ].join(" ")}
                aria-label={item.label}
              >
                <Image src={item.src} alt={item.label} fill className="object-cover" sizes="80px" />
              </button>
            );
          })}
        </div>
      </section>

      {/* GO 按鈕 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto mb-[env(safe-area-inset-bottom)] max-w-screen-sm px-4 pb-5">
          <button
            disabled={!ready}
            onClick={goNext}
            className={[
              "group flex h-12 w-full items-center rounded-full bg-white shadow-lg",
              "transition-[background,transform,box-shadow] duration-200",
              "hover:-translate-y-0.5 hover:shadow-xl",
              ready ? "opacity-100" : "opacity-60 pointer-events-none",
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
