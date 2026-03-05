// 1) 背景图：把你 images/ 里的文件名写进来
const backgrounds = [
    "images/bg1.jpg",
    "images/bg2.jpg"
  ];
  
  // 2) 随机祝福语（中英都行）
  const messages = [
    "愿你每天都\n被温柔和好运包围。",
    "新的一周，\n事事顺心！",
    "祝你今天\n心情像阳光一样明亮。",
    "Greetings from our lab!\nHope you have a wonderful day.",
    "Keep going —\nYou’re doing great.",
  ];
  
  // 3) 署名（可换成活动/实验室/个人）
  const signatures = [
    "— Junhao",
    "— Towson University",
    "— AI Lab",
    "— From Baltimore",
  ];
  
  function randPick(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  // 可复现随机：如果 URL 里带 ?seed=xxx，就固定生成同一张
  function seededRandom(seedStr){
    let h = 2166136261;
    for (let i=0; i<seedStr.length; i++){
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return () => {
      h += 0x6D2B79F5;
      let t = Math.imul(h ^ (h >>> 15), 1 | h);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  
  function render(){
    const url = new URL(window.location.href);
    const seed = url.searchParams.get("seed");
  
    let r = Math.random;
    if (seed) r = seededRandom(seed);
  
    const bg = backgrounds[Math.floor(r() * backgrounds.length)];
    const msg = messages[Math.floor(r() * messages.length)];
    const sig = signatures[Math.floor(r() * signatures.length)];
  
    document.getElementById("card").style.backgroundImage = `url("${bg}")`;
    document.getElementById("msg").innerText = msg;
    document.getElementById("sig").innerText = sig;
  }
  
  function newSeedLink(){
    // 每次生成一个新 seed，这样“复制链接”可分享同一张卡
    const seed = Math.random().toString(36).slice(2, 10);
    const url = new URL(window.location.href);
    url.searchParams.set("seed", seed);
    return url.toString();
  }
  
  document.getElementById("again").addEventListener("click", () => {
    // 不带 seed：每次都变
    const url = new URL(window.location.href);
    url.searchParams.delete("seed");
    history.replaceState(null, "", url.toString());
    render();
  });
  
  document.getElementById("copy").addEventListener("click", async () => {
    const link = newSeedLink();
    try{
      await navigator.clipboard.writeText(link);
      alert("已复制链接：分享给别人能看到同一张明信片 ✅");
    }catch(e){
      prompt("复制失败，请手动复制：", link);
    }
  });
  
  render();