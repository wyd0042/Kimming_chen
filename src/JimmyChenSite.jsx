import React, { useState, useEffect } from "react";

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  陈金铭 · Jimmy Chen — 个人主页                                  ║
   ║                                                                  ║
   ║  ✏️ 如何更新内容：                                                ║
   ║  只需要修改下面 DATA 区域里的文字，保存即可。                        ║
   ║  每个区块都有中文注释说明。                                        ║
   ║  不需要动下面的组件代码和样式代码。                                 ║
   ╚══════════════════════════════════════════════════════════════════╝ */


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  📌 DATA 区域开始 —— 你只需要改这里
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


// ── 个人信息 ──────────────────────────────────────────────────────
const PROFILE = {
  nameZh: "陈金铭",                          // 中文名
  nameEn: "Jimmy Chen",                      // 英文名
  eyebrow: "PRIMARY MARKET × APPLIED MATHEMATICS",  // 导航栏下的小标语
  positioning: "用数学家的严谨，做一级市场的判断",      // 一句话定位
  bio: "牛津大学数学建模与科学计算硕士。专注硬科技一级市场投研：AI 芯片、新型存储、AI应用。相信最好的投资判断来自对技术第一性原理的拆解，从架构、供应链到商业化路径，逐层验证，而非追逐叙事。",
  email: "jimmychen709@outlook.com",
  phone: "+86 15916593133",
  location: "广州 · 上海 · 牛津",
};


// ── 实习 / 工作经历 ──────────────────────────────────────────────
// 按时间倒序排列，最新的在最前面
// current: true 的那条会高亮显示（边线变深色 + 圆点发光）
const EXPERIENCES = [
  {
    period: "2026.05 — 至今",           // 时间段
    org: "普洛斯隐山资本",               // 公司名
    orgEn: "GLP Hidden Hill Capital",   // 英文名（可选，留空 "" 则不显示）
    role: "投资分析实习生",              // 职位
    loc: "上海",                        // 城市
    current: true,                      // 是否当前经历（只留一条 true）
    bullets: [                          // 工作内容，每条一个字符串
      "推动团队完成某新型存储介质芯片公司天使++轮投资（300 万美元）：系统拆解 GPU+HBM、SRAM 近存、MRAM 存算三条技术路线的架构原理与商业化差异，基于先进制程密度拐点识别投资机会，为投资决策提供底层判断。",
      "对某 RISC-V 芯片公司、某 ARM 架构 AI 服务器 CPU 公司等重点标的，沿技术路线从架构、供应链到商业化路径逐层拆解，搭建可比公司分析框架，输出投资建议。",
      "基于赛道研究主动挖掘初创标的，覆盖 AI 芯片、AI4S、核聚变等方向；通过牛津校友网络挖掘某核聚变初创项目，独立完成技术路线与商业化可行性评估，输出项目备忘录。",
    ],
    tags: ["新型存储", "AI 芯片", "核聚变", "天使++轮"],  // 标签
  },
  {
    period: "2026.01 — 2026.05",
    org: "光源资本",
    orgEn: "Lighthouse Capital",
    role: "分析师实习生",
    loc: "上海",
    current: false,
    bullets: [
      "系统跟踪国内外 AI 推理芯片赛道，按技术路线（GPGPU / DSA / 可重构数据流 / 存算解耦）梳理 20+ 家厂商图谱，横向对比架构、存储方案、封装工艺与商业化进展。",
      "针对某存算解耦架构推理芯片公司独立完成约 30 页研究报告：围绕 Prefill / Decoding 负载差异与显存墙瓶颈，构建「有效吞吐量–TCO」分析框架，形成技术竞争力与商业可行性的独立判断。",
      "设计结构化尽调问题清单，主导 6 场管理层及产业链专家访谈的信息整理与风险提炼，交叉验证技术路线可行性，推动项目从初步接触进入深度评估阶段。",
    ],
    tags: ["AI 推理芯片", "存算解耦", "尽职调查"],
  },
  {
    period: "2025.09 — 2025.12",
    org: "易石资本",
    orgEn: "Yishi Capital",
    role: "投资分析实习生",
    loc: "珠海",
    current: false,
    bullets: [
      "聚焦大模型赛道，系统对比并持续监测国内头部基座模型厂商（MiniMax / 智谱 / 阶跃星辰 / 月之暗面）在技术路径、产品化进度、商业化模式与融资估值上的差异，输出竞争格局报告。",
      "独立 sourcing 上海垣信卫星（「千帆星座」低轨卫星互联网核心运营方，规划 1.5 万颗星组网，对标 SpaceX 星链），完成行业研究与项目判断后推动团队跟进，参与完成 A+ 轮投资 2000 万人民币。",
    ],
    tags: ["大模型", "商业航天", "A+ 轮"],
  },
  {
    period: "2023.06 — 2023.09",
    org: "联通数字科技",
    orgEn: "China Unicom Digital Tech",
    role: "模型开发工程师实习生",
    loc: "北京",
    current: false,
    bullets: [
      "基于 Python 对高频非平稳数据进行多尺度特征工程，结合 Prophet 与滚动窗口机制搭建混合预测模型，通过参数约束提升极端值下的稳健性。",
      "搭建基于 Rolling-Window 的滚动回测框架，结合 Walk-forward 验证实现模型性能自动化评估与迭代优化，整体准确率提升 15%。",
    ],
    tags: ["时间序列", "Python", "机器学习"],
  },
  // ✏️ 添加新经历：复制上面任意一段，粘贴到这里，修改内容即可
];


