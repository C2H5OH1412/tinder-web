export type FurnitureItem = {
  id: string;
  name: string;
  url: string;
  image?: string;       // 可補：相對路徑，如 /furnitures/xxx.jpg
  price?: string;       // 可補：例如 NT$1,290
  description?: string; // 可補：簡短說明
};
  
  // 對應 rooms.ts 的房間 id（請確認你的房間 id，如：cream1-pretty、minimal3-pretty …）
export const furnitureByRoom: Record<string, FurnitureItem[]> = {
  /* ---------------------- 奶油風 ---------------------- */
  "cream1-pretty": [
    { id: "kortgarden", name: "KORTGARDEN 掀床 150x200", url: "https://www.ikea.com.tw/zh/products/beds/bed-with-upholstered-headboard/kortgarden-art-40570833" },
    { id: "micke-desk-73x50", name: "MICKE 書桌 73x50", url: "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/micke-art-00488883" },
    { id: "sigtrygg-chair", name: "SIGTRYGG 餐椅", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/sigtrygg-spr-49481535" },
    { id: "knoppang-40x50", name: "KNOPPÄNG 相框 40x50", url: "https://www.ikea.com.tw/zh/products/wall-decoration/frames/knoppang-art-10427295" },
    { id: "kapkastanj-15", name: "KAPKASTANJ 花瓶 15cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/vases-bowls-and-accessories/kapkastanj-art-90607315" },
    { id: "tiphede-50x80", name: "TIPHEDE 平織地毯 50x80", url: "https://www.ikea.com.tw/zh/products/home-furnishing-rugs/small-rugs-and-runners/tiphede-art-20592826" },
  ],
  "cream2-pretty": [
    { id: "malm-bed-with-2boxes", name: "MALM 高床框附2收納盒（150x200/Luröy）", url: "https://www.ikea.com.tw/zh/products/beds/bed-frames/malm-spr-79200968" },
    { id: "knardrup-133x195", name: "KNARDRUP 短毛地毯 133x195", url: "https://www.ikea.com.tw/zh/products/home-furnishing-rugs/rugs/knardrup-art-40492623" },
    { id: "nattjasmin-200x200", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
    { id: "nordkisa-bedside", name: "NORDKISA 床邊桌 40x40", url: "https://www.ikea.com.tw/zh/products/chests-and-other-furniture/bedside-tables/nordkisa-art-40447678" },
    { id: "lill-sheer", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
    { id: "kalamondin-145x178", name: "KALAMONDIN 高遮光窗簾 145x178", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/kalamondin-art-50455352" },
    { id: "tertial-desk-lamp", name: "TERTIAL 工作燈", url: "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/tertial-art-90355727" },
  ],
  "cream3-pretty": [
    { id: "nattjasmin-200x200-beige", name: "NATTJASMIN 被套/2枕 淺米 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-30479108" },
    { id: "lisabo-table", name: "LISABO 桌子 88x78", url: "https://www.ikea.com.tw/zh/products/dining-tables/tables/lisabo-art-90563774" },
    { id: "skogsta-chair", name: "SKOGSTA 餐椅", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/skogsta-art-70544871" },
    { id: "lill-sheer", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
    { id: "lersta-floor-lamp", name: "LERSTA 落地/閱讀燈", url: "https://www.ikea.com.tw/zh/products/luminaires/floor-lamps/lersta-art-40110902" },
    { id: "blodbjork-vase", name: "BLODBJÖRK 花瓶 16cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/vases-bowls-and-accessories/blodbjork-art-90607301" },
  ],
  "cream4-pretty": [
    { id: "alex-desk-100x48", name: "ALEX 書桌 100x48", url: "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/alex-art-90473561" },
    { id: "skogsta-chair", name: "SKOGSTA 餐椅", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/skogsta-art-70544871" },
    { id: "lill-sheer", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
    { id: "rundhagtorn-200x200", name: "RUNDHAGTORN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/rundhagtorn-art-00600158" },
    { id: "konstfull-26", name: "KONSTFULL 花瓶 26cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/vases-bowls-and-accessories/konstfull-art-20511967" },
    { id: "bild-poster", name: "BILD 海報（都是蕃茄）21x30", url: "https://www.ikea.com.tw/zh/products/wall-decoration/pictures/bild-art-30601967" },
  ],

  /* ---------------------- 極簡風 ---------------------- */
  "minimal1-pretty": [
    { id: "lill-sheer", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
    { id: "mittzon-standing-desk", name: "MITTZON 升降式工作桌（電動）", url: "https://www.ikea.com.tw/zh/products/office-workspace/office-desks-and-tables/mittzon-spr-49526505" },
    { id: "ronninge-chair", name: "RÖNNINGE 餐椅 樺木", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/ronninge-art-80400754" },
    { id: "kapkastanj-15", name: "KAPKASTANJ 花瓶 15cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/vases-bowls-and-accessories/kapkastanj-art-90607315" },
    { id: "smycka-bouquet", name: "SMYCKA 人造花束 35cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/artificial-flowers/smycka-art-10601483" },
    { id: "nattjasmin-150x200", name: "NATTJASMIN 被套/1枕 150x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90442621" },
  ],
  "minimal2-pretty": [
    { id: "trotten-desk-120x70", name: "TROTTEN 書桌 120x70", url: "https://www.ikea.com.tw/zh/products/office-workspace/office-desks-and-tables/trotten-spr-29434390" },
    { id: "norraryd-chair", name: "NORRARYD 餐椅 黑色", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/norraryd-art-10362680" },
    { id: "ankarspel-desk-lamp", name: "ANKARSPEL 工作燈", url: "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/ankarspel-art-00494351" },
    { id: "nattjasmin-200x200", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
    { id: "blaskata-mousepad", name: "BLÅSKATA 遊戲滑鼠墊 40x80", url: "https://www.ikea.com.tw/zh/products/children%27s-small-furniture-eat---study/children%27s-study-furniture---accessories/blaskata-art-40569523" },
    { id: "lill-sheer-2", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
  ],
  "minimal3-pretty": [
    { id: "vihals-bed-150x200", name: "VIHALS 床框附2收納盒 150x200", url: "https://www.ikea.com.tw/zh/products/beds/bed-frames/vihals-spr-59581978" },
    { id: "ranarp-lamp", name: "RANARP 工作燈", url: "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/ranarp-art-60231314" },
    { id: "kyrre-stool", name: "KYRRE 椅凳 樺木", url: "https://www.ikea.com.tw/zh/products/dining-seating/stools/kyrre-art-80420040" },
    { id: "micke-desk-73x50", name: "MICKE 書桌 73x50", url: "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/micke-art-00488883" },
    { id: "hagernas-stool", name: "HÄGERNÄS 椅凳 松木", url: "https://www.ikea.com.tw/zh/products/dining-seating/stools/hagernas-art-30607016" },
    { id: "nattjasmin-200x200-white", name: "NATTJASMIN 被套/2枕 200x200 白", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
  ],
  "minimal4-pretty": [
    { id: "micke-desk", name: "MICKE 書桌 73x50", url: "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/micke-art-00488883" },
    { id: "vihals-bed-150x200", name: "VIHALS 床框附2收納盒 150x200", url: "https://www.ikea.com.tw/zh/products/beds/bed-frames/vihals-spr-59581978" },
    { id: "ronninge-chair-2", name: "RÖNNINGE 餐椅 樺木", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/ronninge-art-80400754" },
    { id: "modermoln-lamp", name: "MODERMOLN 檯燈", url: "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/modermoln-art-70546460" },
    { id: "lack-side-table", name: "LACK 邊桌 55x55", url: "https://www.ikea.com.tw/zh/products/armchairs-footstool-and-sofa-tables/sofa-tables/lack-art-70431534" },
    { id: "nattjasmin-200x200", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
  ],

  /* ---------------------- 工業風 ---------------------- */
  "industrial1-pretty": [
    { id: "fjallbo-wall-shelf", name: "FJÄLLBO 上牆式層架 101x20", url: "https://www.ikea.com.tw/zh/products/storage/wall-shelves-and-storage/fjallbo-art-00430585" },
    { id: "sunneby-molnart-pendant-1", name: "SUNNEBY/MOLNART 吊燈（球形）", url: "https://www.ikea.com.tw/zh/products/luminaires/pendant-lamps/sunneby-molnart-spr-89490118" },
    { id: "sunneby-molnart-pendant-2", name: "SUNNEBY/MOLNART 吊燈附燈泡（橢圓）", url: "https://www.ikea.com.tw/zh/products/luminaires/pendant-lamps/sunneby-molnart-spr-59505456" },
    { id: "sonhult-nesting-table", name: "SONHULT 子母桌 2件組", url: "https://www.ikea.com.tw/zh/products/armchairs-footstool-and-sofa-tables/sofa-tables/sonhult-art-50584293" },
    { id: "daggkapor-throw", name: "DAGGKÅPOR 萬用毯 130x170", url: "https://www.ikea.com.tw/zh/products/cushions-throws-and-chairpads/throws/daggkapor-art-50598643" },
    { id: "nattjasmin-200x200", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
  ],
  "industrial2-pretty": [
    { id: "hektar-spotlamp", name: "HEKTAR 夾式聚光燈", url: "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/hektar-art-10216542" },
    { id: "sandbrodd-throw", name: "SANDBRODD 萬用毯 130x170", url: "https://www.ikea.com.tw/zh/products/cushions-throws-and-chairpads/throws/sandbrodd-art-80562039" },
    { id: "nattjasmin-200x200", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
    { id: "nammarö-stool", name: "NÄMMARÖ 戶外椅凳", url: "https://www.ikea.com.tw/zh/products/outdoor-furniture/outdoor-dining-seating/nammaro-art-10510355" },
    { id: "ronninge-barstool", name: "RÖNNINGE 吧台椅 63cm", url: "https://www.ikea.com.tw/zh/products/dining-seating/bar-stools/ronninge-art-10512905" },
    { id: "navlinge-clip-lamp", name: "NÄVLINGE 夾式聚光燈", url: "https://www.ikea.com.tw/zh/products/luminaires/desk-lamps-and-clamp-lamps/navlinge-art-40408323" },
  ],
  "industrial3-pretty": [
    { id: "lagkapten-adils-120x60", name: "LAGKAPTEN/ADILS 書桌 120x60", url: "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/lagkapten-adils-spr-79416888" },
    { id: "lisabo-chair-black", name: "LISABO 餐椅 黑色", url: "https://www.ikea.com.tw/zh/products/dining-seating/non-upholstered-chairs/lisabo-art-10457230" },
    { id: "lakevanderot-200x200", name: "LÄKEVÄNDEROT 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/lakevanderot-art-80606477" },
    { id: "vilhatten-wardrobe", name: "VILHATTEN 2門2抽衣櫃", url: "https://www.ikea.com.tw/zh/products/wardrobes/solitaire-wardrobes/vilhatten-art-50530610" },
    { id: "billy-bookcase", name: "BILLY 書櫃 40x28x202", url: "https://www.ikea.com.tw/zh/products/storage/bookcases/billy-art-20492775" },
    { id: "ankarspel-wall-lamp", name: "ANKARSPEL 壁燈", url: "https://www.ikea.com.tw/zh/products/luminaires/clamp-and-wall-lamps/ankarspel-art-90494356" },
  ],
  "industrial4-pretty": [
    { id: "ankarspel-wall-lamp-2", name: "ANKARSPEL 壁燈", url: "https://www.ikea.com.tw/zh/products/luminaires/clamp-and-wall-lamps/ankarspel-art-90494356" },
    { id: "vastanhed-frame-20x25", name: "VÄSTANHED 相框 20x25", url: "https://www.ikea.com.tw/zh/products/wall-decoration/frames/vastanhed-art-20479217" },
    { id: "sonhult-nesting-table-2", name: "SONHULT 子母桌 2件組", url: "https://www.ikea.com.tw/zh/products/armchairs-footstool-and-sofa-tables/sofa-tables/sonhult-art-50584293" },
    { id: "sandbrodd-throw-2", name: "SANDBRODD 萬用毯 130x170", url: "https://www.ikea.com.tw/zh/products/cushions-throws-and-chairpads/throws/sandbrodd-art-80562039" },
    { id: "nattjasmin-200x200-2", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
    { id: "bengta-210x250", name: "BENGTA 遮光窗簾 210x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/bengta-art-50602150" },
  ],

  /* ---------------------- 無印風 ---------------------- */
  "muji1-pretty": [
    { id: "bengta-210x250", name: "BENGTA 遮光窗簾 210x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/bengta-art-50602150" },
    { id: "linnmon-adils-100x60", name: "LINNMON/ADILS 書桌 100x60", url: "https://www.ikea.com.tw/zh/products/home-workspace/home-desks/linnmon-adils-spr-59416337" },
    { id: "kyrre-stool", name: "KYRRE 椅凳 樺木", url: "https://www.ikea.com.tw/zh/products/dining-seating/stools/kyrre-art-80420040" },
    { id: "rodalm-frame-30x40", name: "RÖDALM 相框 30x40", url: "https://www.ikea.com.tw/zh/products/wall-decoration/frames/rodalm-art-80566396" },
    { id: "fejka-21cm", name: "FEJKA 人造盆栽 21cm", url: "https://www.ikea.com.tw/zh/products/green-decoration/artificial-plants/fejka-art-00491574" },
    { id: "fejka-6cm-3pcs", name: "FEJKA 人造盆栽 3件組 6cm", url: "https://www.ikea.com.tw/zh/products/green-decoration/artificial-plants/fejka-art-20601468" },
  ],
  "muji2-pretty": [
    { id: "smycka-bouquet", name: "SMYCKA 人造花束 35cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/artificial-flowers/smycka-art-10601483" },
    { id: "tonstad-side-table", name: "TONSTAD 邊桌 橡木", url: "https://www.ikea.com.tw/zh/products/armchairs-footstool-and-sofa-tables/sofa-tables/tonstad-art-60528471" },
    { id: "rodalm-frame-30x40-2", name: "RÖDALM 相框 30x40", url: "https://www.ikea.com.tw/zh/products/wall-decoration/frames/rodalm-art-80566396" },
    { id: "berakna-vase-45", name: "BERÄKNA 花瓶 45cm", url: "https://www.ikea.com.tw/zh/products/home-decoration/vases-bowls-and-accessories/berakna-art-60327948" },
    { id: "lakevanderot-200x200", name: "LÄKEVÄNDEROT 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/lakevanderot-art-80606477" },
    { id: "fiskbo-21x30", name: "FISKBO 相框 21x30", url: "https://www.ikea.com.tw/zh/products/wall-decoration/frames/fiskbo-art-90300457" },
  ],
  "muji3-pretty": [
    { id: "fejka-monstera-6", name: "FEJKA 人造盆栽 龜背芋 6cm", url: "https://www.ikea.com.tw/zh/products/green-decoration/artificial-plants/fejka-art-40593207" },
    { id: "fejka-21cm", name: "FEJKA 人造盆栽 21cm", url: "https://www.ikea.com.tw/zh/products/green-decoration/artificial-plants/fejka-art-00491574" },
    { id: "lill-sheer", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
    { id: "rodalm-frame-30x40", name: "RÖDALM 相框 30x40", url: "https://www.ikea.com.tw/zh/products/wall-decoration/frames/rodalm-art-80566396" },
    { id: "lakevanderot-200x200", name: "LÄKEVÄNDEROT 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/lakevanderot-art-80606477" },
    { id: "stockholm-2025-side", name: "STOCKHOLM 2025 邊桌 松木", url: "https://www.ikea.com.tw/zh/products/armchairs-footstool-and-sofa-tables/sofa-tables/stockholm-2025-art-70586564" },
  ],
  "muji4-pretty": [
    { id: "stockholm-2025-side-2", name: "STOCKHOLM 2025 邊桌 松木", url: "https://www.ikea.com.tw/zh/products/armchairs-footstool-and-sofa-tables/sofa-tables/stockholm-2025-art-70586564" },
    { id: "fejka-monstera-6-2", name: "FEJKA 人造盆栽 龜背芋 6cm", url: "https://www.ikea.com.tw/zh/products/green-decoration/artificial-plants/fejka-art-40593207" },
    { id: "gunnemor-throw", name: "GUNNEMOR 萬用毯 130x170", url: "https://www.ikea.com.tw/zh/products/cushions-throws-and-chairpads/throws/gunnemor-art-40516474" },
    { id: "lill-sheer", name: "LILL 紗簾 2件裝 280x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/lill-art-70171927" },
    { id: "nattjasmin-200x200", name: "NATTJASMIN 被套/2枕 200x200", url: "https://www.ikea.com.tw/zh/products/bedlinen/quilt-covers/nattjasmin-art-90479110" },
    { id: "bengta-210x250", name: "BENGTA 遮光窗簾 210x250", url: "https://www.ikea.com.tw/zh/products/window-solutions/curtains-and-window-panels/bengta-art-50602150" },
  ],
};
  