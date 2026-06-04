/* ============================================================
   智学工坊 — 路由配置
   ============================================================ */

(function () {
  'use strict';

  var P = window.ZhixuePages;

  var sections = {
    chat:       { id: 'chat',       label: '学习诊断',     onEnter: function () { P.renderProfileGrid('profileGrid'); } },
    profile:    { id: 'profile',    label: '学生画像',     onEnter: function () { P.renderProfileGrid('profilePageGrid'); } },
    resources:  { id: 'resources',  label: '学习资源',     onEnter: P.renderResources },
    tutor:      { id: 'tutor',      label: '智能辅导',     onEnter: P.renderTutor },
    quiz:       { id: 'quiz',       label: '练习测评',     onEnter: P.renderQuiz },
    path:       { id: 'path',       label: '学习路径',     onEnter: P.renderPath },
    report:     { id: 'report',     label: '学习报告',     onEnter: P.renderReport },
    agents:     { id: 'agents',     label: 'Agent 协作',   onEnter: P.renderAgents },
    dashboard:  { id: 'dashboard',  label: '教师看板',     onEnter: P.renderDashboard },
    knowledge:  { id: 'knowledge',  label: '课程知识库',   onEnter: P.renderKnowledge },
    review:     { id: 'review',     label: '资源审核',     onEnter: P.renderReview },
    classroom:  { id: 'classroom',  label: '学情分析',     onEnter: P.renderClassroom },
    advice:     { id: 'advice',     label: '教学建议',     onEnter: P.renderAdvice },
    tasks:      { id: 'tasks',      label: '生成任务',     onEnter: P.renderTasks },
    safety:     { id: 'safety',     label: '安全审核',     onEnter: P.renderSafety },
    settings:   { id: 'settings',   label: '设置',     onEnter: P.renderSettings }
  };

  window.ZhixueRouteConfig = {
    sections: sections,

    roles: {
      default: {
        label: '访客体验',
        sections: [sections.chat, sections.resources, sections.agents]
      },
      workspace: {
        label: '智学空间',
        sections: [
          sections.chat,
          sections.profile,
          sections.resources,
          sections.agents,
          sections.path,
          sections.tutor,
          sections.quiz,
          sections.report,
          sections.knowledge,
          sections.classroom,
          sections.advice,
          sections.settings
        ]
      }
      // 以下旧角色保留但不暴露入口，后续可按需恢复
      // student: { ... },
      // teacher: { ... },
      // system: { ... }
    }
  };
})();
