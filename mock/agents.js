/* Mock: Agent 协作 */
(function () {
  ZHIXUE_MOCK.agents = [
    {
      id: 'agent-diag',
      avatar: '诊',
      name: '学情诊断 Agent',
      description: '抽取学生画像，识别目标、基础、薄弱点和资源偏好。',
      role: 'diagnosis',
      status: 'ready',
      duration: '2s',
      steps: ['分析输入文本', '识别知识点', '生成学生画像']
    },
    {
      id: 'agent-retv',
      avatar: '检',
      name: '知识检索 Agent',
      description: '检索 Python 课程知识库，命中循环结构、函数和实验资源。',
      role: 'retrieval',
      status: 'ready',
      duration: '1.5s',
      steps: ['查询向量库', '匹配知识点', '返回相关资源']
    },
    {
      id: 'agent-lect',
      avatar: '讲',
      name: '讲义生成 Agent',
      description: '生成个性化复习讲义和知识点解释。',
      role: 'lecture',
      status: 'ready',
      duration: '3s',
      steps: ['分析薄弱点', '组织讲义结构', '生成内容']
    },
    {
      id: 'agent-quiz',
      avatar: '题',
      name: '题目生成 Agent',
      description: '生成分层练习题和答案解析。',
      role: 'quiz_gen',
      status: 'ready',
      duration: '3s',
      steps: ['匹配难度等级', '生成题目', '编写解析']
    },
    {
      id: 'agent-path',
      avatar: '路',
      name: '路径规划 Agent',
      description: '根据错因和画像推荐下一步学习任务。',
      role: 'path_planner',
      status: 'ready',
      duration: '2s',
      steps: ['分析错因', '计算优先级', '生成学习路径']
    }
  ];

  // 模拟一次运行记录
  ZHIXUE_MOCK.agentRun = {
    sessionId: 'run-20260603-001',
    agents: [
      { id: 'agent-diag', status: 'done', duration: '2.1s', output: '已生成学生画像' },
      { id: 'agent-retv', status: 'done', duration: '1.3s', output: '命中 5 个知识点' },
      { id: 'agent-lect', status: 'done', duration: '3.2s', output: '已生成复习讲义' },
      { id: 'agent-quiz', status: 'running', duration: '-', output: '' },
      { id: 'agent-path', status: 'ready', duration: '-', output: '' }
    ],
    startedAt: '2026-06-03T08:00:00Z',
    overallStatus: 'running'
  };
})();
