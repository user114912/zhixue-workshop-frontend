/* ============================================================
   智学工坊 — 学生端页面渲染
   ============================================================ */

(function () {
  'use strict';

  var S = window.ZhixueState;

  /** 标记诊断是否已完成 */
  S.diagnosisCompleted = S.diagnosisCompleted || false;

  /* ---- 学习画像结果页 ---- */

  /** 渲染画像结果页（含未完成诊断保护） */
  function renderProfilePage() {
    if (!S.diagnosisCompleted) {
      // 未完成诊断：显示提示
      var grid = document.getElementById('profilePageGrid');
      if (grid) {
        grid.innerHTML =
          '<div style="text-align:center;padding:40px 20px">' +
          '  <p style="font-size:48px;margin-bottom:16px">🔍</p>' +
          '  <h3 style="margin-bottom:8px">尚未完成画像诊断</h3>' +
          '  <p style="color:var(--muted);font-size:14px;margin-bottom:20px">请先通过对话式诊断构建你的学习画像，再查看完整分析结果。</p>' +
          '  <button class="primary-action" onclick="ZhixueApp.navigate(\'diagnosis\');ZhixuePages.renderDiagnosis();">开始画像诊断 →</button>' +
          '</div>';
      }
      // 隐藏掌握度和更新记录
      var mastery = document.getElementById('profileMasteryChart');
      if (mastery) mastery.innerHTML = '';
      var log = document.getElementById('profileUpdateLog');
      if (log) log.innerHTML = '';
      return;
    }

    // 已完成诊断：正常渲染
    renderProfileGrid('profilePageGrid');
    renderMasteryChart('profileMasteryChart');
    renderProfileUpdateLog();
  }

  /* ---- 学生画像卡片 ---- */
  function renderProfileGrid(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = ZHIXUE_MOCK.profileCards.map(function (pair) {
      return '<div class="profile-card"><span>' + pair[0] + '</span><strong>' + pair[1] + '</strong></div>';
    }).join('');
    var chartId = containerId === 'profileGrid' ? 'masteryChart' : 'profileMasteryChart';
    renderMasteryChart(chartId);
  }

  function renderMasteryChart(chartId) {
    var el = document.getElementById(chartId);
    if (!el) return;
    var mastery = ZHIXUE_MOCK.profile.mastery;
    var entries = Object.keys(mastery).map(function (k) { return { name: k, value: mastery[k] }; });
    entries.sort(function (a, b) { return b.value - a.value; });
    el.innerHTML = entries.map(function (e) {
      var cls = e.value >= 80 ? 'high' : e.value >= 50 ? 'mid' : 'low';
      return '<div class="mastery-row"><span class="mastery-label">' + e.name + '</span><div class="mastery-track"><div class="mastery-fill ' + cls + '" style="width:' + e.value + '%"></div></div><span class="mastery-pct">' + e.value + '%</span></div>';
    }).join('');
  }

  /* ---- 个性化资源 ---- */
  function renderResources() {
    var list = document.getElementById('resourceList');
    if (!list) return;
    var activeResource = S.activeResource;
    list.innerHTML = ZHIXUE_MOCK.resources.map(function (r) {
      var diffBadge = r.difficulty
        ? '<span class="tag" style="background:' + (r.difficulty === 'hard' ? 'var(--amber-soft)' : r.difficulty === 'medium' ? 'var(--blue-soft)' : 'var(--green-soft)') + ';color:' + (r.difficulty === 'hard' ? 'var(--amber)' : r.difficulty === 'medium' ? 'var(--blue)' : 'var(--green)') + ';font-size:10px">' + (S.diffLabels[r.difficulty] || r.difficulty) + '</span>'
        : '';
      var tagHtml = r.tags && r.tags.length
        ? '<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap">' + r.tags.map(function (t) { return '<span class="tag" style="font-size:10px;padding:3px 6px">' + t + '</span>'; }).join('') + '</div>'
        : '';
      return '<button class="resource-item' + (r.id === activeResource ? ' active' : '') + '" data-resource="' + r.id + '"><div style="display:flex;align-items:center;gap:8px"><strong>' + r.title + '</strong>' + diffBadge + '</div><span>' + r.description + '</span>' + tagHtml + '</button>';
    }).join('');

    var current = ZHIXUE_MOCK.resources.find(function (r) { return r.id === activeResource; });
    var reader = document.getElementById('resourceReader');
    if (reader && current) {
      var diffTag = current.difficulty
        ? '<span class="tag" style="margin-left:8px;font-size:12px;background:var(--blue-soft);color:var(--blue)">' + (S.diffLabels[current.difficulty] || current.difficulty) + '</span>'
        : '';
      var readerTags = current.tags && current.tags.length
        ? '<div style="margin-bottom:16px;display:flex;gap:6px;flex-wrap:wrap">' + current.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>'
        : '';

      reader.innerHTML = '<h2>' + current.title + diffTag + '</h2>' + readerTags + current.body;
    }

    list.querySelectorAll('.resource-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        S.activeResource = this.dataset.resource;
        renderResources();
      });
    });

    S.updatePreviewNotice();
  }

  /* ---- 练习测评 ---- */
  function renderQuiz() {
    var card = document.getElementById('quizCard');
    if (!card) return;
    var bank = ZHIXUE_MOCK.quizBank;
    var q = bank[S.currentQuizIndex];
    var total = bank.length;
    var qType = q.quizType || 'choice';

    var answerArea = '';
    if (qType === 'choice') {
      answerArea = '<div class="option-list">' + q.options.map(function (o) {
        return '<label><input type="radio" name="quiz" value="' + o.key + '"> ' + o.key + '. ' + o.text + '</label>';
      }).join('') + '</div>';
    } else if (qType === 'fill') {
      answerArea = '<div class="field" style="margin:16px 0"><label style="font-size:13px;font-weight:700;color:var(--muted);margin-bottom:6px;display:block">输入你的答案</label><input type="text" id="fillAnswer" placeholder="输入答案..." style="width:100%;min-height:42px;padding:0 14px;border:1px solid var(--line);border-radius:10px;font-size:15px;outline:none" /></div>';
    } else if (qType === 'code') {
      answerArea = '<div class="field" style="margin:16px 0"><label style="font-size:13px;font-weight:700;color:var(--muted);margin-bottom:6px;display:block">编写你的代码</label><textarea id="codeAnswer" rows="6" placeholder="在此编写代码..." style="width:100%;padding:14px;border:1px solid var(--line);border-radius:10px;font-family:var(--font-mono);font-size:14px;resize:vertical;outline:none;background:#18202e;color:#f5f8ff"></textarea></div>';
    }

    card.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">' +
        '<span class="tag" style="font-size:11px">' + (S.typeLabels[qType] || qType) + '</span>' +
        '<span style="font-size:12px;color:var(--muted)">' + (S.currentQuizIndex + 1) + ' / ' + total + '</span>' +
      '</div>' +
      '<h2>' + q.title + '</h2><p>' + q.description + '</p>' +
      (q.code ? '<pre class="code-block"><code>' + q.code + '</code></pre>' : '') +
      answerArea +
      '<div style="display:flex;gap:8px;margin-top:16px">' +
        '<button class="primary-action secondary" id="prevQuiz" ' + (S.currentQuizIndex === 0 ? 'disabled' : '') + '>← 上一题</button>' +
        '<button class="primary-action" id="submitQuiz">提交答案</button>' +
        '<button class="primary-action secondary" id="nextQuiz" ' + (S.currentQuizIndex === total - 1 ? 'disabled' : '') + '>下一题 →</button>' +
      '</div>' +
      '<div class="analysis" id="analysis">' +
        '<div class="analysis-header"><strong id="analysisTitle">错因分析</strong></div>' +
        '<p id="analysisBody">' + q.analysis + '</p>' +
        '<div class="analysis-detail" id="analysisDetail" style="display:none">' +
          '<div style="margin-top:8px"><strong style="font-size:12px;color:var(--muted)">关联知识点</strong>' +
            '<div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">' +
              q.knowledgePoints.map(function (kp) { return '<span class="tag">' + kp + '</span>'; }).join('') +
            '</div></div>' +
          '<div style="margin-top:12px"><strong style="font-size:12px;color:var(--muted)">建议补救资源</strong>' +
            '<ul style="margin:4px 0 0 0;padding-left:18px;font-size:13px;color:var(--muted)"><li>重新查看循环结构复习讲义</li><li>完成基础循环题巩固</li></ul>' +
          '</div></div></div>';

    document.getElementById('submitQuiz').addEventListener('click', function () {
      var analysis = document.getElementById('analysis');
      analysis.classList.add('show');
      var isCorrect = false;
      if (qType === 'choice') {
        var sel = card.querySelector('input[name="quiz"]:checked');
        isCorrect = sel && sel.value === q.correctAnswer;
      } else if (qType === 'fill') {
        isCorrect = (document.getElementById('fillAnswer').value || '').trim() === q.correctAnswer;
      } else if (qType === 'code') {
        isCorrect = (document.getElementById('codeAnswer').value || '').length > 0;
      }
      var detail = document.getElementById('analysisDetail');
      var titleEl = document.getElementById('analysisTitle');
      if (isCorrect) {
        analysis.classList.add('correct');
        titleEl.textContent = '✓ 回答正确';
        if (detail) detail.style.display = 'none';
      } else {
        analysis.classList.remove('correct');
        titleEl.textContent = '错因分析 · 概念混淆';
        if (detail) detail.style.display = '';
      }
    });

    document.getElementById('prevQuiz').addEventListener('click', function () {
      if (S.currentQuizIndex > 0) { S.currentQuizIndex--; renderQuiz(); }
    });
    document.getElementById('nextQuiz').addEventListener('click', function () {
      if (S.currentQuizIndex < total - 1) { S.currentQuizIndex++; renderQuiz(); }
    });
  }

  /* ---- 学习路径 ---- */
  function renderPath() {
    var board = document.getElementById('pathBoard');
    if (!board) return;
    var paths = ZHIXUE_MOCK.paths;
    board.innerHTML = '<div class="timeline">' +
      paths.map(function (step, i) {
        var status = step.status || 'pending';
        var icon = S.pathStatusIcons[status] || S.pathStatusIcons.pending;
        var isLast = i === paths.length - 1;
        var typeLabel = step.type === 'review' ? '复习' : step.type === 'practice' ? '练习' : step.type === 'challenge' ? '挑战' : step.type;
        var typeCls = step.type === 'challenge' ? 'background:var(--amber-soft);color:var(--amber)' : step.type === 'practice' ? 'background:var(--blue-soft);color:var(--blue)' : 'background:var(--green-soft);color:var(--green)';
        return '<div class="timeline-row"><div class="timeline-gutter"><div class="timeline-dot" style="' + (status === 'completed' ? 'border-color:var(--green);background:var(--green-soft)' : status === 'in_progress' ? 'border-color:var(--blue);background:var(--blue-soft)' : '') + '">' + icon + '</div>' + (isLast ? '' : '<div class="timeline-line' + (status === 'completed' ? ' completed' : '') + '"></div>') + '</div><div class="timeline-card' + (status === 'in_progress' ? ' active' : '') + '"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span class="tag" style="font-size:10px;' + typeCls + '">' + typeLabel + '</span><span style="font-size:12px;color:var(--muted)">' + step.duration + '</span>' + (status !== 'pending' ? '<span class="status ' + (status === 'completed' ? 'done' : 'running') + '" style="font-size:10px">' + (status === 'completed' ? '已完成' : '进行中') + '</span>' : '') + '</div><h3 style="margin-bottom:4px">' + step.title + '</h3><p style="font-size:14px">' + step.description + '</p></div></div>';
      }).join('') +
    '</div>';
  }

  /* ---- 智能辅导 ---- */
  function renderTutor() {
    var sessions = ZHIXUE_MOCK.tutor.sessions;
    var history = document.getElementById('tutorHistory');
    if (!history) return;
    history.innerHTML = sessions.map(function (s, i) {
      return '<button class="resource-item' + (i === 0 ? ' active' : '') + '" data-tutor="' + i + '"><strong>' + s.question + '</strong><span>' + s.time.split('T')[0] + '</span></button>';
    }).join('');
    renderTutorDetail(sessions[0]);
    history.querySelectorAll('.resource-item').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(this.dataset.tutor);
        history.querySelectorAll('.resource-item').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        renderTutorDetail(sessions[idx]);
      });
    });
  }

  function renderTutorDetail(s) {
    var detail = document.getElementById('tutorDetail');
    if (!detail) return;
    detail.innerHTML =
      '<h2>' + s.question + '</h2>' +
      '<div style="margin-bottom:16px;display:flex;gap:6px;flex-wrap:wrap">' +
        s.knowledgePoints.map(function (kp) { return '<span class="tag">' + kp + '</span>'; }).join('') +
        '<span style="font-size:12px;color:var(--muted);margin-left:auto">来源：' + s.sourceChapter + '</span>' +
      '</div>' +
      '<div style="white-space:pre-line;line-height:1.9;color:var(--ink)">' + s.answer + '</div>' +
      (s.hasDiagram ? '<div class="state-empty" style="margin-top:16px;min-height:120px;background:var(--paper-deep);border-radius:14px"><p>📊 图解说明（后续接入图片生成）</p></div>' : '') +
      (s.hasVideo ? '<div class="state-empty" style="margin-top:16px;min-height:120px;background:var(--paper-deep);border-radius:14px"><p>🎬 短视频讲解（后续接入视频生成）</p></div>' : '') +
      '<div style="margin-top:20px;border-top:1px solid var(--line);padding-top:16px">' +
        '<p style="font-size:13px;color:var(--muted);margin-bottom:8px"><strong>继续提问</strong></p>' +
        ZHIXUE_MOCK.tutor.suggestedQuestions.map(function (q) { return '<button class="quick-btn" style="margin-right:8px;margin-bottom:8px">' + q + '</button>'; }).join('') +
      '</div>';
  }

  /* ---- 学习报告 ---- */
  function renderReport() {
    var el = document.getElementById('reportContent');
    if (!el) return;
    var r = ZHIXUE_MOCK.report;
    el.innerHTML =
      '<div class="teacher-cards" style="margin-bottom:24px">' +
        '<div class="metric-card"><h3>总体掌握度</h3><span class="metric-value">' + r.overallMastery + '% <span class="metric-change up">' + r.masteryChange + '</span></span><p>' + r.period + '</p></div>' +
        '<div class="metric-card"><h3>完成测评</h3><span class="metric-value">' + r.quizResults.length + '</span><p>正确 ' + r.quizResults.filter(function(q){return q.correct;}).length + ' / ' + r.quizResults.length + ' 次</p></div>' +
        '<div class="metric-card"><h3>使用资源</h3><span class="metric-value">' + r.resourceUsage.length + '</span><p>共 ' + r.resourceUsage.filter(function(u){return u.completed;}).length + ' 项已完成</p></div>' +
      '</div>' +
      '<p style="font-size:15px;margin-bottom:20px">' + r.summary + '</p>' +
      '<div class="dashboard-section" style="margin-bottom:16px"><h2>薄弱点变化</h2>' +
        r.weakPointChanges.map(function (w) {
          return '<div class="dist-row"><span class="dist-label">' + w.name + '</span><div class="dist-track"><div class="dist-fill ' + (parseInt(w.after) >= 80 ? 'excellent' : parseInt(w.after) >= 50 ? 'good' : 'average') + '" style="width:' + w.after + '%">' + w.before + '% → ' + w.after + '%</div></div><span class="dist-count" style="color:var(--success)">' + w.change + '</span></div>';
        }).join('') +
      '</div>' +
      '<div class="dashboard-section" style="margin-bottom:16px"><h2>画像更新记录</h2>' +
        r.profileUpdates.map(function (u) {
          return '<div style="padding:10px 0;border-bottom:1px solid var(--line)"><strong>' + u.field + '</strong><br><span style="font-size:13px;color:var(--muted)">' + u.before + ' → ' + u.after + '</span><br><span style="font-size:12px;color:var(--green)">原因：' + u.reason + '</span></div>';
        }).join('') +
      '</div>' +
      '<div class="dashboard-section"><h2>下周学习建议</h2><ul>' +
        r.nextWeekAdvice.map(function (a) { return '<li>' + a + '</li>'; }).join('') +
      '</ul></div>';
  }

  /* ---- 画像更新记录 ---- */
  function renderProfileUpdateLog() {
    var el = document.getElementById('profileUpdateLog');
    if (!el) return;
    var updates = ZHIXUE_MOCK.report && ZHIXUE_MOCK.report.profileUpdates;
    if (!updates || !updates.length) {
      el.innerHTML = '<p style="color:var(--muted)">诊断后自动生成更新记录。</p>';
      return;
    }
    el.innerHTML = updates.map(function (u) {
      return '<div style="padding:10px 0;border-bottom:1px solid var(--line)"><strong>' + u.field + '</strong><br><span style="font-size:13px;color:var(--muted)">' + u.before + ' → ' + u.after + '</span><br><span style="font-size:12px;color:var(--green)">原因：' + u.reason + '</span></div>';
    }).join('');
  }

  /* ---- 画像诊断：一段话生成学习画像 ---- */

  /** 画像维度定义 */
  var PROFILE_DIMENSIONS = [
    { key: 'major',     label: '专业背景',     icon: '🎓' },
    { key: 'course',    label: '当前课程',     icon: '📘' },
    { key: 'baseLevel', label: '知识基础',     icon: '📊' },
    { key: 'weaknesses',label: '薄弱知识点',   icon: '🎯' },
    { key: 'goal',      label: '学习目标',     icon: '🏁' },
    { key: 'learningStyle', label: '学习风格', icon: '💡' },
    { key: 'mistakePatterns', label: '易错点倾向', icon: '⚠️' },
    { key: 'resourcePref', label: '资源偏好',  icon: '📦' },
    { key: 'pace',      label: '学习节奏',     icon: '⏱️' }
  ];

  /** 关键词规则抽取画像 */
  function extractProfileFromText(text) {
    var draft = {};
    var t = text;

    // 专业背景
    if (/软件工程/.test(t)) draft.major = '软件工程';
    else if (/计算机科学|计科|计算机专业/.test(t)) draft.major = '计算机科学与技术';
    else if (/数据科学|大数据/.test(t)) draft.major = '数据科学与大数据技术';
    else if (/人工智能|AI/.test(t)) draft.major = '人工智能';
    else if (/信息管理|信管/.test(t)) draft.major = '信息管理与信息系统';
    else if (/数学|统计/.test(t)) draft.major = '数学与统计';
    else draft.major = '未明确（可在设置中补充）';

    // 当前课程
    if (/python/i.test(t)) draft.course = 'Python 程序设计';
    else if (/java(?!.*script)/i.test(t)) draft.course = 'Java 程序设计';
    else if (/C语言|C\s*语言|C\+\+|C#/.test(t)) draft.course = 'C/C++ 程序设计';
    else if (/数据结构/.test(t)) draft.course = '数据结构';
    else if (/计算机网络|网络原理/.test(t)) draft.course = '计算机网络';
    else if (/操作系统|OS/.test(t)) draft.course = '操作系统';
    else if (/数据库|SQL/i.test(t)) draft.course = '数据库原理';
    else if (/程序设计|编程/.test(t)) draft.course = '程序设计基础';
    else draft.course = '未明确（可在设置中补充）';

    // 知识基础
    if (/基础一般|不太会|比较薄弱|薄弱|刚学|入门|零基础|不会/.test(t)) draft.baseLevel = '基础较弱，需从核心概念补起';
    else if (/学过|有一点|了解|基本掌握|还可以/.test(t)) draft.baseLevel = '有一定基础，需强化与拓展';
    else if (/熟悉|掌握|比较熟练|比较扎实|基础好/.test(t)) draft.baseLevel = '基础较好，适合进阶内容';
    else draft.baseLevel = '待进一步评估';

    // 薄弱知识点
    var wp = [];
    if (/循环|for|while|遍历/i.test(t)) wp.push('循环结构');
    if (/嵌套/.test(t) && /循环/.test(t)) wp.push('循环嵌套');
    if (/函数|def|参数|返回值|return/i.test(t)) wp.push('函数与参数');
    if (/递归/.test(t)) wp.push('递归');
    if (/列表|数组|list/i.test(t)) wp.push('列表/数组');
    if (/字典|哈希|dict/i.test(t)) wp.push('字典');
    if (/文件|IO|读写/.test(t)) wp.push('文件操作');
    if (/面向对象|类|class|继承|多态/.test(t)) wp.push('面向对象');
    if (/排序|查找|算法/.test(t)) wp.push('算法基础');
    if (/异常|错误处理|try/.test(t)) wp.push('异常处理');
    draft.weaknesses = wp.length > 0 ? wp.join('、') : '未明确';

    // 学习目标
    if (/期末|考试|测验|备考/.test(t)) draft.goal = '准备考试';
    else if (/项目|实践|作品|demo/i.test(t)) draft.goal = '完成课程项目/实践';
    else if (/基础|入门|初学|补课/.test(t)) draft.goal = '夯实基础';
    else if (/考研/.test(t)) draft.goal = '考研复习';
    else if (/竞赛|比赛|ACM|蓝桥/.test(t)) draft.goal = '竞赛准备';
    else if (/面试|找工作|求职/.test(t)) draft.goal = '求职面试准备';
    else draft.goal = '综合提升编程能力';

    // 学习风格
    var styles = [];
    if (/练习|题目|做题|练一练|刷题/.test(t)) styles.push('练习驱动');
    if (/代码|示例|案例|看代码|敲代码/.test(t)) styles.push('代码示例优先');
    if (/视频|讲解|听课/.test(t)) styles.push('视频讲解');
    if (/讲义|文档|笔记|看书/.test(t)) styles.push('讲义阅读');
    if (/项目|实践|动手/.test(t)) styles.push('项目实践');
    draft.learningStyle = styles.length > 0 ? styles.join('、') : '综合多元学习';

    // 易错点倾向
    var errs = [];
    if (/数错|次数|边界|条件/.test(t)) errs.push('循环边界条件判断');
    if (/缩进|indent/i.test(t)) errs.push('缩进与代码格式');
    if (/返回值|return/.test(t)) errs.push('函数返回值理解');
    if (/作用域|变量范围/.test(t)) errs.push('变量作用域');
    if (/类型|type/i.test(t)) errs.push('数据类型理解');
    if (/索引|下标/.test(t)) errs.push('索引越界');
    draft.mistakePatterns = errs.length > 0 ? errs.join('、') : '待学习数据积累后分析';

    // 资源偏好
    var prefs = [];
    if (/讲义|文档|笔记|课件/.test(t)) prefs.push('讲义文档');
    if (/题目|练习|题库/.test(t)) prefs.push('分层练习题');
    if (/代码|示例|案例/.test(t)) prefs.push('代码示例');
    if (/思维导图|导图/.test(t)) prefs.push('思维导图');
    if (/视频|动画/.test(t)) prefs.push('视频/动画');
    if (/项目|实践/.test(t)) prefs.push('项目材料');
    draft.resourcePref = prefs.length > 0 ? prefs.join('、') : '综合资源（讲义+练习+示例）';

    // 学习节奏
    if (/30分钟|半小时|快速|短时间|碎片/.test(t)) draft.pace = '短任务分段推进（15-30分钟/节）';
    else if (/长时间|深入|系统|全面/.test(t)) draft.pace = '深度系统学习（1-2小时/次）';
    else if (/随时|不定|空闲/.test(t)) draft.pace = '灵活安排，随时可学';
    else draft.pace = '适中节奏（约45分钟/次）';

    return draft;
  }

  /** 渲染画像草稿卡片 */
  function renderDraftCards(draft) {
    return PROFILE_DIMENSIONS.map(function (dim) {
      var value = draft[dim.key] || '未识别';
      return '<div class="diag-draft-card">' +
        '<div class="card-icon">' + dim.icon + '</div>' +
        '<div class="card-label">' + dim.label + '</div>' +
        '<div class="card-value">' + value + '</div>' +
      '</div>';
    }).join('');
  }

  /** 生成学习画像（主函数） */
  function generateProfile() {
    var input = document.getElementById('diagnosisInput');
    var text = input.value.trim();

    // 清空之前的提示
    var oldToast = document.querySelector('.diag-toast');
    if (oldToast) oldToast.remove();

    // 校验
    if (!text) {
      showToast('请先描述你的学习情况或目标', 'warn');
      return;
    }
    if (text.length < 8) {
      showToast('内容过短，可以补充课程、目标或薄弱点，画像会更准确', 'warn');
      return;
    }

    // 抽取画像
    var draft = extractProfileFromText(text);
    S._diagnosisDraft = draft;
    S.diagnosisCompleted = true;

    // 渲染结果
    var resultEl = document.getElementById('diagnosisResult');
    var draftEl = document.getElementById('diagnosisDraftContent');
    if (resultEl) resultEl.style.display = '';
    if (draftEl) draftEl.innerHTML = renderDraftCards(draft);

    // 滚动到结果区
    if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /** 提示条 */
  function showToast(msg, type) {
    var panel = document.querySelector('.diagnosis-panel');
    if (!panel) return;
    var toast = document.createElement('div');
    toast.className = 'diag-toast ' + (type || 'warn');
    toast.textContent = msg;
    panel.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 4000);
  }

  /** 初始化诊断页面 */
  function renderDiagnosis() {

    // 清空输入框
    var input = document.getElementById('diagnosisInput');
    if (input) input.value = '';

    // 隐藏结果区
    var resultEl = document.getElementById('diagnosisResult');
    if (resultEl) resultEl.style.display = 'none';

    // 如果已有草稿，恢复展示
    if (S._diagnosisDraft && S.diagnosisCompleted) {
      if (resultEl) resultEl.style.display = '';
      var draftEl = document.getElementById('diagnosisDraftContent');
      if (draftEl) draftEl.innerHTML = renderDraftCards(S._diagnosisDraft);
    }
  }

  // 暴露
  window.ZhixuePages = window.ZhixuePages || {};
  window.ZhixuePages.renderDiagnosis = renderDiagnosis;
  window.ZhixuePages.generateProfile = generateProfile;
  window.ZhixuePages.renderProfilePage = renderProfilePage;
  window.ZhixuePages.renderProfileGrid = renderProfileGrid;
  window.ZhixuePages.renderMasteryChart = renderMasteryChart;
  window.ZhixuePages.renderProfileUpdateLog = renderProfileUpdateLog;
  window.ZhixuePages.renderResources = renderResources;
  window.ZhixuePages.renderQuiz = renderQuiz;
  window.ZhixuePages.renderPath = renderPath;
  window.ZhixuePages.renderTutor = renderTutor;
  window.ZhixuePages.renderReport = renderReport;
})();
