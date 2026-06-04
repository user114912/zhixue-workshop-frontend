/* Mock: 教师端数据 */
(function () {
  ZHIXUE_MOCK.teacher = {
    dashboard: [
      {
        id: 'mastery',
        title: '班级平均掌握度',
        value: '67%',
        change: '+8%',
        changeDirection: 'up',
        description: '较上周提升 8%，循环结构仍需强化。'
      },
      {
        id: 'weakness',
        title: '高频薄弱点',
        value: '循环嵌套',
        count: '18人',
        description: '18 名学生在执行次数题上出错。'
      },
      {
        id: 'resources',
        title: 'AI 资源生成',
        value: '126',
        description: '包含讲义、题目、代码案例和导图。'
      }
    ],

    reviewQueue: [
      {
        id: 'r1',
        title: '循环结构考前复习讲义',
        type: '讲义',
        author: 'AI 生成',
        status: 'pending',
        submittedAt: '2026-06-03T10:00:00Z',
        preview: '本讲义围绕 for 循环、while 循环和循环嵌套展开...'
      },
      {
        id: 'r2',
        title: '函数参数分层练习题',
        type: '练习',
        author: 'AI 生成',
        status: 'pending',
        submittedAt: '2026-06-03T10:05:00Z',
        preview: '包含基础题 5 道、进阶题 3 道、代码题 2 道...'
      },
      {
        id: 'r3',
        title: 'Python 期末思维导图',
        type: '导图',
        author: 'AI 生成',
        status: 'approved',
        submittedAt: '2026-06-03T09:30:00Z',
        preview: '覆盖循环、函数、列表三大模块...'
      },
      {
        id: 'r4',
        title: '文件操作代码案例',
        type: '代码',
        author: 'AI 生成',
        status: 'rejected',
        submittedAt: '2026-06-03T09:00:00Z',
        preview: '读取文件并统计成绩区间...',
        rejectReason: '代码复杂度偏高，不适合当前班级水平'
      }
    ],

    classroom: {
      totalStudents: 32,
      averageMastery: 67,
      distribution: {
        excellent: 5,   // >= 85%
        good: 12,       // 70-84%
        average: 10,    // 50-69%
        struggling: 5   // < 50%
      },
      topWeaknesses: [
        { name: '循环嵌套', count: 18 },
        { name: '函数参数', count: 14 },
        { name: '边界条件', count: 11 },
        { name: '列表推导式', count: 8 }
      ],
      students: [
        { id: 's01', name: '张三', mastery: 85, recentActivity: '完成综合代码题', weakPoints: ['文件操作'] },
        { id: 's02', name: '李四', mastery: 62, recentActivity: '练习函数改错题', weakPoints: ['循环嵌套', '函数参数'] },
        { id: 's03', name: '王五', mastery: 78, recentActivity: '完成循环基础题', weakPoints: ['边界条件'] },
        { id: 's04', name: '赵六', mastery: 45, recentActivity: '查看循环讲义', weakPoints: ['循环嵌套', '函数参数', '列表'] },
        { id: 's05', name: '陈七', mastery: 91, recentActivity: '完成所有练习题', weakPoints: [] }
      ]
    },

    teachingAdvice: {
      title: '下节课教学建议',
      suggestions: [
        '重点讲解循环嵌套的执行步骤推演方法',
        '设计 3-5 道循环嵌套变式题用于课堂练习',
        '对掌握度低于 50% 的学生安排课后辅导'
      ],
      recommendedResources: ['循环嵌套执行表模板', '函数参数速查卡']
    }
  };

  // 兼容旧代码格式
  ZHIXUE_MOCK.teacherCards = [
    ['班级平均掌握度', '67%', '较上周提升 8%，循环结构仍需强化。'],
    ['高频薄弱点', '循环嵌套', '18 名学生在执行次数题上出错。'],
    ['AI 资源生成', '126', '包含讲义、题目、代码案例和导图。']
  ];
})();
