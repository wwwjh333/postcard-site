// 1) 背景图：把你 images/ 里的文件名写进来
const backgrounds = ["images/bg1.jpg", "images/bg2.jpg"];

// 2) 随机祝福语（中英都行）
const messages = [
  "愿你每天都\n被温柔和好运包围。",
  "新的一周，\n事事顺心！",
  "祝你今天\n心情像阳光一样明亮。",
  "Greetings from our lab!\nHope you have a wonderful day.",
  "Keep going —\nYou’re doing great.",
];

function newSeed() {
  return Math.random().toString(36).slice(2, 10);
}

// 可复现随机：URL 里带 ?seed=xxx，就固定生成同一张
function seededRandom(seedStr) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ensureSeedInUrl() {
  const url = new URL(window.location.href);
  let seed = url.searchParams.get("seed");
  if (!seed) {
    seed = newSeed();
    url.searchParams.set("seed", seed);
    history.replaceState(null, "", url.toString());
  }
  return seed;
}

function pickFromSeed(seed) {
  const r = seededRandom(seed);
  const bg = backgrounds[Math.floor(r() * backgrounds.length)];
  const msg = messages[Math.floor(r() * messages.length)];
  return { bg, msg };
}

function render() {
  const seed = ensureSeedInUrl();
  const { bg, msg } = pickFromSeed(seed);
  const card = document.getElementById("card");
  card.style.backgroundImage = `url("${bg}")`;
  document.getElementById("msg").innerText = msg;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image_load_failed"));
    img.src = src;
  });
}

function wrapLinesByWidth(ctx, text, maxWidth) {
  const rawLines = String(text).split("\n");
  const out = [];
  for (const raw of rawLines) {
    const words = raw.split(/(\s+)/).filter((w) => w.length > 0);
    if (words.length === 0) {
      out.push("");
      continue;
    }
    let line = "";
    for (const w of words) {
      const test = line ? line + w : w;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
      } else {
        if (line) out.push(line.trimEnd());
        if (ctx.measureText(w).width > maxWidth) {
          // fallback：超长单词按字符切
          let chunk = "";
          for (const ch of w) {
            const t2 = chunk + ch;
            if (ctx.measureText(t2).width <= maxWidth) chunk = t2;
            else {
              if (chunk) out.push(chunk);
              chunk = ch;
            }
          }
          line = chunk;
        } else {
          line = w;
        }
      }
    }
    if (line) out.push(line.trimEnd());
  }
  return out;
}

async function saveCurrentCard() {
  const seed = ensureSeedInUrl();
  const { bg, msg } = pickFromSeed(seed);

  const W = 1080;
  const H = 1350; // 4/5
  const P = 56;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = await loadImage(bg);

  // cover 绘制
  const scale = Math.max(W / img.width, H / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = (W - dw) / 2;
  const dy = (H - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);

  // 底部渐变遮罩（和页面一致的视觉）
  const g = ctx.createLinearGradient(0, H, 0, H * 0.45);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.55, "rgba(0,0,0,0.10)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // 文案
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "alphabetic";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;

  const fontSize = 58;
  ctx.font = `700 ${fontSize}px system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", Arial, sans-serif`;
  const lines = wrapLinesByWidth(ctx, msg, W - P * 2);
  const lineHeight = Math.round(fontSize * 1.25);
  const totalTextHeight = lines.length * lineHeight;
  let y = H - P - totalTextHeight + Math.round(fontSize * 0.9);
  if (y < P) y = P + Math.round(fontSize * 0.9);
  for (const line of lines) {
    ctx.fillText(line, P, y);
    y += lineHeight;
  }

  const a = document.createElement("a");
  a.download = `postcard-${seed}.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
}
document.getElementById("share").addEventListener("click", async () => {
  const seed = ensureSeedInUrl();
  const url = new URL(window.location.href);
  url.searchParams.set("seed", seed);
  const link = url.toString();
  try {
    await navigator.clipboard.writeText(link);
  } catch {
    prompt("复制失败，请手动复制：", link);
  }
});

document.getElementById("save").addEventListener("click", async () => {
  try {
    await saveCurrentCard();
  } catch {
    // 尽量不打扰：保存失败时让用户至少能继续分享/再来一张
    alert("保存失败：请确认图片文件存在且可加载。");
  }
});

render();