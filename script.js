// 1) 背景图：把你 images/ 里的文件名写进来
const backgrounds = [
  "images/bg1.jpg",
  "images/bg2.jpg",
  "images/bg3.jpg",
  "images/bg4.jpg",
  "images/bg5.jpg",
  "images/bg6.jpg",
];

// 2) 随机祝福语（妇女节主题）
const messages = [
  "愿你被世界温柔以待，\n也永远温柔地对待自己。",
  "愿你眼里有光、心中有爱，\n走过人间每一程都不失赤诚。",
  "今天的花送给你，\n愿你此后每一天都盛放如花。",
  "不必完美，\n愿你永远忠于自己、\n自在发光。",
  "愿你在生活里被认真对待，\n在自己的世界里被柔软接住。",
  "祝你被理解、被尊重、被喜欢，\n也学会深深地喜欢自己。",
  "愿你不被定义，\n在所有角色之外，先做自己。",
  "愿你在柴米油盐里，\n也有鲜花、远方和不熄的热望。",
  "生活有时锋利，\n愿你内心永远柔软又坚定。",
  "无论几岁，\n都请保持好奇、浪漫与勇敢。",
];

const luckyPrizePool = [
  { tier: "C", title: "「春日加料」", detail: "→ 免费特色小食一份", weight: 50 },
  { tier: "D", title: "「饮品小升级」", detail: "→ 今日小饮一杯", weight: 30 },
  { tier: "B", title: "「不见不散」", detail: "→ 20元下次见面礼", weight: 15 },
  { tier: "A", title: "「这一桌今天很幸运」", detail: "→ 本桌9折", weight: 5 },
];

const textYOffsetUnitsByBg = {
  "images/bg1.jpg": -12, // 上移 12 个单位（1单位=画布高度1%）
  "images/bg6.jpg": -10, // 上移 10 个单位（1单位=画布高度1%）
};

const LUCKY_RESULT_KEY = "postcard_lucky_result_v2";

function getTextYOffsetUnits(bg) {
  return textYOffsetUnitsByBg[bg] || 0;
}