// ── 参与投资的项目 ───────────────────────────────────────────────
// 每个项目可以点击展开查看详情
// status 支持三种样式："已投资"（绿色）/ "深度评估"（蓝色）/ "已输出备忘录"（黄色）
const DEALS = [
  {
    id: 1,                                          // 唯一编号，不要重复
    name: "某新型存储介质芯片公司",                    // 项目名（脱敏）
    round: "天使++轮 · 300 万美元",                   // 轮次与金额
    status: "已投资",                                 // 状态标签
    fund: "普洛斯隐山资本",                            // 所在基金
    myRole: "技术路线拆解 · 投资判断",                  // 你的角色
    thesis: "先进制程逼近密度拐点，传统 SRAM/DRAM 路线的功耗与面积代价陡增，新型存储介质在 AI 推理场景存在结构性替代窗口。",  // 投资论点
    details: [                                        // 具体工作，每条一个字符串
      "系统拆解 GPU+HBM、SRAM 近存、MRAM 存算三条技术路线的架构原理与商业化差异",
      "基于制程密度演进曲线识别新型介质的切入时点，论证其在推理侧的能效比优势",
      "为投委会决策提供技术侧底层判断，推动完成投资",
    ],
  },
  {
    id: 2,
    name: "上海垣信卫星",
    round: "A+ 轮 · 2000 万人民币",
    status: "已投资",
    fund: "易石资本",
    myRole: "独立 Sourcing · 行业研究 · 推动立项",
    thesis: "「千帆星座」是国内低轨卫星互联网最具确定性的组网主体：1.5 万颗星规划、对标 Starlink，轨道与频谱资源具有先发排他性。",
    details: [
      "从公开信号中独立发现并 sourcing 该标的，完成低轨卫星互联网行业研究",
      "拆解星座组网的单位经济学：发射成本曲线、地面站建设与用户终端渗透路径",
      "输出项目判断推动团队跟进，参与完成 A+ 轮投资",
    ],
  },
  {
    id: 3,
    name: "某存算解耦架构推理芯片公司",
    round: "深度评估阶段",
    status: "深度评估",
    fund: "光源资本",
    myRole: "30 页独立研究报告 · 主导 6 场访谈",
    thesis: "推理负载中 Prefill / Decoding 的算力—带宽需求错配，是显存墙之外被低估的结构性瓶颈，存算解耦架构存在差异化机会。",
    details: [
      "构建「有效吞吐量–TCO」量化框架，横向对比各架构在真实负载下的差异",
      "围绕流片进度、客户 POC、片间互联与软件栈兼容性设计结构化尽调清单",
      "主导 6 场管理层与产业链专家访谈，交叉验证技术路线可行性",
    ],
  },
  {
    id: 4,
    name: "某核聚变初创项目",
    round: "早期接触",
    status: "已输出备忘录",
    fund: "普洛斯隐山资本",
    myRole: "校友网络挖掘 · 独立技术评估",
    thesis: "聚变路线的资本开支与工程节点高度非线性，早期判断的核心是「物理可行性」与「工程降本曲线」的解耦分析。",
    details: [
      "通过牛津校友网络主动挖掘，第一时间建立项目接触",
      "独立完成技术路线与商业化可行性评估，输出项目备忘录",
      "促成团队与项目方实地交流",
    ],
  },
  // ✏️ 添加新项目：复制上面任意一段，改 id（不重复）和内容
];


