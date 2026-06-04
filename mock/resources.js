/* Mock: 学习资源 */
(function () {
  ZHIXUE_MOCK.resources = [
    {
      id: 'lecture',
      type: '讲义',
      title: '循环结构考前复习讲义',
      description: '面向期末复习的个性化讲义',
      tags: ['循环', '复习', '期末考试'],
      difficulty: 'medium',
      body: '\n      <h2>循环结构考前复习讲义</h2>\n      <p>本讲义围绕 for 循环、while 循环和循环嵌套展开，重点解决"执行次数数不清"和"变量更新位置混乱"的问题。</p>\n      <ul>\n        <li>先判断循环变量的初始值、终止条件和更新方式。</li>\n        <li>嵌套循环中，内层循环会在外层每一轮里完整执行。</li>\n        <li>遇到循环嵌套题，建议先画出 i、j、count 的逐步执行表。</li>\n      </ul>\n    ',
      createdAt: '2026-06-03T08:01:00Z'
    },
    {
      id: 'quizset',
      type: '练习',
      title: '分层练习题',
      description: '基础题、进阶题、代码题',
      tags: ['for循环', 'while循环', '嵌套'],
      difficulty: 'mixed',
      body: '\n      <h2>分层练习题</h2>\n      <ul>\n        <li><strong>基础题：</strong>判断 range(1, 6) 的循环次数。</li>\n        <li><strong>进阶题：</strong>分析双重循环中 print 的执行次数。</li>\n        <li><strong>代码题：</strong>编写函数统计列表中偶数个数。</li>\n        <li><strong>易错题：</strong>函数默认参数与实参传递。</li>\n      </ul>\n    ',
      createdAt: '2026-06-03T08:02:00Z'
    },
    {
      id: 'code',
      type: '代码',
      title: '代码案例',
      description: '循环嵌套执行次数示例',
      tags: ['循环嵌套', '执行次数', '调试'],
      difficulty: 'medium',
      body: '\n      <h2>代码案例</h2>\n      <pre class="code-block"><code>count = 0\nfor i in range(3):\n    for j in range(2):\n        count += 1\n        print(i, j, count)\n\nprint("总执行次数:", count)</code></pre>\n    ',
      createdAt: '2026-06-03T08:03:00Z'
    },
    {
      id: 'mindmap',
      type: '导图',
      title: '思维导图',
      description: '知识点关系与复习顺序',
      tags: ['复习', '知识结构'],
      difficulty: 'easy',
      body: '\n      <h2>思维导图</h2>\n      <div class="mindmap-list">\n        <div class="mind-node"><strong>Python 期末复习</strong></div>\n        <div class="mind-node">循环结构：for、while、break、continue</div>\n        <div class="mind-node">循环嵌套：外层控制轮次，内层完整执行</div>\n        <div class="mind-node">函数：参数、返回值、作用域</div>\n        <div class="mind-node">综合练习：循环 + 函数 + 列表</div>\n      </div>\n    ',
      createdAt: '2026-06-03T08:04:00Z'
    },
    {
      id: 'reading',
      type: '阅读',
      title: '拓展阅读',
      description: '课程资料与实验资源',
      tags: ['课件', '实验', '参考'],
      difficulty: 'easy',
      body: '\n      <h2>拓展阅读</h2>\n      <ul>\n        <li>课程课件：第 4 章循环结构</li>\n        <li>实验指导：实验 4-2 成绩批量处理</li>\n        <li>易错题库：循环边界与函数返回值专题</li>\n      </ul>\n    ',
      createdAt: '2026-06-03T08:05:00Z'
    }
  ];
})();
