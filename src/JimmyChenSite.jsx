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
    date: "2026.06",                                // 用于排序，最新在前
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
    date: "2025.11",
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
    date: "2026.04",
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
    date: "2026.05",
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


// ── 一级市场笔记（文章列表）────────────────────────────────────────
// highlight: true 的文章会特别高亮显示
const THOUGHTS = [
  {
    id: 6,
    title: "AI CPU市场深度分析",
    date: "2026/07/21",
    category: "AI CPU",
    readTime: "12 min",
    summary: "AI Agent 时代正在重塑服务器 CPU 市场。传统云计算 CPU 与面向 AI 的新型 CPU 在带宽、CPU-GPU 高速互联、硬件加速、内存与总线系统上出现结构性分化。本文从市场规模、架构差异、CSP 自研趋势与 ARM / RISC-V 生态演进出发，拆解新一代 AI CPU 的竞争格局。",
    highlight: true,
    content: [
      { heading: "一、市场总量" },
      "据 IDC 报告数据，2025 年全球服务器 CPU 终端销售规模已达约 1,500 亿元人民币。其中，国产头部厂商华为预计占据约 260 亿元，海光信息约 70 亿元，两大厂商合计约 330 亿元。受产能上限约束，该部分短期内增幅有限。英特尔与 AMD 两家合计份额预计超过 1,150 亿元。",
      "展望 2026 年，伴随 AI Agent 时代全面到来，服务器 CPU 市场规模大概率突破 2,000 亿元，其中国产部分预计达 400 亿至 450 亿元，英特尔与 AMD 合计仍可能维持在 1,400 亿至 1,500 亿元区间。值得关注的是，供需失衡已引发显著涨价效应。以英特尔至强 6403 为例（32 核 / 10nm 制程，约四年前发布的产品）：2024 年底官网大客户报价约 8,500 元，2025 年 Q1 起持续上涨，最新报价已升至约 22,000 元，涨幅约 160%，且仍呈上行趋势。",
      "当前 CPU 市场已分化为两大板块：传统云计算 CPU，主要由华为（鲲鹏系列）和海光信息（海光 C86 系列，基于 Zen 1 架构）占据国产市场的绝大部分份额；面向 AI 的新型 CPU，则由头部芯片厂商及互联网巨头主导自研，代表产品包括 NVIDIA Grace、Google Axion、Intel Xeon（新一代）、AMD EPYC 等。",
      { image: "/notes/ai-cpu-competition.png", alt: "新一代 AI CPU 产品竞争格局", caption: "新一代 AI CPU 的竞争：BlueDot、Grace、Axion、Xeon、EPYC 与 C86 系列的关键参数对比。" },
      { heading: "二、AI CPU 与传统 CPU 的本质差异" },
      "面向 AI 的 CPU 与传统云计算 CPU 之间最核心的差异在于带宽。2022 年，传统 x86 架构 CPU 的内存带宽约为 64 GB/s，而 NVIDIA 面向 AI 场景的需求目标为 900 GB/s，两者之间存在约 15 倍的差距。这一瓶颈直接促使 NVIDIA 于 2022 年启动 Grace CPU 的自研计划，通过 NVLink 互联实现 CPU 直出 900 GB/s 的带宽能力。",
      "其他 CSP（云服务提供商）亦面临同样的带宽瓶颈，纷纷走上自研道路。这也是英特尔市值从两三千亿美元跌至约 800 亿美元的核心原因之一。在 AI 时代，英特尔与 AMD 均出现了结构性缺位。",
      { image: "/notes/ai-cpu-architecture.png", alt: "AI CPU 架构示意图", caption: "AI CPU 架构示意：CPU 核心、GPU 高速互联、内存、硬件加速与总线系统需要被重新集成。" },
      { callout: "Remark：英伟达 CPU 与 CPU 互联是 NVLink-C2C 协议，并非 QPI、UPI、NPI。" },
      { image: "/notes/ai-cpu-qpi-upi-npi.png", alt: "QPI、UPI、NPI 互联演进示意", caption: "QPI → UPI → NPI 的互联演进：每一代都在追求更高带宽、更低延迟，并逐步面向 AI 场景优化。" },
      "然而，带宽仅是差异的起点。传统云计算 CPU 主要依赖核心运行虚拟机，通过 PCIe 连接外围器件，并以 DRAM 作为主内存。而面向 AI 场景时，CPU 需在五个维度进行系统性重构。",
      "第一，CPU 核心需针对 AI 算力和算子进行定向优化，具备面向 AI 的指令集加速能力（如 FP8 / FP16 等）。以 ARM 架构为例，V 系列核心（V 核）专为 AI 设计，N 系列核心（N 核）面向传统云计算，两者在指令集和微架构规格上存在大量差异。",
      "第二，CPU-GPU 高速互联需要根本性重构，通过 NVLink-C2C 或 CXL 协议实现统一编址的内存共享，使异构芯片间的协同效率大幅提升。第三，大量 AI 算子需下沉为硬件加速电路，涵盖安全、网络、应用及存储类加速功能。第四，内存系统需配合 AI 场景进行质的变革，支持更大容量和更高带宽。第五，总线系统需要全方位升级，以支持高速互联需求。",
      { image: "/notes/ai-cpu-five-dimensions.png", alt: "AI CPU 五大维度对比示意图", caption: "新一代 AI CPU 的五个关键维度：AI Enable 的 CPU 核心、CPU+GPU 互联、硬件加速、内存管理与总线系统。" },
      "据 NVIDIA 官网数据，Grace CPU 替代英特尔 x86 后可实现：AI 训练效率提升 2 至 4 倍，数据库 Hash 运算性能提升 4.4 倍，超级计算性能提升 1.3 至 3.6 倍。其本质是 CPU-GPU 协同效率与 CPU-内存交互效率的全面提升，充分验证了部署 AI CPU 的必要性。",
      { image: "/notes/ai-cpu-grace-performance.png", alt: "Grace CPU 性能对比数据", caption: "Grace CPU 相比传统 x86 CPU 在图计算、数据分析等场景中的性能与能效提升。" },
      { heading: "三、产业趋势：CSP 自研与架构选择" },
      "微软、谷歌、亚马逊等头部 CSP 启动自研 CPU 的时间节点均集中在 2022 年前后，核心驱动因素一致：英特尔 / AMD 的传统 x86 CPU 在当时已无法满足 GPU AI 训练与推理场景对带宽和协同效率的要求。",
      "值得注意的是，美国互联网巨头在选择 ARM 核心时，无一例外选用了 V 系列核心（面向 AI），而非 N 系列核心（面向云计算），进一步印证了 AI 对 CPU 架构的重塑性需求。",
      { image: "/notes/ai-cpu-neoverse-v3.png", alt: "Arm Neoverse V3 架构说明", caption: "Neoverse V3：面向 AI / ML 加速的新一代 Arm 数据中心 CPU 核心。" },
      { heading: "四、CPU 综合能力评估框架与竞争格局" },
      "在核心层面，架构优势带来的性能差异显著。以某头部企业（BlueDot）为例，其 24 核产品在性能上可对标同行 32 核产品，48 核可对标同行 96 核；与另一家国产主流厂商相比，24 核的性能表现可匹敌其 48 核产品。",
      "但需要强调的是，CPU 是一个由核心、GPU 高速互联、硬件加速、内存和总线五个维度构成的综合体。因此，评估一家 CPU 企业的竞争力，需要从这五个维度进行全面考量。例如，华为的优势主要体现在硬件加速电路、网络侧接口及互联能力等方面。仅凭核心架构的先进性并不等同于 CPU 产品的整体领先，唯有在五个维度上均达到全球领先水平，才能构成真正有竞争力的 CPU 产品。",
      "此外，值得关注的是 A 股 CPU 龙头海光信息的技术路径。海光信息于 2017 年获得 AMD Zen 1 架构授权，但被列入美国实体清单后，无法继续获取新架构授权。而 AMD 真正面向 AI 的架构迭代始于 Zen 3 / Zen 4 / Zen 5。因此，海光信息若要进入 AI CPU 市场，必须走自主研发路线，需要在上述五个维度上逐一突破。",
      { heading: "五、ARM 在数据中心的崛起启示与 RISC-V 的未来" },
      "2015 年，ARM 在数据中心 CPU 市占率为零。同年，亚马逊率先入局，启动基于 ARM 架构的 Graviton 芯片开发。2020 年，ARM 数据中心市占率约 1%——从 0 到 1，历时 5 年。2025 年，ARM 数据中心市占率突破 20%——从 1% 到 20%，仅用 5 年，增长曲线呈现指数级加速。",
      "亚马逊成功推动 ARM 生态有三大条件：第一，规模优势，年服务器采购量超百万台，年采购额达一两千亿元人民币；第二，资金投入，每年投入 55 至 60 亿美元用于生态建设，10 年累计投入约 600 亿美元；第三，行业 Know-how，亚马逊自身即为全球最大的数据中心运营商，对数据中心 CPU 的需求有深刻的第一手认知。",
      "亚马逊同时具备上述三项条件，作为产业链链主，带动了整个 ARM 数据中心生态从无到有的构建，VMware for ARM、操作系统适配、开源工具链等均在其推动下逐步完善。",
      "RISC-V 在数据中心的当前处境与 2015 年的 ARM 高度相似——生态基础几乎为零。核心问题在于：谁将成为 RISC-V 赛道上的「亚马逊」？这一角色需要同时具备三项能力：年 500 至 600 亿元级别的生态投入能力、年 1,000 至 2,000 亿元级别的服务器采购规模、以及对数据中心的深度行业认知。",
      "创业公司难以独力承担生态构建的重任，RISC-V CPU 市场的崛起必然需要产业链链主级别的企业来牵引驱动。否则，即便 CPU 产品性能再强，缺乏生态支撑也无法真正进入数据中心的核心应用场景。",
    ],
  },
  {
    id: 5,
    title: "视频生成的 MoE 时刻：Dense 天花板与架构分水岭",
    date: "2026/07/13",
    category: "AI 视频生成",
    readTime: "8 min",
    summary: "视频生成赛道正在被一条技术线一分为二。MoE 在语言模型里是标配，但在视频里至今只有极少数公司跑通——路由坍缩与通信爆炸是两个结构性难题。本文从 MoE 在视频中的技术瓶颈出发，拆解创业公司在有限算力下的架构突破路径。",
    highlight: true,
    content: [
      { heading: "MoE 为什么在视频里这么难" },
      "MoE 在文本模型里已经是标配了，DeepSeek-V3、Kimi K2 都是 MoE。逻辑不复杂：模型内部拆成一堆专家子网络，每次只激活一小部分，参数可以做很大但计算量不高。在 LLM 里这招很好使，因为文字 token 之间差异天然就大——代码和诗歌长得完全不一样，路由器很容易把它们分配给不同的专家。",
      "但视频的 token 却不是这样。一片蓝天的所有 token 在语义空间里几乎挤在一个点上。路由器面对一大堆长得差不多的数据，分不出谁该去哪个专家，最后所有 token 都涌向同一两个专家，其余的空转——这就是论文里说的「路由坍缩」（routing collapse）。MoE 退化成了 Dense，稀疏激活的效率优势无从兑现。",
      "今年 5 月有篇 arXiv 论文专门做了系统性诊断，结论很直接：MoE 在视频 DiT 里的应用仍处于非常早期的阶段。这不是调参能解决的，需要在路由机制、模型架构、通信系统三个层面同时突破。",
      "还有一个更实际的工程瓶颈：视频的 token 量比文字大两三个数量级。一段 5 秒 1080p 视频在模型内部可能编码为上百万个 token，每个都要经过路由、分配到不同专家、跨 GPU 通信。通信效率跟不上的话，GPU 大部分时间在等数据而不是在算——训练直接卡在带宽上。",
      "到目前为止，真正在视频生成里跑通 MoE 的公司只有字节和 Sand.ai。字节靠的是万卡集群配 NVLink 高速互联，暴力把 GPU 利用率推到 95%。这条路大厂走得通，但创业公司没有这个算力预算。",
      { heading: "有限算力下的架构突破" },
      "Sand.ai 的路径回答了一个不同的问题：不靠几万张卡，MoE 视频模型能不能训出来？",
      "他们做了三件关键的事。",
      "一是技术路线选了自回归而非 Diffusion。这个选择在 2024 年是非共识，当时全行业都在做 Diffusion。自回归把视频建模成「预测下一帧」，每帧基于前面所有帧生成，天然带因果关系。",
      { image: "/notes/moe-unet-vs-dit.png", alt: "U-Net 与 Transformer DiT 在视频生成中的视野差异", caption: "从 U-Net 到 Transformer（DiT）：视频生成模型从局部视野走向全局建模。" },
      "二是架构上采用了单流式设计，配合超细粒度 MoE。这个值得展开讲。大多数多模态模型是「多流式」的——文本、图像、视频各有一个独立的编码器，最后通过 cross-attention 做融合，模态之间的交互发生在很靠后的层。Sand.ai 的做法是把所有模态的 token 拼成一条序列，送进同一个 Transformer，让 self-attention 从第一层就同时看到所有 token。",
      { image: "/notes/moe-single-stream.png", alt: "多流式与单流式多模态架构对比", caption: "从多流式到单流式：文本、图像、视频 token 在同一个 Transformer 中完成深度融合。" },
      "关键在 FFN 层的处理：不是拆成常规的 8-16 个大专家，而是拆成 256+ 个极细粒度的小专家，让路由器自动学习分配文本 token 去语言专家，视频 token 去运动专家，不需要人工设计分流规则。这种超细粒度的设计绕开了视觉 token 路由坍缩的问题：不是让几个大专家去分辨「蓝天 vs 草地」这种本来就不明显的差异，而是让几百个小专家各自专精于更微观的维度——某种纹理的去噪方式、某类运动边缘的处理逻辑。",
      "三是通信层做了很深的工程优化。自研 Group Collective 通信原语，用 RDMA 替代 NVLink 实现算子级融合通信，配合自研编译器 MagiCompiler。最终用数百卡的集群训出了 400B 参数的 MoE 视频模型，训练成本大约是同参数规模行业均值的 1/10。",
      "这条路径跟 DeepSeek 做 LLM 的思路确实相似，不是比谁卡多，而是在有限算力约束下通过架构创新和系统工程把效率拉到极致。核心模型 MAGI-2（400B MoE）预计 Q3 发布，届时 Artificial Analysis 排行榜的表现将是第一个公开验证节点。",
      "所以我个人的判断是，现阶段投视频生成赛道，第一个要看的是 MoE 有没有跑通，这决定了模型能力的天花板在哪里，也决定了推理成本能不能撑住规模化。第二个要看的是商业化和用户粘性，毕竟大厂有一定的用户基础与流量，想要突围难度也是比较大的。",
    ],
  },
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
    title: "先进制程下新型存储（MRAM）投资笔记",
    date: "2026/07/09",
    category: "半导体",
    readTime: "12 min",
    summary: "制程演进撞墙后，传统存储在 Flash、SRAM、DRAM 三条路线上同时承压。本文从晶体管结构、存储密度、功耗与成本曲线出发，拆解 MRAM 在先进制程片上存储中的替代窗口与投资判断。",
    highlight: false,
    content: [
      { heading: "一、核心逻辑：制程演进撞墙，传统存储失效，新型存储窗口打开" },
      "半导体行业过去二十年的主旋律是摩尔定律驱动制程微缩。晶体管结构经历了三代演进：Planar FET（≥28nm，栅极从 1 面控制沟道）→ FinFET（22nm → 5nm，栅极从 3 面包裹鳍状沟道）→ GAAFET / Nanosheet（3nm / 2nm，栅极从 4 面全包裹纳米片）。栅极控制力逐代增强，但代价也在加速上升，每一代的单位晶体管成本不再下降，制程微缩带来的经济性优势在 14nm 以下已基本消失。",
      { callout: "关键判断：晶体管本身还能继续缩，但「缩了还划算」这件事已经不成立了。这个矛盾在存储领域表现得更为剧烈。" },
      { image: "/notes/mram-transistor-scaling.png", alt: "Planar FET、FinFET 与 GAAFET 的晶体管结构演进", caption: "晶体管结构演进：栅极控制力逐代增强，但经济性优势逐步减弱。" },
      { heading: "二、传统存储的三面「撞墙」" },
      "AI 需求正在驱动算力芯片向 2nm 甚至 A 节点（Angstrom 级）演进，但传统存储技术各自遭遇了物理与经济的双重瓶颈：",
      { heading: "Flash | 撞墙于 ~28nm" },
      "Flash 操作电压需要 10–20V，远超先进制程晶体管的承受范围（<1V）。FinFET / GAA 架构与 Flash 结构根本不兼容。Flash 的出路是 3D 堆叠（3D NAND），走的是「叠层数」的路线，与逻辑制程微缩已经脱钩。",
      { heading: "SRAM（6T 单元）| 撞墙于 ~5nm，4nm 以下面积效率不再提升" },
      "SRAM 采用 6 个晶体管（6T）构成一个存储单元。6T 结构尺寸过大，密度低，容量受限；制程越先进，栅氧化层越薄，漏电流指数级上升，静态功耗过大。",
      { callout: "到 4nm 以下，SRAM 面积效率基本没有提升，甚至出现面积反弹，缩了节点，存储面积反而更大。在 2nm/3nm 芯片中，SRAM 占据的面积比例不降反升，成为先进制程的核心瓶颈。" },
      { heading: "DRAM | 撞墙 2nm" },
      "DRAM 难以与逻辑芯片同晶圆异质集成，只能走多芯粒封装路线（HBM / CoWoS / 3D-DRAM TSV），带来带宽受限、延迟增大、功耗增加等系统级问题，且封装成本极高。",
      { callout: "总结：Flash 在 28nm 脱钩，SRAM 在 4nm 以下失效，DRAM 被封装瓶颈卡死。三大传统存储在先进制程下全面承压，给新型存储打开了替代窗口。" },
      { image: "/notes/mram-memory-bottlenecks.png", alt: "传统存储在先进制程下的瓶颈示意图", caption: "传统存储在先进制程下的三类瓶颈：Flash、SRAM、DRAM 分别受制于结构兼容、面积效率与封装集成。" },
      { heading: "三、新型存储为什么在这个时间点出现？" },
      { heading: "制程密度拐点：不是「新存储多好」，而是「旧存储走不下去了」" },
      "传统存储撞墙是事实，但真正把新型存储从实验室推向产业化的驱动力，是密度、功耗、成本三条曲线同时触及拐点。",
      "密度侧：SRAM 6T 在 4nm 以下面积效率不再改善，甚至反弹，芯片中存储占比不降反升。功耗侧：栅氧化层极薄导致漏电流指数级上升，SRAM 静态功耗已成为先进制程芯片的主要能耗来源之一。成本侧：先进制程单晶体管成本在 14nm 之后不再下降，SRAM 每 bit 成本随制程推进反而上升。",
      "三条曲线在 3nm / 2nm 节点附近交汇，意味着传统存储不只是「性能不够」，而是整个经济模型失效。AI 算力的爆发式增长又不允许存储成为系统瓶颈——当计算侧推进到 2nm，存储侧停在 5nm 就开始退化，这个效率落差逼迫产业必须寻找替代方案。三星、海力士、台积电集体加码 MRAM 和 RRAM 研发，本质原因在此。",
      { heading: "两条技术路线" },
      "RRAM（阻性存储）：通过改变介质层的电阻状态来存储信息。结构简单，工艺兼容性较好，但耐久性和一致性方面仍有挑战，目前更多应用于存算一体等特定场景。",
      "MRAM（磁性存储）：基于 MTJ（磁性隧道结），利用电子自旋来存储信息。量子力学中，电子自旋量子数只有两个本征值 +1/2 和 -1/2，天然对应二进制的 0 和 1——这不是人为编码，而是物理本征态。MRAM 因此具备非易失性（断电不丢数据）、无需刷新、也不需要 Flash 那样的高电压操作。",
      { heading: "MRAM 被产业重视的现实原因" },
      "MRAM 受到更多关注，不是因为它完美，而是因为它恰好回应了先进制程下传统存储的核心痛点：其一，CMOS 后道兼容，MTJ 可以直接沉积在逻辑芯片的后道金属层上，不需要额外晶圆或封装，片上集成成为可能，而 DRAM 的核心瓶颈恰恰是封装。其二，密度优势，MTJ 支持微缩，密度可达 SRAM 6T 单元的 6 倍以上，直接缓解面积效率退化。其三，零待机功耗——非易失性意味着静态功耗为零，而 SRAM 漏电正是其在先进制程下的核心痛点。",
      { callout: "但 MRAM 的核心问题同样明确：写入功耗高、写入速度较慢。个人判断，MRAM 无法成为存储的终极形态，更可能是一种搭配型的中间过渡态——在传统存储全面撞墙、下一代方案尚未成熟的窗口期，扮演先进制程片上存储的补位角色。" },
      { image: "/notes/mram-advantages.png", alt: "RRAM 与 MRAM 的新型存储优势示意图", caption: "MRAM 的核心优势：CMOS 兼容异质集成、密度优势与零待机功耗。" },
      { remark: ["驰拓：STT-MRAM，更贴近量产落地。已向三星展示 MRAM 在 8nm 上对标 2nm/3nm SRAM 体系的能力。", "智臻：SOT-MRAM，技术前沿性强。读写速度更快、耐久性更好，但与 28nm 以下先进制程兼容量产仍有距离。"] },
    ],
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
  { id: "thoughts", label: "市场笔记" },
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

function dateValue(date) {
  const parts = String(date || "").match(/\d+/g) || [];
  const [year = "0", month = "0", day = "0"] = parts;
  return Number(year.padStart(4, "0") + month.padStart(2, "0") + day.padStart(2, "0"));
}

function sortByDateDesc(items) {
  return [...items].sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

function ModalBlock({ block }) {
  if (typeof block === "string") return <p className="modal-paragraph">{block}</p>;
  if (block.heading) return <h3 className="modal-subtitle">{block.heading}</h3>;
  if (block.callout) return <p className="modal-callout">{block.callout}</p>;
  if (block.image) {
    return (
      <figure className="modal-figure">
        <img src={block.image} alt={block.alt || ""} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.remark) {
    return (
      <aside className="modal-remark">
        <h3>Remark</h3>
        {block.remark.map((item) => <p key={item}>{item}</p>)}
      </aside>
    );
  }
  return null;
}

function DetailModal({ detail, onClose }) {
  if (!detail) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="关闭详情">×</button>
        <div className="modal-kicker">{detail.kicker}</div>
        <h2 className="modal-title" id="detail-title">{detail.title}</h2>
        <div className="modal-meta">
          {detail.date && <span>{detail.date}</span>}
          {detail.meta?.map((m) => <span key={m}>{m}</span>)}
        </div>
        <div className="modal-content">
          {detail.content?.length
            ? detail.content.map((block, index) => <ModalBlock block={block} key={typeof block === "string" ? block : block.heading || block.callout || block.image || index} />)
            : <p className="modal-empty">待补充</p>}
        </div>
      </article>
    </div>
  );
}

export default function JimmyChenSite() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [detail, setDetail] = useState(null);
  const sortedDeals = sortByDateDesc(DEALS);
  const sortedThoughts = sortByDateDesc(THOUGHTS);
  const sortedReflections = sortByDateDesc(REFLECTIONS);

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

  useEffect(() => {
    if (!detail) return undefined;
    const onKeyDown = (e) => { if (e.key === "Escape") setDetail(null); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [detail]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const openDealDetail = (deal) => setDetail({
    kicker: "参与投资的项目",
    title: deal.name,
    date: deal.date,
    meta: [deal.round, deal.status, deal.fund].filter(Boolean),
  });
  const openThoughtDetail = (thought) => setDetail({
    kicker: "一级市场笔记",
    title: thought.title,
    date: thought.date,
    meta: [thought.category, thought.readTime].filter(Boolean),
    content: thought.content,
  });
  const openReflectionDetail = (reflection) => setDetail({
    kicker: "成长感悟",
    title: reflection.title,
    date: reflection.date,
    meta: [],
  });

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
          <p className="sec-sub rv">参与研判与推动的真实项目（已脱敏）。点击查看项目详情。</p>
          <div className="deals">
            {sortedDeals.map((d) => (
              <article className="deal rv" key={d.id}>
                <button className="deal-head" type="button" onClick={() => openDealDetail(d)}>
                  <div className="deal-title-block">
                    <div className="deal-title-row">
                      <h3 className="deal-name">{d.name}</h3>
                      <StatusBadge status={d.status} />
                    </div>
                    <p className="deal-meta">{d.date} · {d.round} · {d.fund}</p>
                  </div>
                  <span className="deal-arrow">查看详情 ›</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Thoughts */}
        <section className="section">
          <SectionHead no="03" zh="一级市场笔记" en="RESEARCH NOTES" id="thoughts" />
          <p className="sec-sub rv">对产业趋势与投资逻辑的持续研究，观点独立，持续更新。</p>
          <div className="thoughts">
            {sortedThoughts.map((t) => (
              <article className={"thought rv " + (t.highlight ? "thought-hl" : "")} key={t.id} onClick={() => openThoughtDetail(t)}>
                <div className="thought-meta">
                  <span className="thought-cat">{t.category}</span>
                  <span className="thought-date">{t.date} · {t.readTime}</span>
                </div>
                <h3 className="thought-title">{t.title}</h3>
                <p className="thought-summary">{t.summary}</p>
                <button className="thought-more" type="button" onClick={(e) => { e.stopPropagation(); openThoughtDetail(t); }}>阅读全文 →</button>
              </article>
            ))}
          </div>
        </section>

        {/* Reflections */}
        <section className="section">
          <SectionHead no="04" zh="成长感悟" en="REFLECTIONS" id="reflections" />
          <div className="reflections">
            {sortedReflections.map((r) => (
              <article className="reflection rv" key={r.id} onClick={() => openReflectionDetail(r)}>
                <div className="ref-head">
                  <h3 className="ref-title">{r.title}</h3>
                  <span className="ref-date">{r.date}</span>
                </div>
                <p className="ref-content">{r.content}</p>
                <button className="ref-more" type="button" onClick={(e) => { e.stopPropagation(); openReflectionDetail(r); }}>查看详情 →</button>
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
      <DetailModal detail={detail} onClose={() => setDetail(null)} />

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
        .deal{border:1px solid var(--line);border-radius:4px;background:#fff;transition:border-color .25s,box-shadow .25s,transform .25s}
        .deal:hover{border-color:var(--oxford);box-shadow:0 4px 16px rgba(0,33,71,.06);transform:translateY(-2px)}
        .deal-head{width:100%;display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:20px 24px;background:none;border:none;text-align:left}
        .deal-title-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:4px}
        .deal-name{font-family:var(--serif);font-size:16.5px;font-weight:700;color:var(--ink)}
        .deal-meta{font-family:var(--mono);font-size:12px;color:var(--faint)}
        .deal-arrow{font-family:var(--mono);font-size:11.5px;color:var(--oxford);flex-shrink:0;margin-top:2px;letter-spacing:.04em}
        .deal-body{padding:4px 24px 22px;border-top:1px solid var(--wash)}
        .deal-label{display:inline-block;font-family:var(--mono);font-size:10.5px;color:var(--crit);letter-spacing:.1em;margin-right:12px;min-width:62px}
        .deal-role{font-size:13.5px;color:var(--ink);padding:14px 0 8px}
        .deal-thesis{font-size:14px;color:var(--ink);background:var(--blue-wash);padding:12px 16px;border-radius:3px;margin:6px 0 14px;line-height:1.8}
        .deal-details{list-style:none}.deal-details li{font-size:13.5px;color:var(--sub);padding-left:16px;position:relative;margin-bottom:7px}
        .deal-details li::before{content:"—";position:absolute;left:0;color:var(--faint)}
        .badge{font-size:11.5px;font-weight:500;padding:2px 10px;border-radius:2px;letter-spacing:.03em}
        .badge-invested{background:#E2EEE4;color:#1F5C33}.badge-eval{background:var(--blue-wash);color:var(--oxford)}.badge-memo{background:#F4EEDC;color:#7A5F1E}

        .thoughts{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        .thought{border:1px solid var(--line);border-radius:4px;background:#fff;padding:22px 24px;display:flex;flex-direction:column;transition:border-color .25s,transform .25s,box-shadow .25s;cursor:pointer}
        .thought:hover{border-color:var(--oxford);transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,33,71,.07)}
        .thought-hl{border-color:var(--oxford);background:linear-gradient(180deg,#fff 0%,var(--blue-wash) 140%)}
        .thought-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
        .thought-cat{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;color:var(--oxford);background:var(--blue-wash);padding:3px 9px;border-radius:2px}
        .thought-hl .thought-cat{background:var(--oxford);color:#fff}
        .thought-date{font-family:var(--mono);font-size:11px;color:var(--faint)}
        .thought-title{font-family:var(--serif);font-size:16.5px;font-weight:700;line-height:1.55;margin-bottom:10px;color:var(--ink)}
        .thought-summary{font-size:13.5px;color:var(--sub);flex:1}
        .thought-more{font-family:var(--mono);font-size:11.5px;color:var(--oxford);margin-top:16px;background:none;border:none;text-align:left;padding:0;align-self:flex-start}

        .reflections{max-width:720px}
        .reflection{padding:26px 0;border-bottom:1px solid var(--line);cursor:pointer;transition:padding-left .25s,border-color .25s}.reflection:hover{padding-left:10px;border-bottom-color:#B9C4D2}.reflection:first-of-type{padding-top:4px}.reflection:last-of-type{border-bottom:none}
        .ref-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;gap:16px}
        .ref-title{font-family:var(--serif);font-size:17.5px;font-weight:700;color:var(--oxford)}
        .ref-date{font-family:var(--mono);font-size:11px;color:var(--faint);flex-shrink:0}
        .ref-content{font-size:14.5px;color:#3C4654;line-height:2}
        .ref-more{font-family:var(--mono);font-size:11.5px;color:var(--oxford);background:none;border:none;padding:0;margin-top:12px;text-align:left}

        .modal-backdrop{position:fixed;inset:0;z-index:200;background:rgba(20,32,46,.44);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:32px}
        .modal-panel{position:relative;width:min(760px,100%);max-height:min(76vh,720px);overflow:auto;background:#fff;color:var(--ink);border:1px solid rgba(0,33,71,.12);border-radius:6px;box-shadow:0 24px 70px rgba(0,0,0,.22);padding:54px 62px 58px}
        .modal-close{position:absolute;top:20px;right:22px;width:34px;height:34px;border:1px solid #D8D1C0;border-radius:50%;background:#fff;color:#B9A978;font-size:25px;line-height:28px;display:flex;align-items:center;justify-content:center}
        .modal-close:hover{border-color:var(--oxford);color:var(--oxford)}
        .modal-kicker{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--faint);margin-bottom:12px}
        .modal-title{font-family:var(--serif);font-size:28px;line-height:1.45;color:var(--oxford);margin-bottom:12px}
        .modal-meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:34px}
        .modal-meta span{font-family:var(--mono);font-size:11.5px;color:var(--sub);background:var(--wash);border-radius:2px;padding:3px 9px}
        .modal-content{border-top:1px solid var(--line);padding-top:30px;min-height:180px}
        .modal-empty{font-family:var(--serif);font-size:22px;color:var(--faint);letter-spacing:.06em;text-align:center;padding:54px 0}
        .modal-subtitle{font-family:var(--serif);font-size:19px;line-height:1.6;color:var(--oxford);margin:6px 0 14px}
        .modal-paragraph{font-size:15px;color:#3C4654;line-height:2.05;margin-bottom:18px}
        .modal-callout{font-size:15px;line-height:2;color:var(--ink);background:var(--blue-wash);border-left:3px solid var(--oxford);padding:14px 18px;margin:20px 0;font-weight:600}
        .modal-figure{margin:26px 0 30px}
        .modal-figure img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:4px;background:#fff}
        .modal-figure figcaption{font-family:var(--mono);font-size:11px;color:var(--faint);line-height:1.7;margin-top:9px;text-align:center}
        .modal-remark{background:#fff;border:1px solid var(--line);border-radius:4px;padding:18px 20px;margin-top:28px}
        .modal-remark h3{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--crit);margin-bottom:10px}
        .modal-remark p{font-size:14px;color:var(--sub);line-height:1.9;margin-bottom:8px}
        .modal-remark p:last-child{margin-bottom:0}

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
          .deal-head{padding:18px 18px}.deal-arrow{margin-top:10px}
          .modal-backdrop{padding:18px}.modal-panel{max-height:82vh;padding:48px 24px 34px}.modal-title{font-size:22px}.modal-close{top:14px;right:14px}
          .contact-card{padding:40px 24px}.br-desktop{display:none}.sec-en{display:none}
        }
      `}</style>
    </div>
  );
}