// ── 一级市场思考（文章列表）────────────────────────────────────────
// highlight: true 的文章会特别高亮显示
const THOUGHTS = [
  {
    id: 1,
    title: "存算解耦：推理芯片突破显存墙的第三条路",
    date: "2026.04",
    category: "AI 芯片",
    readTime: "14 min",
    summary: "当行业把注意力放在 HBM 供给和先进封装上时，Prefill 与 Decoding 负载的结构性错配正在打开另一个架构窗口。本文用有效吞吐量–TCO 框架量化对比四条技术路线，并讨论国产厂商的差异化切入点。",
    highlight: false,
  },
  {
    id: 2,
    title: "新型存储介质的投资时钟：从制程密度拐点说起",
    date: "2026.06",
    category: "半导体",
    readTime: "12 min",
    summary: "SRAM 微缩失速不是新闻，但它对存储层级结构的连锁影响仍被低估。从密度—功耗—成本三条曲线的交点出发，推演 MRAM 等新型介质从利基走向主流的时序，以及一级市场的下注窗口。",
    highlight: true,
  },
  {
    id: 3,
    title: "低轨卫星互联网的单位经济学：星座组网如何算账",
    date: "2025.11",
    category: "商业航天",
    readTime: "11 min",
    summary: "对标 Starlink 容易，跑通单位经济学很难。从发射成本曲线、卫星寿命折旧到地面终端渗透率，拆解「千帆星座」类项目的盈亏平衡条件，以及中国供应链在其中的成本优势与短板。",
    highlight: false,
  },
  {
    id: 4,
    title: "AI4S：科学计算与大模型的交汇处藏着什么机会",
    date: "2025.08",
    category: "AI × Science",
    readTime: "10 min",
    summary: "从数值线性代数的视角看 AI for Science：哪些环节是「AI 真正改变了求解范式」，哪些只是「把神经网络当插值器」。区分这两者，是判断 AI4S 公司技术壁垒的第一步。",
    highlight: false,
  },
  // ✏️ 添加新文章：复制上面任意一段，改 id 和内容
];


// ── 成长感悟 ─────────────────────────────────────────────────────
const REFLECTIONS = [
  {
    id: 1,
    title: "从数学证明到投资判断",
    date: "2026.05",
    content: "数学训练给我的最大礼物，不是计算能力，而是对「确定性边界」的敏感。证明里每一步都必须严格成立；投资判断恰恰相反——你永远在信息不完整时下注。但两者共享同一个内核：清楚地知道哪些是你验证过的，哪些是你假设的。我见过太多投资逻辑把假设当成了结论，而尽调的本质，就是把假设一条条搬回验证区。",
  },
  {
    id: 2,
    title: "四段实习之后，我如何理解「研究驱动」",
    date: "2026.03",
    content: "「研究驱动」不是写更长的报告，而是让研究先于项目存在。在光源做 AI 芯片图谱时我意识到：当你对一条技术路线的理解足够深，好项目出现时你只需要五分钟就能判断它是否值得跟进——因为你早已知道这个位置上「应该长出什么样的公司」。垣信是我第一次体会到这一点：先看懂了星座组网的账，标的自己浮出了水面。",
  },
  {
    id: 3,
    title: "用 AI Agent 重构自己的投研工作流",
    date: "2025.12",
    content: "我搭了一个 Agent 自动扫描同业 FA 的在手项目动态，生成结构化摘要。它替代的不是思考，而是「信息搬运」这个最消耗精力却最没有认知增量的环节。这件事让我确信：未来投研的分水岭不在于谁的信息更多，而在于谁能把省下来的时间真正花在「构建判断框架」上。工具会趋同，判断不会。",
  },
  {
    id: 4,
    title: "在牛津学到的不是数学，是如何逼近一个问题",
    date: "2025.06",
    content: "我的论文做的是大规模稀疏矩阵的加速求解——听起来和投资毫无关系。但 SS-GMRES 的核心思想是：识别出少数「必须极高精度」的关键方程，把资源集中在那里，其余部分容忍误差。后来我发现这就是尽调的最优策略：一个项目有一百个可以问的问题，但真正决定生死的假设往往只有两三个。找到它们，把火力集中在那里。",
  },
  // ✏️ 添加新感悟：复制上面任意一段，改 id 和内容
];


// ── 教育背景 ─────────────────────────────────────────────────────
const EDUCATION = [
  {
    school: "牛津大学",
    schoolEn: "University of Oxford",
    degree: "数学建模与科学计算 硕士",
    period: "2024.09 — 2027.01",
    loc: "英国 牛津",
    grade: "Distinction（前 10%）",
    notes: [
      "核心课程：机器学习、最优化、偏微分方程数值解、数学建模、有限元方法、数值线性代数",
      "牛剑创投俱乐部成员，参与牛津与剑桥早期创业项目交流，积累两校创业生态与校友网络",
      "硕士论文：SS-GMRES —— 面向异质残差目标的结构化草图化 GMRES，实现 10–40 倍计算加速（Distinction，导师 Prof. Yuji Nakatsukasa）",
    ],
  },
  {
    school: "北师香港浸会大学",
    schoolEn: "BNU-HKBU United International College",
    degree: "金融数学 本科",
    period: "2020.09 — 2024.06",
    loc: "中国 珠海",
    grade: "3.80 / 4.0（专业第一）",
    notes: [
      "核心课程：随机过程、时间序列、C++、期权定价、金融风险管理、金融建模、回归分析",
      "国家奖学金 · 最佳毕业论文 · 最佳毕业生 · 校级一等奖学金（连续四年）",
      "iCAN 大学生创新创业大赛华南地区二等奖",
    ],
  },
  // ✏️ 添加更多教育经历：复制上面一段，改内容
];


