// 1) 背景图：把你 images/ 里的文件名写进来
const backgrounds = ["images/bg1.jpg", "images/bg2.jpg", "images/bg3.jpg", "images/bg4.jpg", "images/bg5.jpg", "images/bg6.jpg"];

// 2) 随机祝福语（妇女节主题）
const messages = [
  "愿你被世界温柔以待，\n也永远温柔地对待自己。\n—— 怀话里",
  "愿你眼里有光、心中有爱，\n走过人间每一程都不失赤诚。\n—— 怀话里",
  "今天的花送给你，\n愿你此后每一天都盛放如花。\n—— 怀话里",
  "不必完美，\n愿你永远忠于自己、自在发光。\n—— 怀话里",
  "愿你在生活里被认真对待，\n在自己的世界里被柔软接住。\n—— 怀话里",
  "祝你被理解、被尊重、被喜欢，\n也学会深深地喜欢自己。\n—— 怀话里",
  "愿你不被定义，\n在所有角色之外，先做自己。\n—— 怀话里",
  "愿你在柴米油盐里，\n也有鲜花、远方和不熄的热望。\n—— 怀话里",
  "生活有时锋利，\n愿你内心永远柔软又坚定。\n—— 怀话里",
  "无论几岁，\n都请保持好奇、浪漫与勇敢。\n—— 怀话里",
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

async function loadImageInfo(src) {
  const img = await loadImage(src);
  return {
    img,
    w: img.naturalWidth || img.width,
    h: img.naturalHeight || img.height,
  };
}

function render() {
  const seed = ensureSeedInUrl();
  const { bg, msg } = pickFromSeed(seed);
  const card = document.getElementById("card");
  card.style.backgroundImage = `url("${bg}")`;
  // 按背景图真实比例设置卡片比例，避免裁切/拉伸感
  loadImage(bg)
    .then((img) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (w > 0 && h > 0) card.style.setProperty("--card-aspect", `${w} / ${h}`);
    })
    .catch(() => {
      // 忽略：图片加载失败时用默认比例兜底
    });
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

async function buildCardCanvas() {
  const seed = ensureSeedInUrl();
  const { bg, msg } = pickFromSeed(seed);

  const { img, w: iw, h: ih } = await loadImageInfo(bg);
  const maxW = 1080; // 导出清晰度上限
  const scale = iw > 0 ? Math.min(1, maxW / iw) : 1;
  const W = Math.max(1, Math.round(iw * scale));
  const H = Math.max(1, Math.round(ih * scale));
  const P = Math.round(Math.min(W, H) * 0.06);

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { canvas, seed, msg, bg };

  // 直接按背景图本身比例导出（不做 cover 裁切）
  ctx.drawImage(img, 0, 0, W, H);

  // 文案：宋体风，黑色居中
  ctx.fillStyle = "#111827";
  ctx.textBaseline = "alphabetic";
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;

  const fontSize = Math.max(42, Math.round(Math.min(W, H) * 0.055));
  ctx.font = `500 ${fontSize}px "Songti SC", "STSong", "SimSun", "NSimSun", "宋体", "STZhongsong", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
  const lines = wrapLinesByWidth(ctx, msg, W - P * 2);
  const lineHeight = Math.round(fontSize * 1.35);
  const totalTextHeight = lines.length * lineHeight;

  let y = Math.round(H / 2 - totalTextHeight / 2 + fontSize * 0.9);
  if (y < P + fontSize) y = P + fontSize;

  for (const line of lines) {
    ctx.fillText(line, P, y);
    y += lineHeight;
  }

  return { canvas, seed, msg, bg };
}

async function saveCurrentCard() {
  const { canvas, seed } = await buildCardCanvas();
  if (!canvas) return;

  const isIOS = /iP(hone|ad|od)/i.test(navigator.userAgent);
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
  const dataUrl = canvas.toDataURL("image/png");

  if (isIOS || isWeChat) {
    // 在 iOS / 微信中，直接用当前页面展示大图，减少弹窗失败概率
    const prevHtml = document.documentElement.innerHTML;
    document.body.style.margin = "0";
    document.body.style.background = "#000";
    document.body.innerHTML = "";
    const img = document.createElement("img");
    img.src = dataUrl;
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.display = "block";
    document.body.appendChild(img);
    alert("长按图片即可保存到手机相册，如需返回请点击浏览器返回键。");
    // 不再恢复原页面，由浏览器返回逻辑接管
    return;
  }

  const a = document.createElement("a");
  a.download = `postcard-${seed}.png`;
  a.href = dataUrl;
  a.click();
}

async function shareCurrentCard() {
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
  const seed = ensureSeedInUrl();
  const url = new URL(window.location.href);
  url.searchParams.set("seed", seed);
  const link = url.toString();

  // 微信内置浏览器里，调系统分享/跳转经常触发“无法确认本次跳转是否安全”
  // 不在这里强行跳转，改为复制链接 + 引导用户用右上角菜单分享
  if (isWeChat) {
    try {
      await navigator.clipboard.writeText(link);
      alert("已复制链接。微信内请点右上角“…”选择“发送给朋友/分享到朋友圈”。");
    } catch {
      prompt("复制失败，请手动复制：", link);
    }
    return;
  }

  try {
    if (navigator.share) {
      // 优先尝试直接分享图片（部分新浏览器支持）
      if (navigator.canShare) {
        try {
          const { canvas } = await buildCardCanvas();
          if (canvas && canvas.toBlob) {
            const blob = await new Promise((resolve) =>
              canvas.toBlob(resolve, "image/png")
            );
            if (blob) {
              const file = new File([blob], `postcard-${seed}.png`, {
                type: "image/png",
              });
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                  files: [file],
                  title: document.title,
                  text: "",
                });
                return;
              }
            }
          }
        } catch (_) {
          // 回退到分享链接
        }
      }

      // 通用分享：带上链接，系统分享面板里可选微信/朋友圈
      await navigator.share({
        title: document.title,
        text: "来自「怀话里」的一张小卡片",
        url: link,
      });
      return;
    }
  } catch (_) {
    // 忽略，继续走复制链接回退
  }

  // 最后回退：复制链接
  try {
    await navigator.clipboard.writeText(link);
    alert("已复制链接，可以粘贴到微信好友或朋友圈。");
  } catch {
    prompt("复制失败，请手动复制：", link);
  }
}

document.getElementById("share").addEventListener("click", () => {
  shareCurrentCard();
});

document.getElementById("save").addEventListener("click", async () => {
  try {
    await saveCurrentCard();
  } catch {
    alert("保存失败：请确认图片文件存在且可加载。");
  }
});

render();