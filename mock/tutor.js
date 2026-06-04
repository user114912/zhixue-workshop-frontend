/* Mock: 智能辅导 */
(function () {
  ZHIXUE_MOCK.tutor = {
    sessions: [
      {
        id: 't1',
        question: 'for i in range(3) 中的 i 从几开始？',
        answer: '`i` 从 0 开始，依次取值 0, 1, 2。`range(3)` 生成从 0 到 2 的整数序列，不包括 3。',
        knowledgePoints: ['for 循环', 'range 函数'],
        sourceChapter: '第 4 章 循环结构',
        hasDiagram: false,
        hasVideo: false,
        time: '2026-06-03T10:00:00Z'
      },
      {
        id: 't2',
        question: '嵌套循环的执行次数怎么算？',
        answer: '外层循环次数 × 内层循环次数 = 总执行次数。\n\n例如 `for i in range(3): for j in range(2): print(i,j)`，外层 3 轮，每轮内层 2 次，总共 3×2=6 次。\n\n建议画执行表：\n- i=0: j=0, j=1 (2次)\n- i=1: j=0, j=1 (2次)\n- i=2: j=0, j=1 (2次)',
        knowledgePoints: ['循环嵌套', '执行次数', 'for 循环'],
        sourceChapter: '第 4 章 循环结构',
        hasDiagram: true,
        hasVideo: false,
        time: '2026-06-03T10:15:00Z'
      },
      {
        id: 't3',
        question: '函数里的 return 可以写多个吗？',
        answer: '可以写多个 `return`，但函数遇到第一个 `return` 就会结束执行。\n\n常用于条件分支中返回不同值：\n```python\ndef grade(score):\n    if score >= 60:\n        return "及格"\n    else:\n        return "不及格"\n```\n\n注意：`return` 后面同一缩进级别的代码不会被执行。',
        knowledgePoints: ['函数', 'return', '控制流'],
        sourceChapter: '第 5 章 函数',
        hasDiagram: false,
        hasVideo: false,
        time: '2026-06-03T10:30:00Z'
      }
    ],
    suggestedQuestions: [
      'break 和 continue 有什么区别？',
      '默认参数为什么不能设成可变对象？',
      '怎么用循环处理文件中的数据？'
    ]
  };
})();
