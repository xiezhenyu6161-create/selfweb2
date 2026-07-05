export const portfolioData = {
  name: '谢振宇',
  initials: 'ZY',
  role: 'AI内容运营编导',
  personalLine: '26岁｜本科｜党员｜上海浦东新区',
  location: '上海浦东新区',
  phone: '13062619706',
  phoneDisplay: '130 6261 9706',
  email: '2151785434@qq.com',
  heroEyebrow: 'AI CONTENT OPERATOR · SHANGHAI',
  heroTitle: ['会AI的运营', '把内容经验变成', '可复制的生产力'],
  expectedSalary: '13—15K',
  heroDescription:
    '我做的不只是用AI生成内容，而是把选题判断、脚本、拍摄、剪辑、分发与复盘串成一套能持续交付结果的工作流。',
  profileParagraphs: [
    '2年知识IP内容编导与AI辅助内容生产经验，熟悉知识IP从选题判断、脚本撰写、拍摄执行、剪辑把控、多平台分发到数据复盘的完整内容闭环。围绕人文社科、亲密关系、女性成长与个人成长方向，主导完成112条原创短视频，参与完成及复核136条讲书、访谈、演讲及直播切片，内容发布至抖音、小红书和视频号。',
    '搭建并落地多套AI辅助内容生产工作流，覆盖竞品研究、IP口吻校准、长视频切片筛选、数字人补拍与关注引导素材批量制作，将竞品资料整理效率提升至约3倍，脚本与IP对稿轮次降低约50%—67%。',
    '能够基于议题争议度、用户情绪浓度、IP观点适配度和平台传播性进行选题判断；熟悉反标签、人物故事、现实痛点、认知反转等脚本结构；重点优化前3秒钩子、观点反转、故事完整度、金句密度和结尾互动引导。',
    '25年上半年在上海电机学院担任过半个学期的外聘老师，主要教授虚拟引擎unity的基础知识。',
    '24年7月至今，在学校做过4次AI行业分享。',
  ],
  stats: [
    { value: '248', unit: '条', label: '主导或参与内容' },
    { value: '16.2', unit: '万', label: '账号粉丝净增长' },
    { value: '3', unit: '倍', label: '资料整理效率' },
    { value: '50%—67%', unit: '', label: '脚本对稿成本降低' },
  ],
  experiences: [
    {
      period: '2024.07—2026.05',
      company: '上海黄豆网络科技有限公司',
      role: 'AI内容运营编导',
      detail: '负责知识IP从选题、脚本到拍摄、剪辑、发布与复盘的完整内容闭环。',
    },
    {
      period: '2024.03—2024.05',
      company: '分众传媒',
      role: '商业IP视频剪辑实习生',
      detail: '参与分众江南春商业IP内容剪辑、选题讨论与案例素材整理。',
    },
    {
      period: '2024—至今',
      company: '教学与行业分享',
      role: '外聘教师 / AI分享者',
      detail: '教授Unity基础课程，并在高校完成4次AI行业主题分享。',
    },
  ],
  strengths: [
    {
      index: '01',
      title: '内容判断与脚本',
      text: '从争议度、情绪浓度、IP适配度和平台传播性判断选题，让内容既有观点，也有传播入口。',
      tags: ['选题策划', '脚本结构', 'IP口吻'],
    },
    {
      index: '02',
      title: 'AI工作流搭建',
      text: '把竞品研究、逐字稿处理、观点提取和内容校准连接起来，减少重复劳动和沟通轮次。',
      tags: ['Codex', '扣子工作流', '知识库'],
    },
    {
      index: '03',
      title: '拍摄剪辑全流程',
      text: '能从现场执行一路跟到最终发布，用镜头、节奏、字幕和包装保障内容完整落地。',
      tags: ['拍摄执行', 'PR / AE', '多平台分发'],
    },
    {
      index: '04',
      title: '工具原型落地',
      text: '针对运营现场的真实麻烦做小工具，让内容筛选、拍摄准备和素材管理更快一步。',
      tags: ['运营工具', '快速原型', '问题拆解'],
    },
  ],
};

const image = (file, alt, caption) => ({
  src: `/assets/images/${file}.webp`,
  thumb: `/assets/thumbs/${file}.webp`,
  alt,
  caption,
});

