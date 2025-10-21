export type FurnitureItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string; // 圖片路徑 ( public/furniture/)
    url: string;   // IKEA 官方商品網址
  };
  
  // 以房間 id 為 key，列出每個房間用到的家具
  export const furnitureByRoom: Record<string, FurnitureItem[]> = {
    "muji1-pretty": [
      {
        id: "kivik",
        name: "KIVIK",
        description: "雙人座沙發, tresund 淺米色",
        price: "$15,990",
        image: "/furniture/kivik.jpg",
        url: "https://www.ikea.com/tw/zh/p/kivik-sofa-50298173/"
      },
      {
        id: "hyllis",
        name: "HYLLIS",
        description: "層架組, 室內/戶外用, 60x27x74 公分",
        price: "$499",
        image: "/furniture/hyllis.jpg",
        url: "https://www.ikea.com/tw/zh/p/hyllis-shelving-unit-galvanised-00278578/"
      },
      {
        id: "torared",
        name: "TORARED",
        description: "吊燈罩, 海草",
        price: "$549",
        image: "/furniture/torared.jpg",
        url: "https://www.ikea.com/tw/zh/p/torared-pendant-lamp-shade-seagrass-10395304/"
      }
    ],
    // 其他房間...
  };
  