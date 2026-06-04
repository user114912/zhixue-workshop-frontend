/* Mock: 学习路径 */
(function () {
  ZHIXUE_MOCK.paths = [
    {
      order: 1,
      title: '复习 for/while 基础语法',
      description: '完成 2 道基础循环题',
      duration: '20 分钟',
      type: 'review',
      status: 'completed',
      prerequisites: []
    },
    {
      order: 2,
      title: '画循环嵌套执行表',
      description: '推演 i、j、count 的变化',
      duration: '30 分钟',
      type: 'practice',
      status: 'in_progress',
      prerequisites: ['step-1']
    },
    {
      order: 3,
      title: '练习函数参数与返回值',
      description: '完成 3 个函数改错题',
      duration: '25 分钟',
      type: 'practice',
      status: 'pending',
      prerequisites: ['step-2']
    },
    {
      order: 4,
      title: '完成综合代码题',
      description: '写一个成绩区间统计程序',
      duration: '40 分钟',
      type: 'challenge',
      status: 'pending',
      prerequisites: ['step-3']
    }
  ];

  // 兼容旧代码格式
  ZHIXUE_MOCK.pathCards = [
    ['01', '复习 for/while 基础语法', '完成 2 道基础循环题', '20 分钟'],
    ['02', '画循环嵌套执行表', '推演 i、j、count 的变化', '30 分钟'],
    ['03', '练习函数参数与返回值', '完成 3 个函数改错题', '25 分钟'],
    ['04', '完成综合代码题', '写一个成绩区间统计程序', '40 分钟']
  ];
})();
