/* Mock: 课程知识库 */
(function () {
  ZHIXUE_MOCK.knowledge = {
    courseName: 'Python 程序设计',
    chapters: [
      {
        id: 'ch-01',
        title: '第 1 章 Python 基础',
        tags: ['变量', '数据类型', '输入输出'],
        resourceCount: 3,
        indexed: true
      },
      {
        id: 'ch-04',
        title: '第 4 章 循环结构',
        tags: ['for 循环', 'while 循环', '循环嵌套', 'break/continue'],
        resourceCount: 5,
        indexed: true
      },
      {
        id: 'ch-05',
        title: '第 5 章 函数',
        tags: ['参数', '返回值', '作用域', '默认参数'],
        resourceCount: 4,
        indexed: true
      },
      {
        id: 'ch-lab',
        title: '实验案例',
        tags: ['成绩统计', '文件批处理', '数据可视化入门'],
        resourceCount: 3,
        indexed: false
      }
    ],
    totalResources: 15,
    indexedResources: 12,
    uploadedAt: '2026-06-01T00:00:00Z',
    lastIndexedAt: '2026-06-02T10:00:00Z'
  };

  // 兼容旧代码格式
  ZHIXUE_MOCK.chapterCards = [
    ['第 1 章 Python 基础', ['变量', '数据类型', '输入输出']],
    ['第 4 章 循环结构', ['for 循环', 'while 循环', '循环嵌套', 'break/continue']],
    ['第 5 章 函数', ['参数', '返回值', '作用域', '默认参数']],
    ['实验案例', ['成绩统计', '文件批处理', '数据可视化入门']]
  ];
})();
