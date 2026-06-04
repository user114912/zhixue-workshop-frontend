/* Mock: 学习报告 */
(function () {
  ZHIXUE_MOCK.report = {
    id: 'rpt-001',
    studentId: 'prof-001',
    period: '2026-05-28 ~ 2026-06-03',
    overallMastery: 62,
    masteryChange: '+12%',
    summary: '本周重点突破循环嵌套和函数参数，掌握度从 50% 提升至 62%。循环结构进步明显，函数参数仍需加强。',

    quizResults: [
      { id: 'quiz-001', title: '循环嵌套执行次数', score: 100, correct: true, time: '2026-06-03T09:00:00Z' },
      { id: 'quiz-003', title: '循环次数填空', score: 100, correct: true, time: '2026-06-03T09:30:00Z' },
      { id: 'quiz-002', title: '函数返回值判断', score: 0, correct: false, time: '2026-06-03T10:00:00Z' }
    ],

    resourceUsage: [
      { id: 'lecture', title: '循环结构考前复习讲义', timeSpent: '25 分钟', completed: true },
      { id: 'code', title: '代码案例', timeSpent: '15 分钟', completed: true },
      { id: 'mindmap', title: '思维导图', timeSpent: '5 分钟', completed: true }
    ],

    weakPointChanges: [
      { name: '循环嵌套', before: 30, after: 65, change: '+35%' },
      { name: '函数参数', before: 35, after: 50, change: '+15%' },
      { name: '边界条件', before: 40, after: 55, change: '+15%' }
    ],

    profileUpdates: [
      { field: '薄弱知识点', before: '循环嵌套、函数参数、边界条件', after: '函数参数、边界条件、列表推导式', reason: '循环嵌套掌握度提升至 65%，移出薄弱点；新增列表推导式' },
      { field: '掌握度-循环', before: 30, after: 65, reason: '完成复习讲义和 2 道循环题' }
    ],

    nextWeekAdvice: [
      '重点突破函数参数与返回值，建议完成函数改错题 3-5 道',
      '开始学习列表推导式，结合循环知识对比练习',
      '尝试完成综合代码题"成绩区间统计程序"'
    ],

    generatedAt: '2026-06-03T12:00:00Z'
  };
})();