export const projectGroups = [
  {
    id: 'content-growth',
    number: '01',
    kicker: 'CONTENT GROWTH',
    title: '知识IP增长与爆款内容',
    summary:
      '围绕人文社科、亲密关系与女性成长完成内容全流程，推动账号粉丝由17.2万增长至33.4万。',
    result: '+16.2万粉丝',
    metrics: ['112条原创短视频', '136条长视频切片', '月均私域线索100+'],
    images: [
      image(
        '01-studio-recording',
        '李蕾老师在室内录制内容，相机取景器同步显示拍摄画面',
        '知识IP内容录制现场',
      ),
      image(
        '02-shooting-behind-scenes',
        '谢振宇在拍摄现场操作相机',
        '拍摄执行与现场把控',
      ),
      image(
        '03-viral-money-method',
        '“我到底要靠什么挣钱”爆款短视频画面与互动数据',
        '代表作获得18741赞、9824收藏、3700分享',
      ),
      image(
        '10-love-brain-case',
        '“恋爱脑就该挨骂吗”短视频画面',
        '长视频二次编导代表作：22317赞、7350收藏、7495分享',
      ),
    ],
  },
  {
    id: 'ai-research',
    number: '02',
    kicker: 'AI WORKFLOW',
    title: 'AI竞品研究与IP方法库',
    summary:
      '将素材抓取、逐字稿、结构拆解、关键词聚类和人工判断组合成可复用流程，资料整理效率提升至约3倍。',
    result: '效率提升3倍',
    metrics: ['竞品样本库', 'IP表达校准', '对稿轮次降至1次'],
    images: [
      image(
        '04-hotspot-extractor',
        '热点宝达人提取工具界面',
        '竞品内容批量提取入口',
      ),
      image(
        '05-transcript-workflow',
        '视频链接经语音识别转换成逐字稿的自动化流程',
        '逐字稿提取工作流',
      ),
      image(
        '06-content-filter',
        '按时间、点赞数筛选作品并同步的工具界面',
        '高数据内容筛选',
      ),
      image(
        '07-research-database',
        '包含标题、标签、互动数据和逐字稿的竞品研究表格',
        '同赛道高数据内容样本库',
      ),
      image(
        '08-ip-method-library',
        'IP助理方法库目录，包含定位、开头、文案、标题和选题模块',
        'IP助理方法库',
      ),
      image(
        '09-ip-voice-calibration',
        'IP历史内容与表达校准工作台',
        'IP口吻与价值判断校准',
      ),
    ],
  },
  {
    id: 'ai-production',
    number: '03',
    kicker: 'AI PRODUCTION',
    title: 'AI数字人与引导素材',
    summary:
      '用本人录音、AI画面和后期剪辑解决临时补拍与高频引导素材需求，降低重复拍摄的准备成本。',
    result: '单次节省1—2小时',
    metrics: ['数字人补拍', '声音克隆', '30—40条引导素材'],
    images: [
      image(
        '11-digital-human-workflow',
        'AI画面生成节点工作流与视频预览',
        'AI数字人补拍工作流',
      ),
      image(
        '12-cta-video',
        '知识IP视频的结尾关注引导画面',
        '结尾引导素材成片',
      ),
      image(
        '13-voice-clone',
        'Qwen3-TTS声音克隆节点界面',
        'IP声音克隆流程',
      ),
      image(
        '14-tts-interface',
        'TTS2语音生成参数与文本输入界面',
        '批量生成不同话术',
      ),
    ],
  },
  {
    id: 'tools',
    number: '04',
    kicker: 'SELF-BUILT TOOLS',
    title: '用Codex做的提效插件和APP',
    summary:
      '不从“想做一个产品”出发，而是从运营现场的具体麻烦出发，把排序、拍摄排期和分镜记录做成可用原型。',
    result: '从问题到可用原型',
    metrics: ['抖音排序插件', 'IP拍摄助手', '小六壬实验App'],
    images: [
      image(
        '15-douyin-sort-overview',
        '抖音主页与视频排序助手插件界面',
        '按互动数据重新排列主页作品',
      ),
      image(
        '16-douyin-sort-comments',
        '抖音视频评论排序和高赞评论提取界面',
        '评论区按点赞量排序',
      ),
      image(
        '17-shooting-assistant-schedule',
        'IP助理拍摄助手的拍摄排期页面',
        '拍摄任务排期',
      ),
      image(
        '18-shooting-assistant-checklist',
        'IP助理拍摄助手的出发前设备检查页面',
        '拍摄前检查清单',
      ),
      image(
        '19-shot-notes',
        '分镜速记页面，记录脚本所需镜头',
        '现场分镜快速记录',
      ),
      image(
        '20-xiaoliuren-mode',
        '小六壬App的起卦方式选择页面',
        '传统文化实验App',
      ),
      image(
        '21-xiaoliuren-form',
        '小六壬App的数字输入与问题选择页面',
        '小六壬测算输入界面',
      ),
    ],
  },
];

