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
const messagesRaw = [
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
  "美从来不止一种，\n可以说，\n无数女性自由辽阔的灵魂，\n都在扩展美的边界。",
  "我生来便有分量，\n半是刀锋半是丝柔，\n难以忘怀。",
  "她有千钧力，亦有万万相。",
  "愿你不惑于年龄，\n不困于身材，\n独立且骄傲，\n自由且美好，\n一切美好皆属于你。",
  "做母亲 做妻子 做女儿 \n这些角色固然重要 \n但更重要的是 \n做你自己 \n 唯有如此 \n才能活得真实而自由",
  "妇 \n 推到大山的女性 \n 38妇女节\n 是世界各国妇女争取和平\n 民主 平等 发展的节日",
  "女子 \n 就是好",
  "女性的美好，\n无可替代，\n祝你自我绽放",
  "当女性称呼自己为妇女，\n不是因为年龄，\n而是因为力量。",
  "是玫瑰是松柏是荆棘，\n是任何她想成为的样子。",
    "愿你被世界温柔以待，\n也永远温柔地对待自己。",
    "愿你眼里有光，\n心中有爱，\n走过人间每一程都不失赤诚。",
    "今天的花送给你，\n愿你此后每一天都盛放如花。",
    "不必完美，\n愿你永远忠于自己，\n自在发光。",
    "愿你在生活里被认真对待，\n在自己的世界里被柔软接住。",
    "祝你被理解，\n被尊重，\n被喜欢，\n也学会深深地喜欢自己。",
    "愿你不被定义，\n在所有角色之外，\n先做自己。",
    "愿你在柴米油盐里，\n也有鲜花、远方和不熄的热望。",
    "生活有时锋利，\n愿你内心永远柔软又坚定。",
    "无论几岁，\n都请保持好奇、浪漫与勇敢。",
    "美从来不止一种，\n无数女性自由辽阔的灵魂，\n都在扩展美的边界。",
    "我生来便有分量，\n半是刀锋，\n半是丝柔。",
    "她有千钧力，\n亦有万万相。",
    "愿你不惑于年龄，\n不困于身材，\n独立且骄傲，\n自由且美好。",
    "做母亲，做妻子，做女儿，\n这些角色固然重要，\n但更重要的是，\n做你自己。",
    "当女性称呼自己为妇女，\n不是因为年龄，\n而是因为力量。",
    "女性的美好，\n无可替代，\n祝你自我绽放。",
    "是玫瑰，\n是松柏，\n是荆棘，\n是任何她想成为的样子。",
    "愿今天，\n有人为你庆祝，\n也有人认真听见你。",
    "愿你温柔，\n也有锋芒，\n柔软，\n也有力量。",
  
    "今天这顿饭，\n敬每一个认真生活的她。",
    "今天这一席，\n为她举杯。",
    "今天这一桌烟火，\n为她而热。",
    "今天这顿饭，\n属于闪闪发光的你。",
    "今天这一桌，\n庆祝每一个不被定义的她。",
    "今天不为角色举杯，\n只为她自己。",
    "今天这一顿，\n敬自由生长的她。",
    "今天的相聚，\n献给认真生活的你。",
    "今天这桌热气腾腾，\n刚好配得上你的光。",
    "今天这一席，\n属于世界上独一无二的她。",
    "敬今天的你，\n也敬一直努力生活的你。",
    "今天这一顿饭，\n庆祝温柔而坚定的女性。",
    "今天，\n请把掌声送给自己。",
    "今天，\n这桌烟火是为你准备的。",
    "今天这一餐，\n纪念所有不曾退让的勇敢。",
    "今天这一桌，\n敬她，也敬她自己。",
    "今天，\n让生活为你停一停。",
    "今天这顿饭，\n只为庆祝你本身。",
    "今天，\n愿你被认真庆祝。",
    "今天这一席，\n敬每一种女性的模样。",
  
    "她不是谁的附属，\n她是自己的宇宙。",
    "她不是某种答案，\n她是无限可能。",
    "她不是标签，\n她是故事。",
    "她不是谁的影子，\n她是自己的光。",
    "她不是被定义的人，\n她是定义自己的人。",
    "她不是单一的模样，\n她本就有万千风景。",
    "她不是配角，\n她是人生的主角。",
    "她不是被允许发光，\n她本来就会发光。",
    "她不是一种角色，\n她是一种力量。",
    "她不是等待被看见，\n她是主动走向光的人。",
    "她可以温柔，\n也可以翻山越海。",
    "她可以安静，\n也可以光芒万丈。",
    "她可以细腻，\n也可以坚定有力。",
    "她可以浪漫，\n也可以不动声色地强大。",
    "她可以柔软，\n也可以锋利。",
    "她可以平凡，\n也可以闪耀。",
    "她可以做母亲，\n也可以只做她自己。",
    "她可以盛放如花，\n也可以稳稳如山。",
    "她可以在烟火中温柔，\n也可以在风雨中勇敢。",
    "她可以成为，\n任何她想成为的样子。",
  
    "人间烟火里，\n敬自由生长的她。",
    "人间烟火里，\n有一席为她。",
    "人间烟火里，\n刚好有你。",
    "人间烟火里，\n愿你被好好款待。",
    "人间烟火里，\n总有一桌为你而热。",
    "人间烟火里，\n愿你自在发光。",
    "人间烟火里，\n敬每一个认真生活的她。",
    "人间烟火里，\n愿你被温柔接住。",
    "人间烟火里，\n愿这一餐刚好治愈你。",
    "人间烟火里，\n总有人记得为你添一双筷子。",
    "人间烟火里，\n愿你有热饭，\n有花，\n有爱。",
    "人间烟火里，\n一顿好饭也算温柔。",
    "人间烟火里，\n愿你被这个世界轻轻拥抱。",
    "人间烟火里，\n也请先照顾好自己。",
    "人间烟火里，\n庆祝每一种自由的女性。",
    "人间烟火里，\n愿你有地方停靠。",
    "人间烟火里，\n愿你有力气做自己。",
    "人间烟火里，\n愿所有奔波都被安放。",
    "人间烟火里，\n这一桌，\n为你而留。",
    "人间烟火里，\n愿你每次相聚都值得。",
  
    "世界很大，\n而你拥有自己的方向。",
    "世界很大，\n而你就是其中的一束光。",
    "世界很大，\n愿你勇敢去看。",
    "世界很大，\n愿你先看见自己。",
    "世界很大，\n也别忘了好好爱自己。",
    "世界很吵，\n愿你始终听见自己。",
    "世界很快，\n愿你保有自己的节奏。",
    "世界偶尔锋利，\n愿你依旧柔软。",
    "世界不必替你定义，\n你本身就是答案。",
    "世界有很多声音，\n愿你忠于内心那一个。",
  
    "如果生活锋利，\n愿你依然柔软。",
    "如果前路漫长，\n愿你依然有光。",
    "如果岁月匆忙，\n愿你依然从容。",
    "如果风雨忽至，\n愿你依然坚定。",
    "如果世界很吵，\n愿你还能听见自己的心。",
    "如果远方很远，\n愿你也敢出发。",
    "如果今天疲惫，\n愿这顿饭替你补一点光。",
    "如果成长有代价，\n愿你依旧选择真实。",
    "如果生活不够温柔，\n愿你对自己温柔。",
    "如果无人鼓掌，\n愿你先为自己举杯。",
  
    "有些光，\n不需要被允许。",
    "有些力量，\n本来就属于女性。",
    "有些温柔，\n天生带着力量。",
    "有些勇敢，\n从来不喧哗。",
    "有些盛放，\n不必等谁批准。",
    "有些人生，\n本来就辽阔。",
    "有些故事，\n正从她开始。",
    "有些女性，\n本身就是答案。",
    "有些坚定，\n藏在温柔里。",
    "有些自由，\n值得认真庆祝。",
  
    "愿你拥有自己的名字，\n也拥有自己的故事。",
    "愿你拥有选择的勇气，\n也拥有回头的底气。",
    "愿你在爱别人之前，\n先学会深爱自己。",
    "愿你走过风雨，\n仍有抬头看花的心情。",
    "愿你在所有关系之外，\n依然完整。",
    "愿你不必证明什么，\n也值得世间温柔。",
    "愿你在每一次低谷里，\n都能慢慢长出力量。",
    "愿你把生活过成自己喜欢的样子。",
    "愿你在人群之中闪耀，\n在独处时也安然。",
    "愿你始终知道，\n你本身就很好。",
  
    "愿你走过柴米油盐，\n也依然相信浪漫。",
    "愿你有盔甲，\n也有软肋，\n但从不轻易被击碎。",
    "愿你有锋芒，\n也有温度。",
    "愿你拥有一往无前的勇气，\n也拥有随时停下来的自由。",
    "愿你在每一个普通日子里，\n都活得漂亮。",
    "愿你在时间里成长，\n而不是被时间定义。",
    "愿你学会拒绝，\n也学会偏爱自己。",
    "愿你不必讨好世界，\n也能活得丰盛。",
    "愿你永远知道自己想要什么。",
    "愿你被这个世界看见，\n更被自己认可。",
  
    "愿你被鲜花簇拥，\n也被自己珍重。",
    "愿你在人生的春天里，\n自由盛放。",
    "愿你不被束缚，\n不被规训，\n不被轻易概括。",
    "愿你能在柔软中强大，\n在安静中耀眼。",
    "愿你一路生花，\n也一路有答案。",
    "愿你在每一个身份之外，\n都先成为自己。",
    "愿你不被标签困住，\n只被热爱照亮。",
    "愿你在生活的缝隙里，\n也能找到属于自己的光。",
    "愿你从容、明亮、坚定、自由。",
    "愿你始终拥有重启生活的勇气。",
  
    "今天，\n为自由的她举杯。",
    "今天，\n为勇敢的她举杯。",
    "今天，\n为温柔的她举杯。",
    "今天，\n为坚定的她举杯。",
    "今天，\n为闪闪发光的她举杯。",
    "今天，\n为成为自己的她举杯。",
    "今天，\n为辽阔的她举杯。",
    "今天，\n为认真生活的她举杯。",
    "今天，\n为热烈生长的她举杯。",
    "今天，\n为不被定义的她举杯。",
  
    "她是玫瑰，\n也是松柏。",
    "她是柔软，\n也是锋芒。",
    "她是光，\n也是方向。",
    "她是温柔，\n也是山海。",
    "她是故事，\n也是未来。",
    "她是春风，\n也是烈焰。",
    "她是花朵，\n也是大树。",
    "她是细雨，\n也是惊雷。",
    "她是日常里的微光，\n也是岁月里的丰盛。",
    "她是自己，\n就是最好的答案。",
  
    "这一桌烟火，\n敬每一位她。",
    "这一餐热气腾腾，\n也愿你的人生如此。",
    "这一顿饭，\n属于今天的你。",
    "这一席相聚，\n为女性的力量庆祝。",
    "这一桌热闹，\n配得上你的闪耀。",
    "这一桌温暖，\n刚好接住今天的你。",
    "这一口热饭，\n也算世界的温柔。",
    "这一顿认真吃下的饭，\n也在认真爱自己。",
    "这一席烟火，\n敬生活，\n也敬你。",
    "这一餐，\n愿你慢慢吃，\n慢慢发光。",
  
    "祝你有梦可追，\n有路可走，\n有光可循。",
    "祝你始终明亮，\n始终自由，\n始终有爱。",
    "祝你不被世俗削弱棱角。",
    "祝你活成喜欢的模样。",
    "祝你在复杂世界里，\n保有简单而坚定的心。",
    "祝你步履不停，\n也内心安稳。",
    "祝你拥有表达的底气，\n和沉默的自由。",
    "祝你想爱的时候去爱，\n想走的时候敢走。",
    "祝你被岁月善待，\n也被自己宠爱。",
    "祝你看山是山，\n看海是海，\n看自己是光。",
  
    "你本来就很好，\n不必等谁认证。",
    "你本来就值得，\n被爱，\n被尊重，\n被认真对待。",
    "你本来就耀眼，\n不需要借谁的光。",
    "你本来就自由，\n只是别忘了向前走。",
    "你本来就有力量，\n只是偶尔需要被提醒。",
    "你本来就是一束光，\n无需谁来点亮。",
    "你本来就不必完美，\n也足够动人。",
    "你本来就配得上世间温柔。",
    "你本来就值得一顿好饭，\n和一场认真庆祝。",
    "你本来就属于你自己。",
  
    "把今天留给自己，\n把掌声送给自己。",
    "把春天装进心里，\n也把勇气放进日子里。",
    "把这顿饭当成礼物，\n送给认真生活的你。",
    "把生活过成旷野，\n而不是围墙。",
    "把目光从别人那里收回，\n认真望向自己。",
    "把温柔给世界，\n也记得留一份给自己。",
    "把疲惫放下，\n把光接住。",
    "把每天当做节日，\n因为你值得。",
    "把每一寸成长，\n都当成自己的勋章。",
    "把自由还给自己，\n把快乐也还给自己。",
  
    "请允许自己盛放，\n不必等一个标准答案。",
    "请大胆做自己，\n这本身就很了不起。",
    "请相信温柔不是软弱，\n而是另一种力量。",
    "请先取悦自己，\n再拥抱世界。",
    "请在疲惫时休息，\n在清醒时前行。",
    "请把自己放在心上。",
    "请在今天，\n认真为自己庆祝。",
    "请记得，\n你不只是某种角色。",
    "请继续发光，\n哪怕只是微光。",
    "请始终站在自己这一边。",
  
    "希望你被爱，\n也有能力自爱。",
    "希望你不惧改变，\n也不怕重新开始。",
    "希望你总能在低谷里，\n为自己点一盏灯。",
    "希望你有热爱的事业，\n也有热腾腾的生活。",
    "希望你忙有所值，\n闲有所趣。",
    "希望你在人生的每一站，\n都不失去自己。",
    "希望你有被看见的幸运，\n也有不被看见时的从容。",
    "希望你在爱与自由之间，\n从不必二选一。",
    "希望你做任何决定时，\n都底气十足。",
    "希望你被生活温柔相待，\n也能把生活过得漂亮。",
  
    "敬认真生活的她，\n敬从不放弃的她。",
    "敬温柔坚定的她，\n敬闪闪发光的她。",
    "敬不被定义的她，\n敬始终前行的她。",
    "敬在人海中依旧忠于自己的她。",
    "敬把生活过成光的她。",
    "敬在沉默中积蓄力量的她。",
    "敬每一次跌倒后，\n仍愿意站起来的她。",
    "敬把平凡日子过成诗的她。",
    "敬那个也许疲惫，\n却依然在发光的她。",
    "敬一路走来，\n都没有放弃自己的她。",
  
    "三月因你温柔，\n也因你有力量。",
    "这个节日属于你，\n也属于每一个成为自己的她。",
    "今天请尽情做自己，\n因为这一天本就属于你。",
    "三八妇女节快乐，\n愿你永远拥有选择权。",
    "今天不只是节日，\n也是向自己致意的一天。",
    "今天请把鲜花送给自己。",
    "这个春天，\n愿你比花更自由。",
    "今天，\n愿所有女性都被认真庆祝。",
    "妇女节快乐，\n愿你所愿都不必向谁解释。",
    "愿这个属于女性的节日，\n也成为你拥抱自己的时刻。",
  
    "你走过的路，\n都算数。",
    "你熬过的夜，\n都会长出光。",
    "你经历的一切，\n终将成为力量。",
    "你不说的时候，\n也已经很了不起。",
    "你在生活里一点点长成的样子，\n很好看。",
    "你不需要时时强大，\n也依然值得尊重。",
    "你可以偶尔脆弱，\n但别忘了你也很勇敢。",
    "你所有认真生活的样子，\n都值得被看见。",
    "你已经很好了，\n剩下的交给时间。",
    "你不必赶路，\n也会走到自己的春天。",
  
    "让今天的花，\n替你说一句辛苦了。",
    "让今天的饭菜热气，\n替你驱散一点疲惫。",
    "让这一桌相聚，\n替世界认真拥抱你。",
    "让祝福落在你身上，\n像春天落在花上。",
    "让自己松一口气，\n也松一松心。",
    "让所有美好，\n都慢慢向你靠近。",
    "让温柔与锋芒，\n都留在你身上。",
    "让今天成为你记得很久的一天。",
    "让你在繁忙生活里，\n也能拥有片刻被偏爱。",
    "让每一次相聚，\n都成为值得收藏的时刻。",
  
    "因为你认真生活，\n所以值得被庆祝。",
    "因为你一直向前，\n所以配得上掌声。",
    "因为你温柔坚定，\n所以闪闪发光。",
    "因为你始终做自己，\n所以格外动人。",
    "因为你有力量，\n所以春天也为你让路。",
    "因为你没有放弃过自己，\n所以今天为你举杯。",
    "因为你一路走来并不容易，\n所以今天请好好奖励自己。",
    "因为你本身就很珍贵，\n所以值得最好的祝福。",
    "因为你一直都在发光，\n所以值得被认真看见。",
    "因为你是你，\n所以这一切祝福都送给你。",
  
    "春天会来，\n花会开，\n你也会越来越好。",
    "愿你像春天一样，\n温柔，\n明亮，\n有生命力。",
    "愿你像花一样盛放，\n也像树一样坚定。",
    "愿你像风一样自由，\n像山一样可靠。",
    "愿你在每一个春天里，\n都重新爱上自己。",
    "愿这个三月，\n替你翻开更明亮的一页。",
    "愿你与春风并肩，\n向更辽阔的地方去。",
    "愿你在岁月里盛放，\n在生活里生香。",
    "愿你比春天更柔软，\n也比春天更有力量。",
    "愿你的每一寸成长，\n都像春天一样值得庆祝。"
  ];