// ── 技能标签 ─────────────────────────────────────────────────────
const SKILLS = [
  "Python", "MATLAB", "LaTeX", "Bloomberg", "Wind",
  "Claude / GPT / Gemini 投研工作流",
  // ✏️ 直接在这里加减技能标签
];


// ── 导航栏标签 ───────────────────────────────────────────────────
// id 对应页面区块，label 是显示文字
const NAV = [
  { id: "hero", label: "关于" },
  { id: "experience", label: "经历" },
  { id: "deals", label: "参与项目" },
  { id: "thoughts", label: "市场思考" },
  { id: "reflections", label: "感悟" },
  { id: "education", label: "教育" },
  { id: "contact", label: "联系" },
];


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  📌 DATA 区域结束 —— 以下是组件与样式，通常不需要修改
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


/* ── 近三对角带状稀疏矩阵（SS-GMRES 视觉签名）──────────────────── */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function SparseMatrix() {
  const rand = mulberry32(42);
  const N = 28;
  const CELL = 14;
  const R = 2.8;
  const BW = 2;
  const criticalRows = new Set([3, 8, 14, 19, 24]);

  const dots = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const dist = Math.abs(r - c);
      if (dist > BW + 1 && !(criticalRows.has(r) && dist <= 8)) continue;

      const isCrit = criticalRows.has(r);

      if (dist <= 1) {
        dots.push({
          x: c * CELL + CELL / 2, y: r * CELL + CELL / 2,
          o: isCrit ? 0.95 : (dist === 0 ? 0.7 : 0.4),
          color: isCrit ? "#B5342C" : "#002147",
          r: isCrit ? R + 0.6 : R,
          key: r + "-" + c,
          pulse: isCrit && dist === 0,
          delay: (rand() * 5).toFixed(2),
        });
      } else if (dist <= BW && rand() < 0.55) {
        dots.push({
          x: c * CELL + CELL / 2, y: r * CELL + CELL / 2,
          o: isCrit ? 0.7 : 0.2 + rand() * 0.15,
          color: isCrit ? "#B5342C" : "#002147",
          r: isCrit ? R : R - 0.5,
          key: r + "-" + c, pulse: false,
        });
      } else if (isCrit && dist > BW && dist <= 8 && rand() < 0.12) {
        dots.push({
          x: c * CELL + CELL / 2, y: r * CELL + CELL / 2,
          o: 0.45, color: "#B5342C", r: R - 0.7,
          key: r + "-" + c, pulse: false,
        });
      }
    }
  }

  const size = N * CELL;
  return (
    <div className="matrix-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} className="matrix" aria-hidden="true">
        {Array.from({ length: N + 1 }, (_, i) => (
          <line key={"h" + i} x1={0} y1={i * CELL} x2={size} y2={i * CELL} stroke="#002147" strokeWidth="0.2" opacity="0.07" />
        ))}
        {Array.from({ length: N + 1 }, (_, i) => (
          <line key={"v" + i} x1={i * CELL} y1={0} x2={i * CELL} y2={size} stroke="#002147" strokeWidth="0.2" opacity="0.07" />
        ))}
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={d.o}
            className={d.pulse ? "pulse" : ""}
            style={d.pulse ? { animationDelay: d.delay + "s" } : undefined} />
        ))}
        {[...criticalRows].map((r) => (
          <polygon key={"t" + r}
            points={`-2,${r * CELL + CELL / 2 - 3} 4,${r * CELL + CELL / 2} -2,${r * CELL + CELL / 2 + 3}`}
            fill="#B5342C" opacity="0.6" />
        ))}
      </svg>
      <div className="matrix-legend">
        <span className="legend-item"><span className="legend-dot legend-dot-blue" />常规方程</span>
        <span className="legend-item"><span className="legend-dot legend-dot-red" />关键行（需极高精度）</span>
      </div>
      <p className="matrix-caption">
        近三对角大规模稀疏矩阵 · SS-GMRES 硕士论文
        <br /><em>「识别关键方程，集中精力在那里——这也是尽调的最优策略」</em>
      </p>
    </div>
  );
}