export const resumeData = {
  mainExperience: {
    company: '上海黄豆网络科技有限公司',
    role: 'AI内容运营编导',
    period: '2024.07—2026.05',
    facts: [
      {
        label: '项目账号',
        text: '帆书李蕾讲经典，定位为人文社科、经典阅读、个人成长类知识IP账号',
      },
      {
        label: '内容方向',
        text: '围绕经典文本、人文社科议题、亲密关系、女性成长与人生认知，策划具备情绪共鸣、观点反转和知识增量的短视频内容。',
      },
      {
        label: '发布平台',
        text: '抖音、小红书、视频号；根据平台用户语境调整标题、封面、开头节奏和发布策略，并跟踪点赞、评论、收藏、分享及私域线索表现。',
      },
    ],
    overview:
      '负责知识IP账号的短视频内容编导与AI辅助内容生产，围绕IP表达习惯和账号定位，完成选题判断、资料检索、脚本撰写、拍摄、剪辑、多平台分发和数据复盘，推动内容从创意到上线形成完整闭环。',
  },
  secondaryExperience: {
    company: '分众传媒',
    role: '商业IP视频剪辑实习生',
    period: '2024.03—2024.05',
    project:
      '项目账号：分众江南春，内容方向为商业认知、品牌营销、创业经营与企业管理。',
    points: [
      '负责商业IP口播短视频剪辑，根据内容重点调整节奏、删减无效停顿、优化信息密度，并完成字幕、包装和基础视觉呈现，保障商业认知类内容表达清晰。',
      '参与品牌营销、创业经营和商业认知方向的选题讨论，协助整理商业案例与口播内容素材。',
    ],
  },
  education: {
    school: '上海电机学院｜数字媒体艺术',
    period: '2020.09—2024.06',
  },
  awards: [
    '2021—2022年，上海电机学院博学奖学金二等奖',
    '2022—2023年，上海电机学院博学奖学金二等奖',
    '2023年，全国大学生广告艺术大赛二等奖',
  ],
  skills: [
    {
      label: '内容能力',
      text: '选题判断、脚本结构设计、IP口吻校准、拍摄执行、多平台分发、数据复盘、长视频二次编导',
    },
    {
      label: '视频与视觉',
      text: 'PR、剪映、PS、AE',
    },
    {
      label: 'AI工具',
      text: 'Codex、Claude Code、ChatGPT，扣子工作流、DeepSeek、Fish Audio、TTS2、飞影、ComfyUI、Stable Diffusion、可灵、即梦Seedance 2.0、RunningHub无线画布（AI短剧工作流）、百度一镜。',
    },
  ],
  selfBuiltTools: [
    '抖音排序插件',
    'IP助理拍摄助手APP',
    '小六壬APP（玄学小玩具，平时可以用来测测选题能不能爆）',
  ],
};

