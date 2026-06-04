/* Mock: 练习题 */
(function () {
  ZHIXUE_MOCK.quiz = {
    id: 'quiz-001',
    title: '循环嵌套执行次数',
    description: '下面代码中，print 一共会执行几次？',
    code: 'for i in range(3):\n    for j in range(2):\n        print(i, j)',
    options: [
      { key: 'A', text: '3 次' },
      { key: 'B', text: '5 次' },
      { key: 'C', text: '6 次' },
      { key: 'D', text: '9 次' }
    ],
    correctAnswer: 'C',
    analysis: '正确思路是外层 3 次，内层每轮 2 次，总共 3 × 2 = 6 次。如果只数外层循环会误以为 3 次，把内外层执行次数混淆会得到 9 次。',
    difficulty: 'medium',
    tags: ['循环嵌套', '执行次数'],
    knowledgePoints: ['for 循环', '嵌套循环']
  };

  // 题库（多题型）
  ZHIXUE_MOCK.quizBank = [
    ZHIXUE_MOCK.quiz,
    {
      id: 'quiz-002',
      quizType: 'choice',
      title: '函数返回值判断',
      description: '下面代码的输出是什么？',
      code: 'def add(a, b=5):\n    return a + b\n\nprint(add(3))',
      options: [
        { key: 'A', text: '3' },
        { key: 'B', text: '5' },
        { key: 'C', text: '8' },
        { key: 'D', text: '报错' }
      ],
      correctAnswer: 'C',
      analysis: '函数 add 第二个参数有默认值 5，调用 add(3) 时 a=3, b=5，返回 8。',
      difficulty: 'easy',
      tags: ['函数', '默认参数'],
      knowledgePoints: ['函数参数', '默认参数']
    },
    {
      id: 'quiz-003',
      quizType: 'fill',
      title: '循环次数填空',
      description: '下面代码执行后，变量 count 的值是多少？',
      code: 'count = 0\nfor i in range(1, 5):\n    count += i\n# count = ?',
      options: [],
      correctAnswer: '10',
      analysis: 'range(1,5) 产生 1,2,3,4，累加后 count=1+2+3+4=10。',
      difficulty: 'medium',
      tags: ['for循环', '累加'],
      knowledgePoints: ['for 循环', 'range 函数']
    },
    {
      id: 'quiz-004',
      quizType: 'code',
      title: '编写统计函数',
      description: '编写函数 count_even(lst)，接收整数列表，返回其中偶数的个数。',
      code: 'def count_even(lst):\n    # 请补全代码\n    pass\n\n# 测试用例\nprint(count_even([1, 2, 3, 4, 5, 6]))  # 期望输出: 3',
      options: [],
      correctAnswer: 'count = 0\nfor n in lst:\n    if n % 2 == 0:\n        count += 1\nreturn count',
      analysis: '遍历列表每个元素，判断是否能被 2 整除，用计数器统计。注意需要初始化 count=0 并在循环结束后 return。',
      difficulty: 'hard',
      tags: ['函数', '循环', '列表'],
      knowledgePoints: ['函数定义', 'for 循环', '条件判断', '列表遍历']
    }
  ];
})();
