/* ============================================================
   智学工坊 — 教师端页面渲染
   ============================================================ */

(function () {
  'use strict';

  /* ---- 分布图 ---- */
  function renderDistributionChart() {
    var el = document.getElementById('distributionChart');
    if (!el) return;
    var dist = ZHIXUE_MOCK.teacher.classroom.distribution;
    var total = ZHIXUE_MOCK.teacher.classroom.totalStudents;
    var items = [
      { key: 'excellent', label: '优秀', value: dist.excellent, cls: 'excellent', desc: '≥85%' },
      { key: 'good', label: '良好', value: dist.good, cls: 'good', desc: '70-84%' },
      { key: 'average', label: '一般', value: dist.average, cls: 'average', desc: '50-69%' },
      { key: 'struggling', label: '困难', value: dist.struggling, cls: 'struggling', desc: '<50%' }
    ];
    el.innerHTML = items.map(function (item) {
      var pct = total > 0 ? Math.round(item.value / total * 100) : 0;
      return '<div class="dist-row"><span class="dist-label">' + item.label + '</span><div class="dist-track"><div class="dist-fill ' + item.cls + '" style="width:' + Math.max(pct, 8) + '%">' + (pct >= 10 ? item.desc : '') + '</div></div><span class="dist-count">' + item.value + '人</span></div>';
    }).join('');
  }

  /* ---- 教师看板 ---- */
  function renderDashboard() {
    var m = ZHIXUE_MOCK.teacher.dashboard;
    var el = document.getElementById('dashboardCards');
    if (el) {
      el.innerHTML = m.map(function (d) {
        var ch = d.change ? ' <span class="metric-change ' + (d.changeDirection || 'up') + '">' + d.change + '</span>' : '';
        return '<div class="metric-card"><h3>' + d.title + '</h3><span class="metric-value">' + d.value + ch + '</span><p>' + (d.count ? d.count + ' · ' : '') + d.description + '</p></div>';
      }).join('');
    }
    renderDistributionChart();
    var wl = document.getElementById('weaknessList');
    if (wl) {
      wl.innerHTML = ZHIXUE_MOCK.teacher.classroom.topWeaknesses.map(function (w) {
        return '<div class="weakness-item"><span class="weakness-name">' + w.name + '</span><span class="weakness-count">' + w.count + ' 名学生</span></div>';
      }).join('');
    }
    var ta = document.getElementById('teachingAdvice');
    if (ta) {
      var a = ZHIXUE_MOCK.teacher.teachingAdvice;
      ta.innerHTML = '<ul>' + a.suggestions.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul><p><strong>推荐资源：</strong>' + a.recommendedResources.join('、') + '</p>';
    }
  }

  /* ---- 课程知识库 ---- */
  function renderKnowledge() {
    var list = document.getElementById('chapterList');
    if (!list) return;
    list.innerHTML = ZHIXUE_MOCK.chapterCards.map(function (pair) {
      return '<div class="chapter-card"><h3>' + pair[0] + '</h3><div class="tag-list">' + pair[1].map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div></div>';
    }).join('');
  }

  /* ---- 资源审核 ---- */
  function renderReview() {
    var list = document.getElementById('reviewList');
    if (!list) return;
    var statusMap = { pending: '待审核', approved: '已通过', rejected: '已退回' };
    var statusCls = { pending: 'running', approved: 'done', rejected: 'error' };
    list.innerHTML = ZHIXUE_MOCK.teacher.reviewQueue.map(function (item) {
      return '<div class="review-card"><div><h3>' + item.title + ' <span class="status ' + (statusCls[item.status] || 'ready') + '">' + (statusMap[item.status] || item.status) + '</span></h3><p>' + item.preview + '</p><small style="color:var(--muted)">' + item.author + ' · ' + item.submittedAt.split('T')[0] + '</small>' + (item.rejectReason ? '<p style="color:var(--error);font-size:13px">退回原因：' + item.rejectReason + '</p>' : '') + '</div>' + (item.status === 'pending' ? '<div class="review-actions"><button class="primary-action secondary" style="color:var(--success);border-color:var(--success)">通过</button><button class="primary-action secondary" style="color:var(--error);border-color:var(--error)">退回</button></div>' : '') + '</div>';
    }).join('');
  }

  /* ---- 班级学情 ---- */
  function renderClassroom() {
    var cls = ZHIXUE_MOCK.teacher.classroom;
    var dist = cls.distribution;
    var cards = [
      { title: '班级总人数', value: String(cls.totalStudents), desc: '优秀 ' + dist.excellent + '人 · 良好 ' + dist.good + '人 · 一般 ' + dist.average + '人 · 困难 ' + dist.struggling + '人' },
      { title: '平均掌握度', value: cls.averageMastery + '%', desc: '较上周提升 8%' },
      { title: '首要薄弱点', value: cls.topWeaknesses[0].name, desc: cls.topWeaknesses[0].count + ' 名学生需要强化' }
    ];
    var cm = document.getElementById('classroomMetrics');
    if (cm) {
      cm.innerHTML = cards.map(function (c) {
        return '<div class="metric-card"><h3>' + c.title + '</h3><span class="metric-value" style="font-size:' + (c.title === '首要薄弱点' ? '28px' : '44px') + '">' + c.value + '</span><p>' + c.desc + '</p></div>';
      }).join('');
    }
    var tbody = document.querySelector('#studentTable tbody');
    if (tbody) {
      tbody.innerHTML = cls.students.map(function (s) {
        return '<tr><td><strong>' + s.name + '</strong></td><td><div class="mastery-bar"><div class="mastery-bar-fill" style="width:' + s.mastery + '%"></div></div><small>' + s.mastery + '%</small></td><td><span class="status ' + (s.mastery >= 80 ? 'done' : s.mastery >= 50 ? 'running' : 'error') + '">' + (s.mastery >= 80 ? '良好' : s.mastery >= 50 ? '进行中' : '需关注') + '</span></td><td><small>' + s.recentActivity + '</small></td><td>' + (s.weakPoints.length ? s.weakPoints.map(function (w) { return '<span class="tag" style="font-size:10px">' + w + '</span>'; }).join(' ') : '<span style="color:var(--muted)">—</span>') + '</td></tr>';
      }).join('');
    }
  }

  /* ---- 教学建议 ---- */
  function renderAdvice() {
    var a = ZHIXUE_MOCK.teacher.teachingAdvice;
    var el = document.getElementById('adviceMetrics');
    if (el) {
      var cls = ZHIXUE_MOCK.teacher.classroom;
      el.innerHTML =
        '<div class="metric-card"><h3>班级平均掌握度</h3><span class="metric-value">' + cls.averageMastery + '%</span><p>薄弱点：' + cls.topWeaknesses.map(function(w){return w.name;}).join('、') + '</p></div>' +
        '<div class="metric-card"><h3>需关注学生</h3><span class="metric-value">' + cls.distribution.struggling + '</span><p>掌握度低于 50%</p></div>' +
        '<div class="metric-card"><h3>建议补充练习</h3><span class="metric-value">' + a.suggestions.length + '</span><p>项教学建议</p></div>';
    }
    var detail = document.getElementById('adviceDetail');
    if (detail) {
      detail.innerHTML =
        '<h2>' + a.title + '</h2>' +
        '<ul style="line-height:2">' + a.suggestions.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
        '<p style="margin-top:16px"><strong>推荐资源：</strong>' + a.recommendedResources.join('、') + '</p>' +
        '<div class="state-empty" style="margin-top:16px;min-height:80px;background:var(--paper-deep);border-radius:14px"><p>📋 补充练习题推送（后续接入题目生成 Agent）</p></div>';
    }
  }

  // 暴露
  window.ZhixuePages = window.ZhixuePages || {};
  window.ZhixuePages.renderDashboard = renderDashboard;
  window.ZhixuePages.renderKnowledge = renderKnowledge;
  window.ZhixuePages.renderReview = renderReview;
  window.ZhixuePages.renderClassroom = renderClassroom;
  window.ZhixuePages.renderAdvice = renderAdvice;
})();