export const evidenceBlocks = [
  {
    id: 'content-growth',
    number: '01',
    title: '内容生产与账号增长',
    text: '主导完成112条原创短视频的选题、脚本、拍摄、剪辑、发布与复盘，并参与完成及复核136条讲书、访谈、演讲及直播切片；运营期间抖音账号粉丝由17.2万增长至33.4万，增长16.2万、增幅约94%，月均私域加群线索由50+提升至100+。',
    images: projectGroups[0].images.slice(0, 2),
  },
  {
    id: 'viral-content',
    number: '02',
    title: '爆款内容编导',
    text: '基于李蕾老师历史内容搭建AI辅助的IP表达素材库，提炼其个人经历、语言风格和价值判断；围绕“兴趣如何变成长期事业”的话题，采用“真实困境—错误排除—名人启发—个人验证—结果证明—活动转化”的脚本结构，完成《我是怎么找到适合我自己的赚钱方法的？》的选题、脚本、拍摄、剪辑、发布与复盘，最终获得点赞18741、评论825、收藏9824、分享3700。验证了“真实个人经历＋赚钱话题＋可复制认知”在女性成长内容中的有效性。',
    images: [projectGroups[0].images[2]],
  },
  {
    id: 'competitor-research',
    number: '03',
    title: 'AI竞品研究工作流',
    text: '搭建同赛道高数据内容样本库，通过用Codex自制的插件配合扣子工作流完成逐字稿提取、结构拆解和关键词聚类，再人工判断可迁移的选题逻辑、情绪入口、开头冲突和脚本结构；单次资料整理时间由1—2天缩短至约半天，处理效率提升至约3倍，并沉淀为选题库和脚本结构参考。',
    images: projectGroups[1].images.slice(0, 4),
  },
  {
    id: 'voice-calibration',
    number: '04',
    title: 'AI辅助IP口吻校准',
    text: '基于IP历史视频、讲书内容和过往脚本，整理观点库、常用表达、语气风格和价值判断标准，形成AI辅助的IP表达校准流程，用于脚本初稿的口吻审核与改写；常规脚本与IP的对稿轮次由2—3次减少至1次，沟通成本降低约50%—67%，提升脚本一次通过率。',
    images: projectGroups[1].images.slice(4, 6),
  },
  {
    id: 'long-video',
    number: '05',
    title: '长视频二次编导',
    text: '将讲书、访谈、演讲及直播内容转为逐字稿，使用DeepSeek初筛观点密度、故事完整度、冲突点和金句片段，再进行人工复核与二次编导判断；单次片段筛选时间由1—1.5天缩短至1天以内，提升长视频切片筛选效率和内容判断稳定性。针对“恋爱脑”争议话题对原有的长视频进行切片，采用“争议问题—经典佐证—重新定义—价值升华”的脚本结构，《“恋爱脑”就该挨骂吗？》，最终获得点赞22317、评论1021、收藏7350、分享7495，收藏与分享数据突出，验证了该结构在情绪议题与知识表达结合上的有效性。',
    images: [projectGroups[0].images[3]],
  },
  {
    id: 'digital-human',
    number: '06',
    title: 'AI数字人内容交付',
    text: '针对临时补拍、镜头缺失和交付周期紧张等情况，搭建“IP本人录音＋AI画面生成＋后期剪辑”的补拍流程，减少重复拍摄对服装、妆发和场景的依赖，单次节省约1—2小时准备成本。',
    images: projectGroups[2].images.slice(0, 2),
  },
  {
    id: 'ai-guidance',
    number: '07',
    title: 'AI引导素材批量制作',
    text: '针对讲书视频结尾关注引导的高频需求，使用TTS2可视化动效制作30—40条不同话术的结尾引导素材，提升结尾口播素材复用率，降低IP重复拍摄成本。',
    images: projectGroups[2].images.slice(2, 4),
  },
  {
    id: 'live-commerce',
    number: '08',
    title: '直播带货',
    text: '参与知识IP带货直播的现场拍摄、场景搭建与直播助理工作，支撑IP在图书教育品类的带货直播运营；项目峰值期（24年下半年）日均带货直播4—5场、场均销售额5000—1万元、半年带货销售额达250万元；偶尔也参与直播内容策划，辅助提升直播场次密度与内容节奏。',
    images: [],
  },
];

export const toolEvidenceBlocks = [
  {
    id: 'douyin-sorter',
    number: '01',
    title: '抖音排序插件',
    images: projectGroups[3].images.slice(0, 2),
  },
  {
    id: 'shooting-assistant',
    number: '02',
    title: 'IP助理拍摄助手APP',
    images: projectGroups[3].images.slice(2, 5),
  },
  {
    id: 'xiaoliuren',
    number: '03',
    title: '小六壬APP（玄学小玩具，平时可以用来测测选题能不能爆）',
    images: projectGroups[3].images.slice(5, 7),
  },
];
