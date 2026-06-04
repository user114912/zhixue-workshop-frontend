/* ============================================================
   智学工坊 — 学生端页面渲染
   ============================================================ */

(function () {
  'use strict';

  var S = window.ZhixueState;

  /* ---- 学生画像 ---- */
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

  // 暴露
  window.ZhixuePages = window.ZhixuePages || {};
  window.ZhixuePages.renderProfileGrid = renderProfileGrid;
  window.ZhixuePages.renderMasteryChart = renderMasteryChart;
  window.ZhixuePages.renderResources = renderResources;
  window.ZhixuePages.renderQuiz = renderQuiz;
  window.ZhixuePages.renderPath = renderPath;
  window.ZhixuePages.renderTutor = renderTutor;
  window.ZhixuePages.renderReport = renderReport;
})();
