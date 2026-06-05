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
    },
    {
      id: 'video',
      type: '视频',
      title: '多模态教学视频/动画',
      description: '循环嵌套执行过程动画',
      tags: ['循环嵌套', '动画', '可视化'],
      difficulty: 'easy',
      body: '\n      <h2>多模态教学视频/动画</h2>\n      <div class="state-empty" style="min-height:200px;background:var(--paper-deep);border-radius:14px;display:flex;align-items:center;justify-content:center;flex-direction:column">\n        <p style="font-size:48px;margin-bottom:8px">🎬</p>\n        <p>循环嵌套执行过程动画演示</p>\n        <p style="font-size:12px;color:var(--muted)">基于 SeeDance 生成 · 时长 2:30</p>\n        <button class="primary-action secondary" style="margin-top:12px">▶ 播放动画</button>\n      </div>\n      <ul style="margin-top:16px">\n        <li>for 循环单步执行可视化</li>\n        <li>双重嵌套循环执行轨迹</li>\n        <li>变量值实时追踪</li>\n      </ul>\n    ',
      createdAt: '2026-06-03T08:06:00Z'
    },
    {
      id: 'ppt',
      type: 'PPT',
      title: 'PPT 课件',
      description: '循环结构考前复习课件',
      tags: ['PPT', '复习', '课件'],
      difficulty: 'easy',
      body: '\n      <h2>PPT 课件</h2>\n      <div class="state-empty" style="min-height:160px;background:var(--paper-deep);border-radius:14px;display:flex;align-items:center;justify-content:center;flex-direction:column">\n        <p style="font-size:36px;margin-bottom:8px">📊</p>\n        <p>循环结构考前复习课件（12 页）</p>\n        <p style="font-size:12px;color:var(--muted)">包含章节概要、知识导图、典型例题和易错点总结</p>\n        <button class="primary-action secondary" style="margin-top:12px">⬇ 下载 PPT</button>\n      </div>\n    ',
      createdAt: '2026-06-03T08:07:00Z'
    },
    {
      id: 'project',
      type: '项目',
      title: '实践项目学习材料',
      description: '成绩管理与分析系统',
      tags: ['项目', '综合', '实战'],
      difficulty: 'hard',
      body: '\n      <h2>实践项目学习材料</h2>\n      <h3>成绩管理与分析系统</h3>\n      <p>综合运用循环、函数、列表、文件操作等知识，完成一个完整的成绩管理系统。</p>\n      <ul>\n        <li><strong>阶段一：</strong>实现成绩录入与存储（列表 + 循环）</li>\n        <li><strong>阶段二：</strong>成绩统计与分析（函数 + 排序）</li>\n        <li><strong>阶段三：</strong>数据持久化（文件读写）</li>\n        <li><strong>阶段四：</strong>生成成绩报告（格式化输出）</li>\n      </ul>\n      <div class="preview-notice" style="margin-top:16px">💡 项目包含完整的实验指导书、代码框架和评分标准。</div>\n    ',
      createdAt: '2026-06-03T08:08:00Z'
    }
  ];
})();
