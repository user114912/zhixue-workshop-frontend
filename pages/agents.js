/* ============================================================
   智学工坊 — Agent 协作 + 系统页面渲染
   ============================================================ */

(function () {
  'use strict';

  /* ---- Agent 协作卡片 ---- */
  function renderAgents() {
    var flow = document.getElementById('agentFlow');
    if (!flow) return;
    var run = ZHIXUE_MOCK.agentRun;
    var runId = run.run_id || run.sessionId || '';

    // 运行元信息
    var metaHtml = '<div style="margin-bottom:20px;padding:12px 16px;border-radius:10px;background:var(--panel);border:1px solid var(--panel-border)">' +
      '<div style="display:flex;gap:24px;flex-wrap:wrap;font-size:12px">' +
        '<span><strong style="color:var(--muted)">Run ID：</strong>' + runId + '</span>' +
        '<span><strong style="color:var(--muted)">类型：</strong>' + (run.run_type || 'resource_generation') + '</span>' +
        '<span><strong style="color:var(--muted)">状态：</strong><span class="status ' + (run.status === 'completed' ? 'done' : run.status === 'failed' ? 'error' : 'running') + '">' + (run.status === 'completed' ? '已完成' : run.status === 'failed' ? '失败' : '运行中') + '</span></span>' +
        '<span><strong style="color:var(--muted)">开始时间：</strong>' + (run.started_at || run.startedAt || '-') + '</span>' +
      '</div>' +
    '</div>';

    // Agent 卡片列表
    var cardsHtml = run.agents.map(function (a) {
      var orig = ZHIXUE_MOCK.agents.find(function (x) { return x.id === a.id; });
      var cls = a.status === 'done' ? 'done' : a.status === 'running' ? 'running' : 'ready';
      var txt = a.status === 'done' ? 'Done · ' + a.duration : a.status === 'running' ? 'Running...' : 'Ready';

      // 步骤标签
      var stepsHtml = '';
      if (orig && orig.steps && orig.steps.length) {
        // 兼容旧格式（字符串数组）和新格式（对象数组）
        var stepNames = typeof orig.steps[0] === 'string'
          ? orig.steps
          : orig.steps.map(function (s) { return s.name; });
        // 获取实际步骤执行状态
        var stepIds = a.stepIds || [];
        stepsHtml = '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">' + stepNames.map(function (name, i) {
          var sid = stepIds[i];
          var stepDetail = sid ? (ZHIXUE_MOCK.agentSteps || []).find(function (s) { return s.step_id === sid; }) : null;
          var stepStatus = stepDetail ? stepDetail.status : (a.status === 'done' ? 'done' : (a.status === 'running' && i === 0 ? 'done' : 'ready'));
          var stepDone = stepStatus === 'done';
          return '<span style="font-size:10px;padding:3px 8px;border-radius:999px;' + (stepDone ? 'background:var(--green-soft);color:var(--green)' : stepStatus === 'running' ? 'background:var(--accent-soft);color:var(--accent)' : 'background:var(--line);color:var(--muted)') + '">' + (stepDone ? '✓ ' : stepStatus === 'running' ? '⟳ ' : '○ ') + name + '</span>';
        }).join('') + '</div>';
      }

      var outputHtml = a.output
        ? '<div style="margin-top:6px;padding:8px 12px;border-radius:8px;background:var(--paper-deep);font-size:12px;color:var(--muted)"><strong>输出：</strong>' + a.output + '</div>'
        : '';

      return '<div class="agent-card"><div class="agent-avatar" style="' + (a.status === 'running' ? 'animation:status-pulse 1.5s infinite' : '') + '">' + (orig ? orig.avatar : '?') + '</div><div><h3>' + (orig ? orig.name : a.id) + '</h3><p style="font-size:13px">' + (orig ? orig.description : '') + '</p>' + stepsHtml + outputHtml + '</div><span class="status ' + cls + '">' + txt + '</span></div>';
    }).join('');

    flow.innerHTML = metaHtml + cardsHtml;
  }

  /* ---- 任务时间线 ---- */
  function renderTimeline() {
    var el = document.getElementById('agentTimeline');
    if (!el) return;

    var run = ZHIXUE_MOCK.agentRun;
    var steps = ZHIXUE_MOCK.agentSteps || [];
    var statusMap = { done: '已完成', running: '执行中', ready: '等待中', error: '失败', skipped: '已跳过' };
    var statusCls = { done: 'done', running: 'running', ready: 'ready', error: 'error', skipped: 'ready' };
    var dotCls = { done: 'done', running: 'running', ready: 'ready', error: 'error', skipped: 'ready' };

    // 按 agent 分组步骤
    var agentOrder = run.agents.map(function (a) { return a.id; });
    var grouped = {};
    agentOrder.forEach(function (aid) {
      grouped[aid] = steps.filter(function (s) { return s.agent_id === aid; }).sort(function (a, b) { return a.step_order - b.step_order; });
    });

    // 计算整体进度
    var totalSteps = steps.length;
    var doneSteps = steps.filter(function (s) { return s.status === 'done'; }).length;
    var runningSteps = steps.filter(function (s) { return s.status === 'running'; }).length;
    var progressPct = totalSteps > 0 ? Math.round((doneSteps + runningSteps * 0.5) / totalSteps * 100) : 0;

    var headerHtml = '<div style="margin-bottom:16px">' +
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">' +
        '<span style="font-size:13px;color:var(--muted)">整体进度</span>' +
        '<span style="font-size:13px;font-weight:600">' + progressPct + '%</span>' +
      '</div>' +
      '<div class="mastery-track" style="margin:0"><div class="mastery-fill mid" style="width:' + progressPct + '%"></div></div>' +
      '<div style="display:flex;gap:16px;margin-top:6px;font-size:11px;color:var(--muted)">' +
        '<span>✓ ' + doneSteps + ' 完成</span>' +
        '<span>⟳ ' + runningSteps + ' 进行中</span>' +
        '<span>○ ' + (totalSteps - doneSteps - runningSteps) + ' 等待</span>' +
      '</div>' +
    '</div>';

    var timelineHtml = agentOrder.map(function (aid, agentIndex) {
      var agentSteps = grouped[aid] || [];
      var agentRunInfo = run.agents.find(function (a) { return a.id === aid; });
      var agentDef = ZHIXUE_MOCK.agents.find(function (a) { return a.id === aid; });
      var agentStatus = agentRunInfo ? agentRunInfo.status : 'ready';
      var isLastAgent = agentIndex === agentOrder.length - 1;

      // Agent 头部节点
      var agentNodeHtml = '<div class="tl-node" style="padding:12px 16px">' +
        '<div class="tl-dot ' + (dotCls[agentStatus] || 'ready') + '" style="' + (agentStatus === 'running' ? 'animation:status-pulse 1.5s infinite' : '') + '"></div>' +
        '<div style="flex:1">' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            '<span style="font-weight:600;font-size:14px">' + (agentDef ? agentDef.name : aid) + '</span>' +
            '<span class="status ' + (statusCls[agentStatus] || 'ready') + '" style="font-size:10px">' + (statusMap[agentStatus] || agentStatus) + '</span>' +
            (agentRunInfo && agentRunInfo.duration && agentRunInfo.duration !== '-' ? '<span style="font-size:11px;color:var(--muted)">耗时 ' + agentRunInfo.duration + '</span>' : '') +
          '</div>' +
          (agentDef ? '<p style="font-size:12px;color:var(--muted);margin:2px 0 0">' + agentDef.description + '</p>' : '') +
          (agentRunInfo && agentRunInfo.output ? '<p style="font-size:12px;color:var(--accent);margin:4px 0 0">→ ' + agentRunInfo.output + '</p>' : '') +
        '</div>' +
      '</div>';

      // 步骤子节点
      var stepNodesHtml = agentSteps.map(function (step, stepIndex) {
        var isLastStep = stepIndex === agentSteps.length - 1 && isLastAgent;
        var stepStatus = step.status;
        var durText = step.duration_ms !== null && step.duration_ms !== undefined
          ? (step.duration_ms >= 1000 ? (step.duration_ms / 1000).toFixed(1) + 's' : step.duration_ms + 'ms')
          : (stepStatus === 'running' ? '进行中...' : '-');

        return '<div class="tl-node tl-sub" style="padding:8px 16px 8px 28px">' +
          '<div class="tl-dot sm ' + (dotCls[stepStatus] || 'ready') + '" style="' + (stepStatus === 'running' ? 'animation:status-pulse 1.5s infinite' : '') + '"></div>' +
          '<div style="flex:1">' +
            '<div style="display:flex;align-items:center;gap:8px">' +
              '<span style="font-size:12px;font-weight:500">步骤 ' + step.step_order + '：' + (step.input_summary || step.output_summary || '步骤 ' + step.step_order) + '</span>' +
              '<span class="status ' + (statusCls[stepStatus] || 'ready') + '" style="font-size:10px">' + (statusMap[stepStatus] || stepStatus) + '</span>' +
              '<span style="font-size:10px;color:var(--muted)">' + durText + '</span>' +
            '</div>' +
            (step.output_summary && stepStatus === 'done' ? '<p style="font-size:11px;color:var(--muted);margin:2px 0 0">输出：' + step.output_summary + '</p>' : '') +
            (step.error_message ? '<p style="font-size:11px;color:var(--error);margin:2px 0 0">错误：' + step.error_message + '</p>' : '') +
          '</div>' +
        '</div>';
      }).join('');

      return agentNodeHtml + stepNodesHtml;
    }).join('');

    el.innerHTML = headerHtml + '<div class="tl-track">' + timelineHtml + '</div>';
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
    // 账号信息
    var account = document.getElementById('settingsAccount');
    if (account && window.ZhixueState && window.ZhixueState.currentUser) {
      var u = window.ZhixueState.currentUser;
      account.innerHTML =
        '<div class="profile-card"><span>姓名</span><strong>' + (u.realName || u.name || '-') + '</strong></div>' +
        '<div class="profile-card"><span>学号</span><strong>' + (u.studentId || '-') + '</strong></div>' +
        '<div class="profile-card"><span>学校</span><strong>' + (u.school || '-') + '</strong></div>' +
        '<div class="profile-card"><span>角色</span><strong>智学空间</strong></div>';
    } else if (account) {
      account.innerHTML = '<p style="color:var(--muted)">登录后可查看账号信息。</p>';
    }

    // 默认模型
    var models = document.getElementById('settingsModels');
    if (models) {
      models.innerHTML = ZHIXUE_MOCK.settings.models.map(function (m) {
        return '<div class="chapter-card"><h3>' + m.name + '</h3><p style="font-size:14px">' + m.value + '</p><span class="status ' + (m.status === '已连接' || m.status === '已配置' || m.status === '已加载' || m.status === '已使用' ? 'done' : 'running') + '" style="font-size:10px;margin-top:4px">' + m.status + '</span></div>';
      }).join('');
    }

    // 资源生成偏好
    var prefs = document.getElementById('settingsPrefs');
    if (prefs) {
      prefs.innerHTML =
        '<div class="profile-card"><span>讲义风格</span><strong>详细讲解 + 思维导图</strong></div>' +
        '<div class="profile-card"><span>练习题量</span><strong>每知识点 5 题</strong></div>' +
        '<div class="profile-card"><span>视频/动画</span><strong>开启</strong></div>' +
        '<div class="profile-card"><span>PPT 课件</span><strong>开启</strong></div>';
    }

    // 通知与进度提醒
    var notify = document.getElementById('settingsNotify');
    if (notify) {
      notify.innerHTML =
        '<div class="profile-card"><span>学习完成提醒</span><strong>开启</strong></div>' +
        '<div class="profile-card"><span>测评结果通知</span><strong>开启</strong></div>' +
        '<div class="profile-card"><span>资源生成完成通知</span><strong>开启</strong></div>' +
        '<div class="profile-card"><span>每周学习报告</span><strong>开启</strong></div>';
    }
  }

  // 暴露
  window.ZhixuePages = window.ZhixuePages || {};
  window.ZhixuePages.renderAgents = renderAgents;
  window.ZhixuePages.renderTimeline = renderTimeline;
  window.ZhixuePages.renderTasks = renderTasks;
  window.ZhixuePages.renderSafety = renderSafety;
  window.ZhixuePages.renderSettings = renderSettings;
})();