function applyPreviewTextOffset(msgEl, card, bg) {
  if (!msgEl || !card) return;
  const units = getTextYOffsetUnits(bg);
  const offsetPx = Math.round((card.clientHeight || 0) * (units / 100));
  msgEl.style.transform = `translateY(${offsetPx}px)`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

// 正文结束后另起一行追加署名
function appendSuffixToLastLine(text, suffix) {
  const s = String(text).replace(/\s+$/g, "");
  return `${s}\n${suffix}`;
}

function getStoredLuckyResult() {
  try {
    return localStorage.getItem(LUCKY_RESULT_KEY);
  } catch {
    return null;
  }
}

function createAndStoreLuckyResult() {
  const totalWeight = luckyPrizePool.reduce((sum, item) => sum + item.weight, 0);
  let n = Math.random() * totalWeight;
  let picked = luckyPrizePool[luckyPrizePool.length - 1];
  for (const item of luckyPrizePool) {
    n -= item.weight;
    if (n < 0) {
      picked = item;
      break;
    }
  }
  const prize = `${picked.title}\n${picked.detail}`;
  try {
    localStorage.setItem(LUCKY_RESULT_KEY, prize);
  } catch {}
  return prize;
}

function playLuckyEnvelopeAnimation({ luckyBtn, luckyStage, luckyText, result }) {
  luckyText.textContent = "";
  luckyBtn.classList.add("is-loading");
  luckyBtn.textContent = "正在抽取今日幸运";
  luckyStage.classList.remove("is-revealed");
  luckyStage.classList.add("is-dropping");

  window.setTimeout(() => {
    luckyStage.classList.remove("is-dropping");
    luckyStage.classList.add("is-revealed");
    luckyText.textContent = result;
    luckyBtn.classList.remove("is-loading");
    luckyBtn.textContent = "打开幸运信封";
    luckyBtn.setAttribute("aria-expanded", "true");
  }, 1200);
}

function pickFromSeed(seed) {
  const r = seededRandom(seed);
  const bg = backgrounds[Math.floor(r() * backgrounds.length)];
  const base = messages[Math.floor(r() * messages.length)];
  const msg = appendSuffixToLastLine(base, "——妇女节快乐");
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
  const front = document.getElementById("front");
  if (front) front.style.backgroundImage = `url("${bg}")`;

  // 按背景图真实比例设置卡片比例
  loadImage(bg)
    .then((img) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (w > 0 && h > 0) card.style.setProperty("--card-aspect", `${w} / ${h}`);
      applyPreviewTextOffset(msgEl, card, bg);
    })
    .catch(() => {});

  // 网页显示：拆成正文 + 署名（署名右对齐）
  const msgEl = document.getElementById("msg");
  const parts = String(msg).split("\n");
  const signature = parts.pop() ?? "";
  msgEl.innerHTML = `
    <div class="msg-body">${parts.map(escapeHtml).join("<br>")}</div>
    <div class="msg-sig">${escapeHtml(signature)}</div>
  `;
  applyPreviewTextOffset(msgEl, card, bg);

  const luckyBtn = document.getElementById("luckyBtn");
  const luckyText = document.getElementById("luckyText");
  const luckyStage = document.getElementById("luckyStage");
  const repeatLuckyNote = document.getElementById("repeatLuckyNote");
  if (luckyBtn && luckyText && luckyStage) {
    luckyText.textContent = "";
    if (repeatLuckyNote) repeatLuckyNote.textContent = "";
    luckyBtn.textContent = "打开幸运信封";
    luckyBtn.classList.remove("is-loading");
    luckyBtn.disabled = false;
    luckyStage.classList.remove("is-dropping", "is-revealed");
    luckyBtn.setAttribute("aria-expanded", "false");
    luckyBtn.onclick = (e) => {
      e.stopPropagation();
      if (luckyBtn.classList.contains("is-loading")) return;
      const stored = getStoredLuckyResult();
      const result = stored || createAndStoreLuckyResult();
      if (repeatLuckyNote) {
        repeatLuckyNote.textContent = stored
          ? "这封幸运信封你已经签收过啦～我帮你保留上次的惊喜"
          : "";
      }
      playLuckyEnvelopeAnimation({ luckyBtn, luckyStage, luckyText, result });
    };
  }

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
  fixLastOrphan(out);
  return out;
}

