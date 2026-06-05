/* ============================================================
   智学工坊 — 路由配置
   ============================================================ */

(function () {
  'use strict';

  var P = window.ZhixuePages;

  var sections = {
    diagnosis:  { id: 'diagnosis',  label: '学习需求',     onEnter: P.renderDiagnosis },
    profile:    { id: 'profile',    label: '学习画像',     onEnter: function () { P.renderProfilePage(); } },
    resources:  { id: 'resources',  label: '学习资源',     onEnter: P.renderResources },
    quiz:       { id: 'quiz',       label: '练习测评',     onEnter: P.renderQuiz },
    path:       { id: 'path',       label: '学习路径',     onEnter: P.renderPath },
    tutor:      { id: 'tutor',      label: '智能辅导',     onEnter: P.renderTutor },
    report:     { id: 'report',     label: '学习评估',     onEnter: P.renderReport },
    dashboard:  { id: 'dashboard',  label: '教师看板',     onEnter: P.renderDashboard },
    knowledge:  { id: 'knowledge',  label: '课程知识库',   onEnter: P.renderKnowledge },
    review:     { id: 'review',     label: '资源审核',     onEnter: P.renderReview },
    classroom:  { id: 'classroom',  label: '学情分析',     onEnter: P.renderClassroom },
    advice:     { id: 'advice',     label: '教学建议',     onEnter: P.renderAdvice },
    tasks:      { id: 'tasks',      label: '生成任务',     onEnter: P.renderTasks },
    safety:     { id: 'safety',     label: '安全审核',     onEnter: P.renderSafety },
    settings:   { id: 'settings',   label: '设置',         onEnter: P.renderSettings },
    agents:     { id: 'agents',     label: 'Agent 协作',   onEnter: function () { P.renderAgents(); P.renderTimeline(); } }
  };

  window.ZhixueRouteConfig = {
    sections: sections,

    roles: {
      default: {
        label: '访客体验',
        sections: [sections.diagnosis, sections.resources, sections.agents]
      },
      workspace: {
        label: '智学空间',
        sections: [
          sections.diagnosis,
          sections.profile,
          sections.resources,
          sections.path,
          sections.quiz,
          sections.tutor,
          sections.report,
          sections.knowledge,
          sections.settings,
          sections.agents
        ]
      }
      // 以下旧角色保留但不暴露入口，后续可按需恢复
      // student: { ... },
      // teacher: { ... },
      // system: { ... }
    }
  };
})();
