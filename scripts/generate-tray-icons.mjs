import sharp from "sharp";
import { fileURLToPath } from "node:url";

// 托盘图标：与紫竹轻图 logo 同构（圆角卡片 + 山形 + 右下角绿叶）
// 卡片/细节/叶子三色随系统明暗切换，保证在浅色与深色托盘上都清晰
function traySvg(card, detail, leaf) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect x="3" y="3" width="58" height="58" rx="15" fill="${card}"/>
      <circle cx="43" cy="18" r="4.5" fill="${detail}" opacity=".9"/>
      <path d="M10 44 21 30l8 8 8-10 11 16Z" fill="${detail}" opacity=".72"/>
      <ellipse cx="51" cy="51" rx="12.5" ry="7.5" transform="rotate(-45 51 51)" fill="${leaf}"/>
    </svg>
  `);
}

// 浅色系统托盘 → 白底绿细节
await sharp(traySvg("#ffffff", "#1f5c46", "#7ec24a"))
  .png()
  .toFile(fileURLToPath(new URL("../src-tauri/icons/tray-light.png", import.meta.url)));

// 深色系统托盘 → 深绿底白细节 + 亮绿叶子
await sharp(traySvg("#153f33", "#ffffff", "#a5e06a"))
  .png()
  .toFile(fileURLToPath(new URL("../src-tauri/icons/tray-dark.png", import.meta.url)));
