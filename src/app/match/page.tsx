"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/data/rooms";


export default function MatchPage() {
  const router = useRouter();
  return (
    <main className="min-h-dvh p-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold mb-4">配對成功！💖</h2>
      <p className="text-gray-600 mb-6">你選擇的風格與房間一致。</p>
      <Link href="/swipe" className="rounded-xl bg-yellow-300 px-5 py-3 font-semibold hover:brightness-95">
        繼續配對
      </Link>
      {/* 底部 Tab */}
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
            {/* tab icon：/tab/match.svg */}
            <Image src="/icons/tab-match.svg" alt="Match" width={24} height={24} className="mx-auto mb-1" priority />
            Match
          </button>
          <button
            className="p-3 text-sm font-medium"
            onClick={() => router.push("/swipe")}
          >
            {/* tab icon：/tab/likes.svg */}
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
            {/* tab icon：/tab/share.svg */}
            <Image src="/icons/tab-share.svg" alt="Share" width={24} height={24} className="mx-auto mb-1" priority />
            Share
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </main>
  );
}