function dedupeMessages(items) {
  const out = [];
  const seen = new Set();
  for (const item of items) {
    const text = String(item);
    const key = text.trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(text);
  }
  return out;
}

function groupMessages(items) {
  const groups = {
    festivalTable: [],
    womenPower: [],
    selfGrowth: [],
    worldAndLife: [],
    springVibes: [],
    greetings: [],
    others: [],
  };

  const rules = [
    { key: "festivalTable", test: /(今天|这一桌|这一席|这顿饭|这桌|相聚|烟火|餐|举杯)/ },
    { key: "womenPower", test: /(妇女|女性|她不是|她是|不被定义|力量)/ },
    { key: "springVibes", test: /(春天|三月|花会开|春风|生花)/ },
    { key: "greetings", test: /(节日快乐|妇女节快乐|祝你|愿今天)/ },
    { key: "worldAndLife", test: /(世界|人间烟火|生活|岁月|风雨)/ },
    { key: "selfGrowth", test: /(你本来|请|希望你|因为你|让今天|把|做自己|自由|温柔|勇敢)/ },
  ];

  for (const text of items) {
    let matched = false;
    for (const rule of rules) {
      if (rule.test.test(text)) {
        groups[rule.key].push(text);
        matched = true;
        break;
      }
    }
    if (!matched) groups.others.push(text);
  }
  return groups;
}

