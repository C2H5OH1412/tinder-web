"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rooms } from "@/data/rooms";
import { furnitureByRoom, FurnitureItem } from "@/data/furnitures";
import { useRouter } from "next/navigation";

// 定義四種象徵風格
export type SymbolId = "muji" | "cream" | "industrial" | "minimal";

const THRESHOLD = 80;


export default function ResultsPage() {
  const router = useRouter();
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // 頁面掛載時讀取配對成功的房間 ID
  useEffect(() => {
    const raw = localStorage.getItem("matchedIds");
    if (raw) {
      try {
        const ids = JSON.parse(raw) as string[];
        setMatchedIds(ids);
        if (ids.length > 0) setSelectedRoomId(ids[0]); // 預設選第一張房間
      } catch {
        /* ignore JSON parse errors */
      }
    }
  }, []);

  // 根據選擇的房間 id 取得家具列表
  const selectedItems: FurnitureItem[] = selectedRoomId
    ? furnitureByRoom[selectedRoomId] || []
    : [];

  return (
    <main className="relative mx-auto max-w-screen-sm min-h-dvh px-4 pt-16 pb-28">
      {/* 左上 IKEA Logo */}
      <a href="/" className="absolute left-4 top-3 inline-flex items-center" aria-label="首頁">
        <Image src="/ikea.svg" alt="IKEA" width={76} height={30} priority />
      </a>

      <h1 className="text-2xl font-bold mb-4">My Matches</h1>

      {/* 配對成功的房間縮圖列 */}
      <div className="flex overflow-x-auto space-x-3 mb-6">
        {matchedIds.map((rid) => {
          const room = rooms.find((r) => r.id === rid);
          if (!room) return null;
          const active = selectedRoomId === rid;
          return (
            <button
              key={rid}
              onClick={() => setSelectedRoomId(rid)}
              className={`flex-shrink-0 w-32 ${active ? "ring-2 ring-yellow-400" : ""}`}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl relative">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="mt-1 text-xs block text-center">{room.title}</span>
            </button>
          );
        })}
      </div>

      <h2 className="text-xl font-semibold mb-2">Accessories</h2>

      {/* 家具列表 */}
      <div className="space-y-6">
        {selectedItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="w-20 h-20 flex-shrink-0 relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-1 font-bold text-lg">{item.price}</p>
              {/* 打開 IKEA 商品頁，target="_blank" 會在新分頁開啟 */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Website
              </a>
            </div>
          </div>
        ))}
        {selectedItems.length === 0 && (
          <p className="text-gray-500">此房間沒有對應的家具資料。</p>
        )}
      </div>
      {/* tab：Share、Like、Match */}
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
            onClick={() => router.push("/swipe")}
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
        {/* 留白 */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </main>
  );
}
