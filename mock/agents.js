/* Mock: Agent 协作 — 对齐后端 agent_runs / agent_steps 表结构 */
(function () {
  /* ---- Agent 定义（元数据） ---- */
  ZHIXUE_MOCK.agents = [
    {
      id: 'agent-diag',
      avatar: '诊',
      name: '学情诊断 Agent',
      description: '抽取学生画像，识别目标、基础、薄弱点和资源偏好。',
      role: 'diagnosis',
      status: 'ready',
      duration: '2s',
      steps: [
        { stepId: 'step-diag-1', name: '分析输入文本', order: 1 },
        { stepId: 'step-diag-2', name: '识别知识点', order: 2 },
        { stepId: 'step-diag-3', name: '生成学生画像', order: 3 }
      ]
    },
    {
      id: 'agent-retv',
      avatar: '检',
      name: '知识检索 Agent',
      description: '检索 Python 课程知识库，命中循环结构、函数和实验资源。',
      role: 'retrieval',
      status: 'ready',
      duration: '1.5s',
      steps: [
        { stepId: 'step-retv-1', name: '查询向量库', order: 1 },
        { stepId: 'step-retv-2', name: '匹配知识点', order: 2 },
        { stepId: 'step-retv-3', name: '返回相关资源', order: 3 }
      ]
    },
    {
      id: 'agent-lect',
      avatar: '讲',
      name: '讲义生成 Agent',
      description: '生成个性化复习讲义和知识点解释。',
      role: 'lecture',
      status: 'ready',
      duration: '3s',
      steps: [
        { stepId: 'step-lect-1', name: '分析薄弱点', order: 1 },
        { stepId: 'step-lect-2', name: '组织讲义结构', order: 2 },
        { stepId: 'step-lect-3', name: '生成内容', order: 3 }
      ]
    },
    {
      id: 'agent-quiz',
      avatar: '题',
      name: '题目生成 Agent',
      description: '生成分层练习题和答案解析。',
      role: 'quiz_gen',
      status: 'ready',
      duration: '3s',
      steps: [
        { stepId: 'step-quiz-1', name: '匹配难度等级', order: 1 },
        { stepId: 'step-quiz-2', name: '生成题目', order: 2 },
        { stepId: 'step-quiz-3', name: '编写解析', order: 3 }
      ]
    },
    {
      id: 'agent-path',
      avatar: '路',
      name: '路径规划 Agent',
      description: '根据错因和画像推荐下一步学习任务。',
      role: 'path_planner',
      status: 'ready',
      duration: '2s',
      steps: [
        { stepId: 'step-path-1', name: '分析错因', order: 1 },
        { stepId: 'step-path-2', name: '计算优先级', order: 2 },
        { stepId: 'step-path-3', name: '生成学习路径', order: 3 }
      ]
    }
  ];

  /* ---- Agent 运行记录（对齐 agent_runs 表） ---- */
  ZHIXUE_MOCK.agentRun = {
    run_id: 'run-20260603-001',         // 原 sessionId
    run_type: 'resource_generation',     // 运行类型
    user_id: 'user-demo-001',
    course_id: 'course-python-001',
    status: 'running',                   // 原 overallStatus
    input_json: {
      profile_id: 'prof-001',
      course: 'Python 程序设计',
      diagnosis: '我 Python 基础一般，循环和函数不太会，想准备期末考试。'
    },
    output_json: null,                   // 运行完成后填充
    agents: [
      { id: 'agent-diag', status: 'done',    duration: '2.1s', output: '已生成学生画像，识别薄弱点：循环嵌套、函数返回值', stepIds: ['step-diag-1', 'step-diag-2', 'step-diag-3'] },
      { id: 'agent-retv', status: 'done',    duration: '1.3s', output: '命中 5 个知识点，检索到 8 条相关文档片段',           stepIds: ['step-retv-1', 'step-retv-2', 'step-retv-3'] },
      { id: 'agent-lect', status: 'done',    duration: '3.2s', output: '已生成复习讲义：循环结构与函数参数精讲',               stepIds: ['step-lect-1', 'step-lect-2', 'step-lect-3'] },
      { id: 'agent-quiz', status: 'running', duration: '-',    output: '',                                                      stepIds: ['step-quiz-1', 'step-quiz-2', 'step-quiz-3'] },
      { id: 'agent-path', status: 'ready',   duration: '-',    output: '',                                                      stepIds: ['step-path-1', 'step-path-2', 'step-path-3'] }
    ],
    started_at: '2026-06-03T08:00:00Z',  // 原 startedAt
    completed_at: null,                  // 原 completedAt
    finished_at: null,
    error_message: null
  };

  /* ---- Agent 步骤详情（对齐 agent_steps 表） ---- */
  ZHIXUE_MOCK.agentSteps = [
    // 学情诊断 Agent 的 3 个步骤
    {
      step_id: 'step-diag-1', run_id: 'run-20260603-001', agent_id: 'agent-diag',
      agent_name: '学情诊断 Agent', step_order: 1,
      status: 'done', input_summary: '学生自然语言输入', output_summary: '已分词并提取关键信息',
      duration_ms: 800, started_at: '2026-06-03T08:00:00Z', finished_at: '2026-06-03T08:00:00.800Z',
      error_message: null
    },
    {
      step_id: 'step-diag-2', run_id: 'run-20260603-001', agent_id: 'agent-diag',
      agent_name: '学情诊断 Agent', step_order: 2,
      status: 'done', input_summary: '分词结果', output_summary: '识别出 4 个知识点：循环、函数、列表、文件操作',
      duration_ms: 600, started_at: '2026-06-03T08:00:00.800Z', finished_at: '2026-06-03T08:00:01.400Z',
      error_message: null
    },
    {
      step_id: 'step-diag-3', run_id: 'run-20260603-001', agent_id: 'agent-diag',
      agent_name: '学情诊断 Agent', step_order: 3,
      status: 'done', input_summary: '知识点列表', output_summary: '{"weak_points":["循环嵌套","函数返回值"],"level":"基础一般","goal":"期末复习"}',
      duration_ms: 700, started_at: '2026-06-03T08:00:01.400Z', finished_at: '2026-06-03T08:00:02.100Z',
      error_message: null
    },
    // 知识检索 Agent 的 3 个步骤
    {
      step_id: 'step-retv-1', run_id: 'run-20260603-001', agent_id: 'agent-retv',
      agent_name: '知识检索 Agent', step_order: 1,
      status: 'done', input_summary: '薄弱点：循环嵌套、函数返回值', output_summary: '向量检索完成，Top-20 召回',
      duration_ms: 500, started_at: '2026-06-03T08:00:02.100Z', finished_at: '2026-06-03T08:00:02.600Z',
      error_message: null
    },
    {
      step_id: 'step-retv-2', run_id: 'run-20260603-001', agent_id: 'agent-retv',
      agent_name: '知识检索 Agent', step_order: 2,
      status: 'done', input_summary: 'Top-20 文档片段', output_summary: '匹配到 for/while/函数参数/返回值/嵌套 5 个知识点',
      duration_ms: 400, started_at: '2026-06-03T08:00:02.600Z', finished_at: '2026-06-03T08:00:03.000Z',
      error_message: null
    },
    {
      step_id: 'step-retv-3', run_id: 'run-20260603-001', agent_id: 'agent-retv',
      agent_name: '知识检索 Agent', step_order: 3,
      status: 'done', input_summary: '5 个匹配知识点', output_summary: '返回 8 条相关文档片段及来源章节',
      duration_ms: 400, started_at: '2026-06-03T08:00:03.000Z', finished_at: '2026-06-03T08:00:03.400Z',
      error_message: null
    },
    // 讲义生成 Agent 的 3 个步骤
    {
      step_id: 'step-lect-1', run_id: 'run-20260603-001', agent_id: 'agent-lect',
      agent_name: '讲义生成 Agent', step_order: 1,
      status: 'done', input_summary: '画像 + 检索结果', output_summary: '确定薄弱点优先级：循环嵌套 > 函数返回值',
      duration_ms: 1200, started_at: '2026-06-03T08:00:03.400Z', finished_at: '2026-06-03T08:00:04.600Z',
      error_message: null
    },
    {
      step_id: 'step-lect-2', run_id: 'run-20260603-001', agent_id: 'agent-lect',
      agent_name: '讲义生成 Agent', step_order: 2,
      status: 'done', input_summary: '薄弱点优先级列表', output_summary: '讲义大纲：1.循环复习 2.嵌套执行表 3.函数参数 4.返回值练习',
      duration_ms: 1000, started_at: '2026-06-03T08:00:04.600Z', finished_at: '2026-06-03T08:00:05.600Z',
      error_message: null
    },
    {
      step_id: 'step-lect-3', run_id: 'run-20260603-001', agent_id: 'agent-lect',
      agent_name: '讲义生成 Agent', step_order: 3,
      status: 'done', input_summary: '讲义大纲', output_summary: '已生成完整复习讲义（含思维导图和代码示例）',
      duration_ms: 1000, started_at: '2026-06-03T08:00:05.600Z', finished_at: '2026-06-03T08:00:06.600Z',
      error_message: null
    },
    // 题目生成 Agent 的 3 个步骤（第 1 步完成，第 2 步进行中）
    {
      step_id: 'step-quiz-1', run_id: 'run-20260603-001', agent_id: 'agent-quiz',
      agent_name: '题目生成 Agent', step_order: 1,
      status: 'done', input_summary: '讲义内容 + 知识点列表', output_summary: '难度分布：基础2题、进阶2题、综合1题',
      duration_ms: 900, started_at: '2026-06-03T08:00:06.600Z', finished_at: '2026-06-03T08:00:07.500Z',
      error_message: null
    },
    {
      step_id: 'step-quiz-2', run_id: 'run-20260603-001', agent_id: 'agent-quiz',
      agent_name: '题目生成 Agent', step_order: 2,
      status: 'running', input_summary: '难度分布方案', output_summary: '',
      duration_ms: null, started_at: '2026-06-03T08:00:07.500Z', finished_at: null,
      error_message: null
    },
    {
      step_id: 'step-quiz-3', run_id: 'run-20260603-001', agent_id: 'agent-quiz',
      agent_name: '题目生成 Agent', step_order: 3,
      status: 'ready', input_summary: '', output_summary: '',
      duration_ms: null, started_at: null, finished_at: null,
      error_message: null
    },
    // 路径规划 Agent 的 3 个步骤（全部等待中）
    {
      step_id: 'step-path-1', run_id: 'run-20260603-001', agent_id: 'agent-path',
      agent_name: '路径规划 Agent', step_order: 1,
      status: 'ready', input_summary: '', output_summary: '',
      duration_ms: null, started_at: null, finished_at: null,
      error_message: null
    },
    {
      step_id: 'step-path-2', run_id: 'run-20260603-001', agent_id: 'agent-path',
      agent_name: '路径规划 Agent', step_order: 2,
      status: 'ready', input_summary: '', output_summary: '',
      duration_ms: null, started_at: null, finished_at: null,
      error_message: null
    },
    {
      step_id: 'step-path-3', run_id: 'run-20260603-001', agent_id: 'agent-path',
      agent_name: '路径规划 Agent', step_order: 3,
      status: 'ready', input_summary: '', output_summary: '',
      duration_ms: null, started_at: null, finished_at: null,
      error_message: null
    }
  ];

  /* ---- Agent 事件流（SSE 模拟用，对齐 agent_steps 执行顺序） ---- */
  ZHIXUE_MOCK.agentEvents = [
    { id: 'evt-001', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: 'step-diag-1', type: 'step_start',    data: '开始分析输入文本', timestamp: '2026-06-03T08:00:00.000Z' },
    { id: 'evt-002', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: 'step-diag-1', type: 'step_complete', data: '已分词并提取关键信息（耗时 800ms）', timestamp: '2026-06-03T08:00:00.800Z' },
    { id: 'evt-003', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: 'step-diag-2', type: 'step_start',    data: '开始识别知识点', timestamp: '2026-06-03T08:00:00.800Z' },
    { id: 'evt-004', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: 'step-diag-2', type: 'step_complete', data: '识别出 4 个知识点（耗时 600ms）', timestamp: '2026-06-03T08:00:01.400Z' },
    { id: 'evt-005', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: 'step-diag-3', type: 'step_start',    data: '开始生成学生画像', timestamp: '2026-06-03T08:00:01.400Z' },
    { id: 'evt-006', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: 'step-diag-3', type: 'step_complete', data: '学生画像生成完成（耗时 700ms）', timestamp: '2026-06-03T08:00:02.100Z' },
    { id: 'evt-007', run_id: 'run-20260603-001', agent_id: 'agent-diag', step_id: null,            type: 'agent_complete',data: '学情诊断 Agent 执行完毕', timestamp: '2026-06-03T08:00:02.100Z' },
    { id: 'evt-008', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: 'step-retv-1', type: 'step_start',    data: '开始查询向量库', timestamp: '2026-06-03T08:00:02.100Z' },
    { id: 'evt-009', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: 'step-retv-1', type: 'step_complete', data: 'Top-20 召回（耗时 500ms）', timestamp: '2026-06-03T08:00:02.600Z' },
    { id: 'evt-010', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: 'step-retv-2', type: 'step_start',    data: '开始匹配知识点', timestamp: '2026-06-03T08:00:02.600Z' },
    { id: 'evt-011', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: 'step-retv-2', type: 'step_complete', data: '匹配到 5 个知识点（耗时 400ms）', timestamp: '2026-06-03T08:00:03.000Z' },
    { id: 'evt-012', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: 'step-retv-3', type: 'step_start',    data: '开始返回检索结果', timestamp: '2026-06-03T08:00:03.000Z' },
    { id: 'evt-013', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: 'step-retv-3', type: 'step_complete', data: '返回 8 条文档片段（耗时 400ms）', timestamp: '2026-06-03T08:00:03.400Z' },
    { id: 'evt-014', run_id: 'run-20260603-001', agent_id: 'agent-retv', step_id: null,            type: 'agent_complete',data: '知识检索 Agent 执行完毕', timestamp: '2026-06-03T08:00:03.400Z' },
    { id: 'evt-015', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: 'step-lect-1', type: 'step_start',    data: '开始分析薄弱点', timestamp: '2026-06-03T08:00:03.400Z' },
    { id: 'evt-016', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: 'step-lect-1', type: 'step_complete', data: '薄弱点优先级确定（耗时 1.2s）', timestamp: '2026-06-03T08:00:04.600Z' },
    { id: 'evt-017', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: 'step-lect-2', type: 'step_start',    data: '开始组织讲义结构', timestamp: '2026-06-03T08:00:04.600Z' },
    { id: 'evt-018', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: 'step-lect-2', type: 'step_complete', data: '讲义大纲完成（耗时 1s）', timestamp: '2026-06-03T08:00:05.600Z' },
    { id: 'evt-019', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: 'step-lect-3', type: 'step_start',    data: '开始生成讲义内容', timestamp: '2026-06-03T08:00:05.600Z' },
    { id: 'evt-020', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: 'step-lect-3', type: 'step_complete', data: '完整讲义生成完毕（耗时 1s）', timestamp: '2026-06-03T08:00:06.600Z' },
    { id: 'evt-021', run_id: 'run-20260603-001', agent_id: 'agent-lect', step_id: null,            type: 'agent_complete',data: '讲义生成 Agent 执行完毕', timestamp: '2026-06-03T08:00:06.600Z' },
    // 题目生成 Agent (quiz)
    { id: 'evt-022', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-1', type: 'step_start',    data: '开始匹配难度等级', timestamp: '2026-06-03T08:00:06.600Z' },
    { id: 'evt-023', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-1', type: 'step_complete', data: '难度分布确定：基础2题、进阶2题、综合1题（耗时 900ms）', timestamp: '2026-06-03T08:00:07.500Z' },
    { id: 'evt-024', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-2', type: 'step_start',    data: '开始生成题目', timestamp: '2026-06-03T08:00:07.500Z' },
    { id: 'evt-025', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-2', type: 'step_progress', data: '已生成 3/5 题...', timestamp: '2026-06-03T08:00:08.500Z' },
    { id: 'evt-026', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-2', type: 'step_complete', data: '5 道题目生成完毕（耗时 1.8s）', timestamp: '2026-06-03T08:00:09.300Z' },
    { id: 'evt-027', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-3', type: 'step_start',    data: '开始编写解析', timestamp: '2026-06-03T08:00:09.300Z' },
    { id: 'evt-028', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-3', type: 'step_progress', data: '已完成 3/5 题解析...', timestamp: '2026-06-03T08:00:10.100Z' },
    { id: 'evt-029', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: 'step-quiz-3', type: 'step_complete', data: '全部解析编写完成（耗时 1.5s）', timestamp: '2026-06-03T08:00:10.800Z' },
    { id: 'evt-030', run_id: 'run-20260603-001', agent_id: 'agent-quiz', step_id: null,            type: 'agent_complete',data: '题目生成 Agent 执行完毕，共生成 5 道分层练习题', timestamp: '2026-06-03T08:00:10.800Z' },

    // 路径规划 Agent (path) — 完全覆盖
    { id: 'evt-031', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-1', type: 'step_start',    data: '开始分析错因', timestamp: '2026-06-03T08:00:10.800Z' },
    { id: 'evt-032', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-1', type: 'step_complete', data: '错因分析完成：边界条件错误为主要问题（耗时 700ms）', timestamp: '2026-06-03T08:00:11.500Z' },
    { id: 'evt-033', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-2', type: 'step_start',    data: '开始计算学习优先级', timestamp: '2026-06-03T08:00:11.500Z' },
    { id: 'evt-034', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-2', type: 'step_complete', data: '优先级排序：循环嵌套 > 函数返回值 > 参数传递（耗时 600ms）', timestamp: '2026-06-03T08:00:12.100Z' },
    { id: 'evt-035', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-3', type: 'step_start',    data: '开始生成学习路径', timestamp: '2026-06-03T08:00:12.100Z' },
    { id: 'evt-036', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-3', type: 'step_progress', data: '路径节点规划中...', timestamp: '2026-06-03T08:00:12.600Z' },
    { id: 'evt-037', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: 'step-path-3', type: 'step_complete', data: '学习路径生成完毕：5 个阶段，含资源推送计划（耗时 900ms）', timestamp: '2026-06-03T08:00:13.000Z' },
    { id: 'evt-038', run_id: 'run-20260603-001', agent_id: 'agent-path', step_id: null,            type: 'agent_complete',data: '路径规划 Agent 执行完毕', timestamp: '2026-06-03T08:00:13.000Z' },

    // 整体运行完成
    { id: 'evt-039', run_id: 'run-20260603-001', agent_id: null,         step_id: null,            type: 'run_complete',  data: '全部 Agent 执行完毕，已生成个性化学习资源', timestamp: '2026-06-03T08:00:13.000Z' }
  ];
})();
