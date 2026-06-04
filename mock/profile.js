/* Mock: 学生画像 */
(function () {
  ZHIXUE_MOCK.profile = {
    id: 'prof-001',
    student: {
      major: '计算机科学与技术',
      year: 2,
      baseLevel: 'Python 基础一般，能写简单语法',
      goal: '准备期末考试，快速补齐核心薄弱点'
    },
    diagnosis: {
      weaknesses: ['循环嵌套', '函数参数', '边界条件'],
      strengths: ['基础语法', '简单数据类型操作'],
      learningStyle: '案例驱动，适合逐步推演',
      resourcePreference: ['代码示例', '分层练习', '错因反馈']
    },
    mastery: {
      循环: 45,
      函数: 40,
      列表: 70,
      基础语法: 85,
      文件操作: 30
    },
    createdAt: '2026-06-03T08:00:00Z',
    updatedAt: '2026-06-03T08:00:00Z'
  };

  // 兼容旧代码的卡片数组格式
  ZHIXUE_MOCK.profileCards = [
    ['专业年级', '计算机科学与技术 · 大二'],
    ['基础水平', 'Python 基础一般，能写简单语法'],
    ['学习目标', '准备期末考试，快速补齐核心薄弱点'],
    ['薄弱知识点', '循环嵌套、函数参数、边界条件'],
    ['学习风格', '案例驱动，适合逐步推演'],
    ['资源偏好', '代码示例、分层练习、错因反馈']
  ];
})();
