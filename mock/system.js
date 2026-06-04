/* Mock: 系统空间（任务队列 / 安全审核 / 模型配置） */
(function () {
  /* ---- 生成任务队列 ---- */
  ZHIXUE_MOCK.tasks = [
    {
      id: 'task-001',
      type: 'PPT',
      title: '循环结构考前复习课件',
      status: 'done',
      progress: 100,
      duration: '12s',
      estimatedTime: '15s',
      profileId: 'prof-001',
      knowledgePoints: ['for 循环', 'while 循环', '循环嵌套'],
      createdAt: '2026-06-03T08:01:00Z'
    },
    {
      id: 'task-002',
      type: '视频',
      title: '循环嵌套执行过程动画',
      status: 'running',
      progress: 65,
      duration: '-',
      estimatedTime: '45s',
      profileId: 'prof-001',
      knowledgePoints: ['循环嵌套', '执行次数'],
      createdAt: '2026-06-03T08:02:00Z'
    },
    {
      id: 'task-003',
      type: '代码',
      title: '成绩统计程序示例',
      status: 'done',
      progress: 100,
      duration: '8s',
      estimatedTime: '10s',
      profileId: 'prof-001',
      knowledgePoints: ['循环', '函数', '列表'],
      createdAt: '2026-06-03T08:03:00Z'
    },
    {
      id: 'task-004',
      type: '题库',
      title: '循环与函数综合练习 5 题',
      status: 'waiting',
      progress: 0,
      duration: '-',
      estimatedTime: '20s',
      profileId: 'prof-001',
      knowledgePoints: ['循环', '函数', '嵌套'],
      createdAt: '2026-06-03T08:04:00Z'
    },
    {
      id: 'task-005',
      type: '讲义',
      title: '函数参数精讲讲义',
      status: 'failed',
      progress: 42,
      duration: '-',
      estimatedTime: '12s',
      profileId: 'prof-001',
      knowledgePoints: ['函数参数', '默认参数', '关键字参数'],
      errorMessage: '知识库检索超时，请重试',
      createdAt: '2026-06-03T08:05:00Z'
    }
  ];

  var taskTypeLabels = { PPT: 'PPT', 视频: '视频/动画', 代码: '代码案例', 题库: '题库', 讲义: '讲义' };

  /* ---- 安全审核记录 ---- */
  ZHIXUE_MOCK.safetyRecords = [
    {
      id: 'sf-001',
      resourceName: '循环结构考前复习讲义',
      generatedBy: '讲义生成 Agent',
      riskLevel: 'low',
      reviewStatus: 'approved',
      sources: ['第 4 章 循环结构课件', '实验指导 4-2'],
      factCheck: '通过 — 内容与知识库一致',
      sensitiveCheck: '通过 — 无敏感内容',
      reviewedBy: '张老师',
      reviewedAt: '2026-06-03T10:00:00Z'
    },
    {
      id: 'sf-002',
      resourceName: '函数参数分层练习题',
      generatedBy: '题目生成 Agent',
      riskLevel: 'low',
      reviewStatus: 'approved',
      sources: ['第 5 章 函数课件', '易错题库-函数专题'],
      factCheck: '通过',
      sensitiveCheck: '通过',
      reviewedBy: '张老师',
      reviewedAt: '2026-06-03T10:30:00Z'
    },
    {
      id: 'sf-003',
      resourceName: '文件操作代码案例',
      generatedBy: '代码实操 Agent',
      riskLevel: 'high',
      reviewStatus: 'rejected',
      sources: ['实验案例-文件批处理'],
      factCheck: '未完全通过 — 代码复杂度偏高，超出当前课程范围',
      sensitiveCheck: '通过',
      reviewedBy: '张老师',
      reviewedAt: '2026-06-03T09:00:00Z',
      rejectReason: '代码复杂度不适合当前班级水平'
    },
    {
      id: 'sf-004',
      resourceName: '循环嵌套执行动画脚本',
      generatedBy: '多模态资源 Agent',
      riskLevel: 'medium',
      reviewStatus: 'pending',
      sources: ['第 4 章 循环结构课件'],
      factCheck: '待检查',
      sensitiveCheck: '待检查',
      reviewedBy: null,
      reviewedAt: null
    }
  ];

  /* ---- 模型与工具配置 ---- */
  ZHIXUE_MOCK.settings = {
    models: [
      { name: '核心大模型', value: '讯飞星火 4.0 / GLM-4.7', status: '已连接' },
      { name: '多智能体框架', value: 'LangGraph', status: '已配置' },
      { name: 'RAG 框架', value: 'LangChain + ChromaDB', status: '已连接' },
      { name: 'Embedding 模型', value: 'BGE-M3', status: '已加载' },
      { name: '多模态生成', value: 'SeeDance (视频) / 预生成脚本', status: '待配置' },
      { name: 'AI Coding 工具', value: 'Claude Code (辅助开发)', status: '已使用' }
    ],
    references: [
      { name: 'DeepTutor', url: 'https://github.com/...', license: 'MIT', usage: '界面与工作空间设计参考' },
      { name: 'LangGraph', url: 'https://github.com/langchain-ai/langgraph', license: 'MIT', usage: '多 Agent 工作流编排' },
      { name: 'ChromaDB', url: 'https://github.com/chroma-core/chroma', license: 'Apache-2.0', usage: '向量检索与知识库' },
      { name: 'BGE-M3', url: 'https://huggingface.co/BAAI/bge-m3', license: 'MIT', usage: '文档 Embedding' },
      { name: 'SeeDance', url: 'https://github.com/...', license: 'Apache-2.0', usage: '多模态视频生成参考' }
    ],
    lastUpdated: '2026-06-03T00:00:00Z'
  };
})();
