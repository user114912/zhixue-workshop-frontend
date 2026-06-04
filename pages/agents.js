/* ============================================================
   智学工坊 — Agent 协作 + 系统页面渲染
   ============================================================ */

(function () {
  'use strict';

  /* ---- Agent 协作 ---- */
  function renderAgents() {
    var flow = document.getElementById('agentFlow');
    if (!flow) return;
    var run = ZHIXUE_MOCK.agentRun;
    flow.innerHTML = run.agents.map(function (a) {
      var orig = ZHIXUE_MOCK.agents.find(function (x) { return x.id === a.id; });
      var cls = a.status === 'done' ? 'done' : a.status === 'running' ? 'running' : 'ready';
      var txt = a.status === 'done' ? 'Done · ' + a.duration : a.status === 'running' ? 'Running...' : 'Ready';
      var stepsHtml = orig && orig.steps && orig.steps.length
        ? '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">' + orig.steps.map(function (s, i) {
            var stepDone = a.status === 'done' || (a.status === 'running' && i < orig.steps.length - 1);
            return '<span style="font-size:10px;padding:3px 8px;border-radius:999px;' + (stepDone ? 'background:var(--green-soft);color:var(--green)' : 'background:var(--line);color:var(--muted)') + '">' + (stepDone ? '✓ ' : '○ ') + s + '</span>';
          }).join('') + '</div>'
        : '';
      var outputHtml = a.output
        ? '<div style="margin-top:6px;padding:8px 12px;border-radius:8px;background:var(--paper-deep);font-size:12px;color:var(--muted)"><strong>输出：</strong>' + a.output + '</div>'
        : '';
      return '<div class="agent-card"><div class="agent-avatar" style="' + (a.status === 'running' ? 'animation:status-pulse 1.5s infinite' : '') + '">' + (orig ? orig.avatar : '?') + '</div><div><h3>' + (orig ? orig.name : a.id) + '</h3><p style="font-size:13px">' + (orig ? orig.description : '') + '</p>' + stepsHtml + outputHtml + '</div><span class="status ' + cls + '">' + txt + '</span></div>';
    }).join('');
  }

  /* ---- 生成任务队列 ---- */
  function renderTasks() {
    var el = document.getElementById('taskList');
    if (!el) return;
    var statusMap = { done: '已完成', running: '生成中', waiting: '等待中', failed: '失败' };
    var statusCls = { done: 'done', running: 'running', waiting: 'ready', failed: 'error' };
    el.innerHTML = ZHIXUE_MOCK.tasks.map(function (t) {
      return '<div class="review-card"><div><h3>' + t.title + ' <span class="status ' + (statusCls[t.status] || 'ready') + '">' + (statusMap[t.status] || t.status) + '</span></h3>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0">' +
          '<span class="tag" style="font-size:10px">' + t.type + '</span>' +
          t.knowledgePoints.map(function (kp) { return '<span class="tag" style="font-size:10px;padding:3px 6px">' + kp + '</span>'; }).join('') +
        '</div>' +
        (t.status === 'running' ? '<div class="mastery-track" style="margin:8px 0"><div class="mastery-fill mid" style="width:' + t.progress + '%"></div></div>' : '') +
        '<small style="color:var(--muted)">' + (t.duration !== '-' ? '耗时 ' + t.duration : '预计 ' + t.estimatedTime) + (t.errorMessage ? ' · <span style="color:var(--error)">' + t.errorMessage + '</span>' : '') + '</small></div>' +
        (t.status === 'failed' ? '<button class="primary-action secondary">重试</button>' : '') +
      '</div>';
    }).join('');
  }

  /* ---- 安全与防幻觉 ---- */
  function renderSafety() {
    var el = document.getElementById('safetyList');
    if (!el) return;
    var riskMap = { low: '低风险', medium: '中风险', high: '高风险' };
    var riskCls = { low: 'done', medium: 'running', high: 'error' };
    el.innerHTML = ZHIXUE_MOCK.safetyRecords.map(function (r) {
      return '<div class="review-card"><div><h3>' + r.resourceName + ' <span class="status ' + (riskCls[r.riskLevel] || 'ready') + '">' + (riskMap[r.riskLevel] || r.riskLevel) + '</span></h3>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0;font-size:12px">' +
          '<div><strong style="color:var(--muted)">生成 Agent：</strong>' + r.generatedBy + '</div>' +
          '<div><strong style="color:var(--muted)">审核状态：</strong>' + r.reviewStatus + '</div>' +
          '<div><strong style="color:var(--muted)">事实检查：</strong>' + r.factCheck + '</div>' +
          '<div><strong style="color:var(--muted)">敏感内容：</strong>' + r.sensitiveCheck + '</div>' +
        '</div>' +
        '<div style="margin:4px 0"><strong style="font-size:12px;color:var(--muted)">引用来源：</strong>' + r.sources.join('、') + '</div>' +
        (r.rejectReason ? '<p style="color:var(--error);font-size:12px">拒绝原因：' + r.rejectReason + '</p>' : '') +
        '<small style="color:var(--muted)">审核人：' + (r.reviewedBy || '待审核') + ' · ' + (r.reviewedAt ? r.reviewedAt.split('T')[0] : '') + '</small></div>' +
      '</div>';
    }).join('');
  }

  /* ---- 模型与工具配置 ---- */
  function renderSettings() {
    // 当前课程
    var course = document.getElementById('settingsCourse');
    if (course) {
      course.innerHTML = '<p style="font-size:15px"><strong>当前课程：</strong>' + (ZHIXUE_MOCK.settings.courseName || 'Python 程序设计') + '</p>' +
        '<p style="font-size:13px;color:var(--muted)">系统围绕该课程构建知识库、生成个性化资源并追踪学习进度。</p>';
    }

    var models = document.getElementById('settingsModels');
    if (models) {
      models.innerHTML = ZHIXUE_MOCK.settings.models.map(function (m) {
        return '<div class="chapter-card"><h3>' + m.name + '</h3><p style="font-size:14px">' + m.value + '</p><span class="status ' + (m.status === '已连接' || m.status === '已配置' || m.status === '已加载' || m.status === '已使用' ? 'done' : 'running') + '" style="font-size:10px;margin-top:4px">' + m.status + '</span></div>';
      }).join('');
    }
    var refs = document.getElementById('settingsRefs');
    if (refs) {
      refs.innerHTML = '<table class="student-table"><thead><tr><th>项目名称</th><th>License</th><th>用途</th></tr></thead><tbody>' +
        ZHIXUE_MOCK.settings.references.map(function (r) {
          return '<tr><td><strong>' + r.name + '</strong></td><td><span class="tag" style="font-size:10px">' + r.license + '</span></td><td>' + r.usage + '</td></tr>';
        }).join('') +
      '</tbody></table>' +
      '<p style="margin-top:12px;font-size:12px;color:var(--muted)">最后更新：' + ZHIXUE_MOCK.settings.lastUpdated.split('T')[0] + '</p>';
    }

    // 安全与防幻觉机制
    var safety = document.getElementById('settingsSafety');
    if (safety && ZHIXUE_MOCK.settings.safetyMechanism) {
      var sm = ZHIXUE_MOCK.settings.safetyMechanism;
      safety.innerHTML = '<ul style="line-height:2">' +
        sm.items.map(function (item) { return '<li>' + item + '</li>'; }).join('') +
      '</ul>';
    }
  }

  // 暴露
  window.ZhixuePages = window.ZhixuePages || {};
  window.ZhixuePages.renderAgents = renderAgents;
  window.ZhixuePages.renderTasks = renderTasks;
  window.ZhixuePages.renderSafety = renderSafety;
  window.ZhixuePages.renderSettings = renderSettings;
})();