function getPreviewTextMetrics() {
  const card = document.getElementById("card");
  const msgEl = document.getElementById("msg");
  const overlay = card ? card.querySelector(".front .overlay") : null;

  const cardWidth = card?.clientWidth || 0;
  const overlayStyle = overlay ? getComputedStyle(overlay) : null;
  const msgStyle = msgEl ? getComputedStyle(msgEl) : null;

  const px = (v, fallback = 0) => {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const paddingX = overlayStyle
    ? px(overlayStyle.paddingLeft, 18) + px(overlayStyle.paddingRight, 18)
    : 36;
  const msgWidth = msgEl?.getBoundingClientRect().width || 0;
  const fontSize = msgStyle ? px(msgStyle.fontSize, 30) : 30;
  const lineHeightPx = msgStyle ? px(msgStyle.lineHeight, fontSize * 1.35) : fontSize * 1.35;

  return {
    cardWidth: Math.max(1, cardWidth),
    fontSize,
    lineHeightPx,
    textWidth: Math.max(1, msgWidth || (cardWidth - paddingX)),
    rightPadding: Math.max(1, (cardWidth - (msgWidth || (cardWidth - paddingX))) / 2),
  };
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

  const preview = getPreviewTextMetrics();
  const scaleToCanvas = W / preview.cardWidth;
  const fontSize = Math.max(1, Math.round(preview.fontSize * scaleToCanvas));
  const lineHeight = Math.max(1, Math.round(preview.lineHeightPx * scaleToCanvas));
  const textMaxWidth = Math.max(1, Math.round(preview.textWidth * scaleToCanvas));
  const rightPadding = Math.max(1, Math.round(preview.rightPadding * scaleToCanvas));
  ctx.font = `500 ${fontSize}px "STXingkai", "华文行楷", "KaiTi", "楷体", "Kaiti SC", "PingFang SC", "Microsoft YaHei", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;

  const lines = wrapLinesByWidth(ctx, msg, textMaxWidth);
  const totalTextHeight = lines.length * lineHeight;

  let yCenter = H * 0.5;
  let y = Math.round(yCenter - totalTextHeight / 2 + fontSize * 0.9);
  const unitPx = Math.round(H * 0.01);
  const yOffset = getTextYOffsetUnits(bg) * unitPx;
  y += yOffset;
  if (y < P + fontSize) y = P + fontSize;

  // ✅ 正文居中，最后一行（署名）右对齐
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === lines.length - 1) {
      ctx.textAlign = "right";
      ctx.fillText(line, W - rightPadding, y);
    } else {
      ctx.textAlign = "center";
      ctx.fillText(line, Math.round(W / 2), y);
    }
    y += lineHeight;
  }

  return { canvas, seed, msg, bg };
}

function initViewer() {
  const viewer = document.getElementById("viewer");
  const img = document.getElementById("viewerImg");
  const backdrop = document.getElementById("viewerBackdrop");
  const closeBtn = document.getElementById("viewerClose");
  if (!viewer || !img || !backdrop || !closeBtn) return null;

  const hide = () => {
    viewer.hidden = true;
    img.src = "";
  };

  backdrop.addEventListener("click", hide);
  closeBtn.addEventListener("click", hide);

  return { viewer, img, show(dataUrl) { img.src = dataUrl; viewer.hidden = false; } };
}

const viewerApi = initViewer();

async function saveCurrentCard() {
  const { canvas } = await buildCardCanvas();
  if (!canvas || !viewerApi) return;
  const dataUrl = canvas.toDataURL("image/png");
  viewerApi.show(dataUrl);
}

async function shareCurrentCard() {
  const { canvas } = await buildCardCanvas();
  if (!canvas) return;

  // 1) 优先：能直接分享“图片文件”就分享图片文件（不会带链接）
  if (navigator.share && navigator.canShare && canvas.toBlob) {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (blob) {
      const file = new File([blob], "postcard.png", { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: document.title });
          return;
        } catch {
          // 用户取消 / 目标应用拒绝，静默回退到预览层
        }
      }
    }
  }

  // 2) 回退：用同一套预览层展示图片，用户可长按保存或分享
  if (viewerApi) {
    const dataUrl = canvas.toDataURL("image/png");
    viewerApi.show(dataUrl);
  }
}

document.getElementById("share").addEventListener("click", () => {
  shareCurrentCard();
});

document.getElementById("save").addEventListener("click", async () => {
  try {
    await saveCurrentCard();
  } catch {
    // 静默失败：可能是用户取消或环境限制，这里不再额外弹窗打扰
  }
});

function toggleCardFlip(forceFlip) {
  const card = document.getElementById("card");
  const btn = document.getElementById("surprise");
  if (!card || !btn) return;

  const shouldFlip = typeof forceFlip === "boolean" ? forceFlip : !card.classList.contains("is-flipped");
  card.classList.toggle("is-flipped", shouldFlip);
  btn.textContent = shouldFlip ? "收起惊喜" : "查收惊喜";
  btn.setAttribute("aria-pressed", shouldFlip ? "true" : "false");
}

document.getElementById("surprise").addEventListener("click", () => {
  toggleCardFlip();
});

document.getElementById("card").addEventListener("click", () => {
  toggleCardFlip();
});

function fixLastOrphan(lines) {
  if (!Array.isArray(lines) || lines.length < 2) return lines;
  const last = lines[lines.length - 1];
  const prev = lines[lines.length - 2];

  // 最后一行只有 1 个字（或 1 个可见字符）
  if (last && last.trim().length === 1 && prev && prev.trim().length >= 2) {
    const moved = prev.slice(-1);
    lines[lines.length - 2] = prev.slice(0, -1);
    lines[lines.length - 1] = moved + last;
  }
  return lines;
}

render();