const messagesByGroup = groupMessages(dedupeMessages(messagesRaw));
const messages = Object.values(messagesByGroup).flat();

const luckyPrizePool = [
  { tier: "C", title: "「春日加料」", detail: "→ 免费特色菜一份", weight: 40 },
  { tier: "D", title: "「饮品小升级」", detail: "→ 原味米汤一扎", weight: 50 },
  { tier: "B", title: "「不见不散」", detail: "→ 20元下次见面礼", weight: 7 },
  { tier: "A", title: "「这一桌今天很幸运」", detail: "→ 本桌9折", weight: 3 },
];

const textYOffsetUnitsByBg = {
  "images/bg1.jpg": -12, // 上移 12 个单位（1单位=画布高度1%）
  "images/bg6.jpg": -10, // 上移 10 个单位（1单位=画布高度1%）
};
const GLOBAL_TEXT_Y_OFFSET_UNITS = -10; // 全部文案统一上移 10%

let currentCardContent = null;

function getTextYOffsetUnits(bg) {
  return GLOBAL_TEXT_Y_OFFSET_UNITS + (textYOffsetUnitsByBg[bg] || 0);
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

const FIXED_FOOTER_LINES = ["——", "", "3.8 妇女节", "在怀话里"];

function pickDeterministicLuckyResult() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  // seed 只是前台文案随机用，不参与幸运结果固定键
  params.delete("seed");
  const sortedParams = [...params.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const stableKey = `${url.origin}${url.pathname}?${sortedParams}`;

  const rand = seededRandom(`lucky:${stableKey}`);
  const totalWeight = luckyPrizePool.reduce((sum, item) => sum + item.weight, 0);
  let n = rand() * totalWeight;
  let picked = luckyPrizePool[luckyPrizePool.length - 1];
  for (const item of luckyPrizePool) {
    n -= item.weight;
    if (n < 0) {
      picked = item;
      break;
    }
  }
  return `${picked.title}\n${picked.detail}`;
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

function getCurrentCardContent() {
  if (currentCardContent) return currentCardContent;
  const seed = ensureSeedInUrl();
  const r = seededRandom(seed);
  const bg = backgrounds[Math.floor(r() * backgrounds.length)];
  const base = messages[Math.floor(Math.random() * messages.length)];
  const mainText = String(base).replace(/\s+$/g, "");
  const footerLines = [...FIXED_FOOTER_LINES];
  const msg = `${mainText}\n\n${footerLines.join("\n")}`;
  currentCardContent = { seed, bg, msg, mainText, footerLines };
  return currentCardContent;
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
  const { bg, mainText, footerLines } = getCurrentCardContent();

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

  // 网页显示：主文案 + 固定副文案
  const msgEl = document.getElementById("msg");
  const footerHtml = footerLines
    .map((line) => (line ? escapeHtml(line) : "&nbsp;"))
    .join("<br>");
  msgEl.innerHTML = `
    <div class="msg-main">${String(mainText).split("\n").map(escapeHtml).join("<br>")}</div>
    <div class="msg-sub">${footerHtml}</div>
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
      const result = pickDeterministicLuckyResult();
      if (repeatLuckyNote) {
        repeatLuckyNote.textContent = "同一链接的幸运结果固定，重复扫码仍是这一份惊喜。";
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
  const msgMainEl = msgEl ? msgEl.querySelector(".msg-main") : null;
  const msgSubEl = msgEl ? msgEl.querySelector(".msg-sub") : null;
  const overlay = card ? card.querySelector(".front .overlay") : null;

  const cardWidth = card?.clientWidth || 0;
  const overlayStyle = overlay ? getComputedStyle(overlay) : null;
  const msgMainStyle = msgMainEl ? getComputedStyle(msgMainEl) : null;
  const msgSubStyle = msgSubEl ? getComputedStyle(msgSubEl) : null;

  const px = (v, fallback = 0) => {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const paddingX = overlayStyle
    ? px(overlayStyle.paddingLeft, 18) + px(overlayStyle.paddingRight, 18)
    : 36;
  const msgWidth = msgEl?.getBoundingClientRect().width || 0;
  const mainFontSize = msgMainStyle ? px(msgMainStyle.fontSize, 22) : 22;
  const mainLineHeightPx = msgMainStyle
    ? px(msgMainStyle.lineHeight, mainFontSize * 1.35)
    : mainFontSize * 1.35;
  const subFontSize = msgSubStyle ? px(msgSubStyle.fontSize, 17) : 17;
  const subLineHeightPx = msgSubStyle
    ? px(msgSubStyle.lineHeight, subFontSize * 1.5)
    : subFontSize * 1.5;
  const subMarginTopPx = msgSubStyle ? px(msgSubStyle.marginTop, 10) : 10;

  return {
    cardWidth: Math.max(1, cardWidth),
    mainFontSize,
    mainLineHeightPx,
    subFontSize,
    subLineHeightPx,
    subMarginTopPx,
    textWidth: Math.max(1, msgWidth || (cardWidth - paddingX)),
  };
}

async function buildCardCanvas() {
  const { seed, bg, msg, mainText, footerLines } = getCurrentCardContent();

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

  // 文案绘制
  ctx.textBaseline = "alphabetic";
  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const preview = getPreviewTextMetrics();
  const scaleToCanvas = W / preview.cardWidth;
  const mainFontSize = Math.max(1, Math.round(preview.mainFontSize * scaleToCanvas));
  const mainLineHeight = Math.max(1, Math.round(preview.mainLineHeightPx * scaleToCanvas));
  const subFontSize = Math.max(1, Math.round(preview.subFontSize * scaleToCanvas));
  const subLineHeight = Math.max(1, Math.round(preview.subLineHeightPx * scaleToCanvas));
  const subMarginTop = Math.max(0, Math.round(preview.subMarginTopPx * scaleToCanvas));
  const textMaxWidth = Math.max(1, Math.round(preview.textWidth * scaleToCanvas));
  ctx.font = `${mainFontSize}px "Source Han Serif SC", "Noto Serif SC", "Songti SC", "STSong", serif`;

  const mainLines = wrapLinesByWidth(ctx, mainText, textMaxWidth);
  const subLines = Array.isArray(footerLines) && footerLines.length
    ? footerLines
    : FIXED_FOOTER_LINES;
  const totalTextHeight =
    mainLines.length * mainLineHeight +
    subMarginTop +
    subLines.length * subLineHeight;

  let yCenter = H * 0.5;
  let y = Math.round(yCenter - totalTextHeight / 2 + mainFontSize * 0.9);
  const unitPx = Math.round(H * 0.01);
  const yOffset = getTextYOffsetUnits(bg) * unitPx;
  y += yOffset;
  if (y < P + mainFontSize) y = P + mainFontSize;

  ctx.fillStyle = "#3A3A3A";
  for (let i = 0; i < mainLines.length; i++) {
    const line = mainLines[i];
    ctx.textAlign = "center";
    ctx.fillText(line, Math.round(W / 2), y);
    y += mainLineHeight;
  }

  y += subMarginTop;
  ctx.fillStyle = "#8A6F7B";
  ctx.font = `${subFontSize}px "Source Han Serif SC", "Noto Serif SC", "Songti SC", "STSong", serif`;
  for (let i = 0; i < subLines.length; i++) {
    const line = String(subLines[i] ?? "");
    if (line) {
      ctx.textAlign = "center";
      ctx.fillText(line, Math.round(W / 2), y);
    }
    y += subLineHeight;
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
  // 先生成 PNG，再仅调用系统分享（不做任何预览）
  const { canvas } = await buildCardCanvas();
  if (!canvas || !canvas.toBlob) return;

  if (navigator.share && navigator.canShare) {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const file = new File([blob], "postcard.png", { type: "image/png" });
    if (!navigator.canShare({ files: [file] })) return;
    try {
      await navigator.share({ files: [file], title: document.title });
    } catch {
      // 用户取消或目标应用拒绝：静默结束
    }
  }
  // 不支持系统分享图片文件的环境：静默结束；用户仍可用“保存”按钮自己长按分享
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