function SectionHead({ no, zh, en, id }) {
  return (
    <div className="sec-head rv" id={id}>
      <span className="sec-no">{no}</span>
      <h2 className="sec-zh">{zh}</h2>
      <span className="sec-en">{en}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = { "已投资": "badge-invested", "深度评估": "badge-eval", "已输出备忘录": "badge-memo" };
  return <span className={"badge " + (cls[status] || "")}>{status}</span>;
}

export default function JimmyChenSite() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDeal, setOpenDeal] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.getBoundingClientRect().top <= 140) { setActive(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="site">
      {/* Nav */}
      <nav className={"nav " + (scrolled ? "nav-scrolled" : "")}>
        <div className="nav-inner">
          <button className="logo" onClick={() => go("hero")}>
            {PROFILE.nameZh}<span className="logo-en">J.CHEN</span>
          </button>
          <div className="nav-links">
            {NAV.map((n) => (
              <button key={n.id} className={"nav-link " + (active === n.id ? "on" : "")} onClick={() => go(n.id)}>{n.label}</button>
            ))}
          </div>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
        </div>
        {menuOpen && <div className="mobile-menu">{NAV.map((n) => (
          <button key={n.id} className={"m-link " + (active === n.id ? "on" : "")} onClick={() => go(n.id)}>{n.label}</button>
        ))}</div>}
      </nav>

      <main className="wrap">
        {/* Hero */}
        <header className="hero" id="hero">
          <div className="hero-text">
            <p className="eyebrow rv">{PROFILE.eyebrow}</p>
            <h1 className="name-zh rv">{PROFILE.nameZh}</h1>
            <p className="name-en rv">{PROFILE.nameEn}</p>
            <p className="positioning rv">「{PROFILE.positioning}」</p>
            <p className="bio rv">{PROFILE.bio}</p>
            <div className="contact-chips rv">
              <a className="chip" href={"mailto:" + PROFILE.email}>✉ {PROFILE.email}</a>
              <span className="chip">☎ {PROFILE.phone}</span>
              <span className="chip">◎ {PROFILE.location}</span>
            </div>
          </div>
          <div className="hero-visual rv"><SparseMatrix /></div>
        </header>

        {/* Experience */}
        <section className="section">
          <SectionHead no="01" zh="投研经历" en="EXPERIENCE" id="experience" />
          <div className="timeline">
            {EXPERIENCES.map((e, i) => (
              <article className="tl-item rv" key={i}>
                <div className="tl-left">
                  <span className="tl-period">{e.period}</span>
                  <span className="tl-loc">{e.loc}</span>
                </div>
                <div className={"tl-body " + (e.current ? "tl-current" : "")}>
                  <div className="tl-dot" />
                  <h3 className="tl-org">{e.org}{e.orgEn && <span className="tl-org-en">{e.orgEn}</span>}</h3>
                  <p className="tl-role">{e.role}</p>
                  <ul className="tl-bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                  <div className="tags">{e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Deals */}
        <section className="section">
          <SectionHead no="02" zh="参与投资的项目" en="DEAL EXPERIENCE" id="deals" />
          <p className="sec-sub rv">参与研判与推动的真实项目（已脱敏）。点击展开查看投资论点与具体工作。</p>
          <div className="deals">
            {DEALS.map((d) => (
              <article className={"deal rv " + (openDeal === d.id ? "deal-open" : "")} key={d.id}>
                <button className="deal-head" onClick={() => setOpenDeal(openDeal === d.id ? null : d.id)}>
                  <div className="deal-title-block">
                    <div className="deal-title-row">
                      <h3 className="deal-name">{d.name}</h3>
                      <StatusBadge status={d.status} />
                    </div>
                    <p className="deal-meta">{d.round} · {d.fund}</p>
                  </div>
                  <span className="deal-arrow">›</span>
                </button>
                {openDeal === d.id && (
                  <div className="deal-body">
                    <p className="deal-role"><span className="deal-label">我的角色</span>{d.myRole}</p>
                    <p className="deal-thesis"><span className="deal-label">投资论点</span>{d.thesis}</p>
                    <ul className="deal-details">{d.details.map((x, i) => <li key={i}>{x}</li>)}</ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Thoughts */}
        <section className="section">
          <SectionHead no="03" zh="一级市场思考" en="RESEARCH NOTES" id="thoughts" />
          <p className="sec-sub rv">对产业趋势与投资逻辑的持续研究，观点独立，持续更新。</p>
          <div className="thoughts">
            {THOUGHTS.map((t) => (
              <article className={"thought rv " + (t.highlight ? "thought-hl" : "")} key={t.id}>
                <div className="thought-meta">
                  <span className="thought-cat">{t.category}</span>
                  <span className="thought-date">{t.date} · {t.readTime}</span>
                </div>
                <h3 className="thought-title">{t.title}</h3>
                <p className="thought-summary">{t.summary}</p>
                <span className="thought-more">阅读全文 →</span>
              </article>
            ))}
          </div>
        </section>

        {/* Reflections */}
        <section className="section">
          <SectionHead no="04" zh="成长感悟" en="REFLECTIONS" id="reflections" />
          <div className="reflections">
            {REFLECTIONS.map((r) => (
              <article className="reflection rv" key={r.id}>
                <div className="ref-head">
                  <h3 className="ref-title">{r.title}</h3>
                  <span className="ref-date">{r.date}</span>
                </div>
                <p className="ref-content">{r.content}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="section">
          <SectionHead no="05" zh="教育背景" en="EDUCATION" id="education" />
          <div className="edu-grid">
            {EDUCATION.map((e, i) => (
              <article className="edu rv" key={i}>
                <div className="edu-top">
                  <div>
                    <h3 className="edu-school">{e.school}</h3>
                    <p className="edu-school-en">{e.schoolEn}</p>
                  </div>
                  <span className="edu-grade">{e.grade}</span>
                </div>
                <p className="edu-degree">{e.degree} · {e.period} · {e.loc}</p>
                <ul className="edu-notes">{e.notes.map((n, j) => <li key={j}>{n}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="skills rv">
            <span className="skills-label">技能</span>
            {SKILLS.map((s) => <span className="tag" key={s}>{s}</span>)}
          </div>
        </section>

        {/* Contact */}
        <section className="section contact-section" id="contact">
          <div className="contact-card rv">
            <p className="contact-lead">
              如果你在寻找一个能把技术拆到第一性原理、<br className="br-desktop" />也能独立 sourcing 并推动项目落地的投研候选人——
            </p>
            <a className="contact-cta" href={"mailto:" + PROFILE.email}>发邮件给我 →</a>
            <div className="contact-rows">
              <span>✉ {PROFILE.email}</span>
              <span>☎ {PROFILE.phone}</span>
              <span>◎ {PROFILE.location}</span>
            </div>
          </div>
        </section>

        <footer className="footer rv">
          <span>{PROFILE.nameZh} · {PROFILE.nameEn}</span>
          <span className="footer-dim">Built with rigor · Last updated 2026.07</span>
        </footer>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;600;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root{--paper:#FAFAF7;--ink:#14202E;--oxford:#002147;--sub:#56606E;--faint:#96A0AC;--line:#E3E3DC;--wash:#F1F1EB;--blue-wash:#EDF1F6;--crit:#B5342C;--serif:'Noto Serif SC','Songti SC','SimSun',serif;--sans:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Segoe UI',sans-serif;--mono:'IBM Plex Mono','SF Mono',Menlo,Consolas,monospace}
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:#D8E2EE}
        .site{font-family:var(--sans);background:var(--paper);color:var(--ink);line-height:1.75;min-height:100vh;font-size:15px}
        .wrap{max-width:880px;margin:0 auto;padding:0 28px}button{font-family:inherit;cursor:pointer}a{color:inherit;text-decoration:none}

        .rv{opacity:0;transform:translateY(16px);transition:opacity .7s ease,transform .7s ease}.rv.in{opacity:1;transform:none}
        @media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.pulse{animation:none!important}html{scroll-behavior:auto}}

        .nav{position:fixed;top:0;left:0;right:0;z-index:100;border-bottom:1px solid transparent;transition:all .3s ease}
        .nav-scrolled{background:rgba(250,250,247,.9);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom-color:var(--line)}
        .nav-inner{max-width:880px;margin:0 auto;padding:14px 28px;display:flex;align-items:center;justify-content:space-between}
        .logo{font-family:var(--serif);font-weight:700;font-size:17px;background:none;border:none;color:var(--oxford);display:flex;align-items:baseline;gap:8px}
        .logo-en{font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--faint);font-weight:400}
        .nav-links{display:flex;gap:4px}
        .nav-link{background:none;border:none;font-size:13px;color:var(--faint);padding:4px 10px;border-radius:3px;transition:color .2s,background .2s}
        .nav-link:hover{color:var(--ink)}.nav-link.on{color:var(--oxford);font-weight:600;background:var(--blue-wash)}
        .burger{display:none;background:none;border:none;font-size:20px;color:var(--ink);padding:2px 6px}
        .mobile-menu{background:rgba(250,250,247,.98);border-top:1px solid var(--line);padding:8px 28px 16px}
        .m-link{display:block;width:100%;text-align:left;background:none;border:none;padding:11px 0;font-size:14px;color:var(--sub);border-bottom:1px solid var(--wash)}
        .m-link.on{color:var(--oxford);font-weight:600}

        .hero{padding:120px 0 64px;display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
        .eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.22em;color:var(--faint);margin-bottom:18px}
        .name-zh{font-family:var(--serif);font-weight:900;font-size:56px;letter-spacing:.04em;line-height:1.1;color:var(--oxford)}
        .name-en{font-family:var(--mono);font-size:13px;color:var(--faint);letter-spacing:.14em;margin:6px 0 22px}
        .positioning{font-family:var(--serif);font-size:20px;font-weight:600;color:var(--ink);margin-bottom:18px;letter-spacing:.02em}
        .bio{font-size:15px;color:var(--sub);max-width:480px;margin-bottom:26px}
        .contact-chips{display:flex;flex-wrap:wrap;gap:10px}
        .chip{font-family:var(--mono);font-size:12px;color:var(--sub);border:1px solid var(--line);border-radius:3px;padding:5px 11px;background:#fff;transition:border-color .2s,color .2s}
        a.chip:hover{border-color:var(--oxford);color:var(--oxford)}

        .matrix-wrap{text-align:center}.matrix{width:100%;max-width:392px}
        .pulse{animation:pulse 3.8s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
        .matrix-legend{display:flex;justify-content:center;gap:20px;margin-top:14px}
        .legend-item{font-family:var(--mono);font-size:10.5px;color:var(--faint);display:flex;align-items:center;gap:5px}
        .legend-dot{width:7px;height:7px;border-radius:50%;display:inline-block}
        .legend-dot-blue{background:#002147}.legend-dot-red{background:#B5342C}
        .matrix-caption{font-family:var(--mono);font-size:10.5px;color:var(--faint);margin-top:10px;line-height:1.8;letter-spacing:.04em}
        .matrix-caption em{font-style:normal;color:var(--sub)}

        .section{margin-bottom:108px}
        .sec-head{display:flex;align-items:baseline;gap:14px;border-bottom:1px solid var(--ink);padding-bottom:14px;margin-bottom:36px;scroll-margin-top:90px}
        .sec-no{font-family:var(--mono);font-size:12px;color:var(--crit)}.sec-zh{font-family:var(--serif);font-size:25px;font-weight:700;color:var(--oxford);letter-spacing:.03em}
        .sec-en{font-family:var(--mono);font-size:10.5px;letter-spacing:.2em;color:var(--faint);margin-left:auto}
        .sec-sub{font-size:13.5px;color:var(--faint);margin:-20px 0 30px}

        .tl-item{display:grid;grid-template-columns:150px 1fr;gap:28px;margin-bottom:44px}
        .tl-left{text-align:right;padding-top:3px}.tl-period{display:block;font-family:var(--mono);font-size:12px;color:var(--sub)}
        .tl-loc{display:block;font-family:var(--mono);font-size:11px;color:var(--faint);margin-top:3px}
        .tl-body{position:relative;border-left:1.5px solid var(--line);padding-left:26px;padding-bottom:4px}
        .tl-current{border-left-color:var(--oxford)}
        .tl-dot{position:absolute;left:-5px;top:9px;width:8px;height:8px;border-radius:50%;background:var(--line)}
        .tl-current .tl-dot{background:var(--oxford);box-shadow:0 0 0 4px var(--blue-wash)}
        .tl-org{font-family:var(--serif);font-size:18px;font-weight:700;color:var(--ink)}
        .tl-org-en{font-family:var(--mono);font-size:10.5px;color:var(--faint);font-weight:400;margin-left:10px;letter-spacing:.08em}
        .tl-role{font-size:13px;color:var(--sub);margin:2px 0 12px}
        .tl-bullets{list-style:none}.tl-bullets li{font-size:14px;color:var(--ink);margin-bottom:10px;padding-left:16px;position:relative}
        .tl-bullets li::before{content:"";position:absolute;left:0;top:11px;width:5px;height:5px;background:var(--oxford);opacity:.45}
        .tags{margin-top:12px;display:flex;flex-wrap:wrap;gap:6px}
        .tag{font-family:var(--mono);font-size:11px;color:var(--sub);background:var(--wash);padding:3px 9px;border-radius:2px;letter-spacing:.03em}

        .deals{display:grid;gap:14px}
        .deal{border:1px solid var(--line);border-radius:4px;background:#fff;transition:border-color .25s,box-shadow .25s}
        .deal:hover{border-color:#B9C4D2}.deal-open{border-color:var(--oxford);box-shadow:0 2px 14px rgba(0,33,71,.06)}
        .deal-head{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:20px 24px;background:none;border:none;text-align:left}
        .deal-title-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:4px}
        .deal-name{font-family:var(--serif);font-size:16.5px;font-weight:700;color:var(--ink)}
        .deal-meta{font-family:var(--mono);font-size:12px;color:var(--faint)}
        .deal-arrow{font-size:20px;color:var(--faint);flex-shrink:0;margin-top:2px;transition:transform .25s}
        .deal-open .deal-arrow{transform:rotate(90deg);color:var(--oxford)}
        .deal-body{padding:4px 24px 22px;border-top:1px solid var(--wash)}
        .deal-label{display:inline-block;font-family:var(--mono);font-size:10.5px;color:var(--crit);letter-spacing:.1em;margin-right:12px;min-width:62px}
        .deal-role{font-size:13.5px;color:var(--ink);padding:14px 0 8px}
        .deal-thesis{font-size:14px;color:var(--ink);background:var(--blue-wash);padding:12px 16px;border-radius:3px;margin:6px 0 14px;line-height:1.8}
        .deal-details{list-style:none}.deal-details li{font-size:13.5px;color:var(--sub);padding-left:16px;position:relative;margin-bottom:7px}
        .deal-details li::before{content:"—";position:absolute;left:0;color:var(--faint)}
        .badge{font-size:11.5px;font-weight:500;padding:2px 10px;border-radius:2px;letter-spacing:.03em}
        .badge-invested{background:#E2EEE4;color:#1F5C33}.badge-eval{background:var(--blue-wash);color:var(--oxford)}.badge-memo{background:#F4EEDC;color:#7A5F1E}

        .thoughts{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .thought{border:1px solid var(--line);border-radius:4px;background:#fff;padding:22px 24px;display:flex;flex-direction:column;transition:border-color .25s,transform .25s,box-shadow .25s}
        .thought:hover{border-color:var(--oxford);transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,33,71,.07)}
        .thought-hl{border-color:var(--oxford);background:linear-gradient(180deg,#fff 0%,var(--blue-wash) 140%)}
        .thought-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
        .thought-cat{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;color:var(--oxford);background:var(--blue-wash);padding:3px 9px;border-radius:2px}
        .thought-hl .thought-cat{background:var(--oxford);color:#fff}
        .thought-date{font-family:var(--mono);font-size:11px;color:var(--faint)}
        .thought-title{font-family:var(--serif);font-size:16.5px;font-weight:700;line-height:1.55;margin-bottom:10px;color:var(--ink)}
        .thought-summary{font-size:13.5px;color:var(--sub);flex:1}
        .thought-more{font-family:var(--mono);font-size:11.5px;color:var(--oxford);margin-top:16px}

        .reflections{max-width:720px}
        .reflection{padding:26px 0;border-bottom:1px solid var(--line)}.reflection:first-of-type{padding-top:4px}.reflection:last-of-type{border-bottom:none}
        .ref-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;gap:16px}
        .ref-title{font-family:var(--serif);font-size:17.5px;font-weight:700;color:var(--oxford)}
        .ref-date{font-family:var(--mono);font-size:11px;color:var(--faint);flex-shrink:0}
        .ref-content{font-size:14.5px;color:#3C4654;line-height:2}

        .edu-grid{display:grid;gap:16px}
        .edu{border:1px solid var(--line);border-radius:4px;background:#fff;padding:24px 26px}
        .edu-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
        .edu-school{font-family:var(--serif);font-size:18px;font-weight:700;color:var(--oxford)}
        .edu-school-en{font-family:var(--mono);font-size:10.5px;color:var(--faint);letter-spacing:.08em;margin-top:2px}
        .edu-grade{font-family:var(--mono);font-size:12px;color:var(--oxford);background:var(--blue-wash);padding:4px 12px;border-radius:2px}
        .edu-degree{font-size:13px;color:var(--sub);margin:10px 0 12px;font-family:var(--mono)}
        .edu-notes{list-style:none}.edu-notes li{font-size:13.5px;color:var(--sub);padding-left:16px;position:relative;margin-bottom:7px}
        .edu-notes li::before{content:"·";position:absolute;left:2px;color:var(--oxford);font-weight:700}
        .skills{margin-top:22px;display:flex;align-items:center;flex-wrap:wrap;gap:8px}
        .skills-label{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--faint);margin-right:6px}

        .contact-section{scroll-margin-top:90px}
        .contact-card{background:var(--oxford);color:#E9EEF4;border-radius:6px;padding:56px 48px;text-align:center}
        .contact-lead{font-family:var(--serif);font-size:20px;font-weight:600;line-height:1.8;margin-bottom:28px}
        .contact-cta{display:inline-block;background:#fff;color:var(--oxford);font-weight:600;font-size:14px;padding:12px 30px;border-radius:3px;transition:transform .2s,box-shadow .2s}
        .contact-cta:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.25)}
        .contact-rows{margin-top:30px;display:flex;justify-content:center;gap:26px;flex-wrap:wrap;font-family:var(--mono);font-size:12px;color:#9FB0C4}
        .br-desktop{display:inline}

        .footer{display:flex;justify-content:space-between;padding:28px 0 44px;font-family:var(--mono);font-size:11px;color:var(--sub);border-top:1px solid var(--line);margin-top:56px;flex-wrap:wrap;gap:8px}
        .footer-dim{color:var(--faint)}

        @media(max-width:760px){
          .nav-links{display:none}.burger{display:block}
          .hero{grid-template-columns:1fr;gap:36px;padding-top:104px}.name-zh{font-size:42px}.hero-visual{order:2}.matrix{max-width:300px}
          .section{margin-bottom:80px}
          .tl-item{grid-template-columns:1fr;gap:8px}.tl-left{text-align:left;display:flex;gap:12px;align-items:baseline;padding-left:26px}
          .thoughts{grid-template-columns:1fr}
          .contact-card{padding:40px 24px}.br-desktop{display:none}.sec-en{display:none}
        }
      `}</style>
    </div>
  );
}
