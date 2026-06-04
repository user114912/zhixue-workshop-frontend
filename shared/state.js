/* ============================================================
   智学工坊 — 全局状态管理
   ============================================================ */

(function () {
  'use strict';

  window.ZhixueState = {
    /** 当前选中的资源 ID */
    activeResource: 'lecture',

    /** 当前登录用户 { name, role } */
    currentUser: null,

    /** 当前题目索引 */
    currentQuizIndex: 0,

    /** 辅助常量 */
    diffLabels: { easy: '基础', medium: '进阶', hard: '挑战', mixed: '综合' },
    typeLabels: { choice: '选择题', fill: '填空题', code: '代码题' },

    pathStatusIcons: {
      completed: '<span style="color:var(--green);font-size:18px">✓</span>',
      in_progress: '<span style="color:var(--blue);font-size:18px">◉</span>',
      pending: '<span style="color:var(--muted);font-size:18px">○</span>'
    },

    roleLabels: {
      default: '访客体验',
      workspace: '智学空间'
    },

    /** 预览提示已禁用（不再使用访客体验模式） */
    updatePreviewNotice: function () {
      var notice = document.getElementById('previewNotice');
      if (notice) notice.style.display = 'none';

      var agentsNotice = document.getElementById('agentsPreviewNotice');
      if (agentsNotice) agentsNotice.style.display = 'none';
    },

    /** 弹窗辅助 */
    showModal: function (id) {
      document.getElementById(id).classList.add('show');
    },

    hideModal: function (id) {
      document.getElementById(id).classList.remove('show');
    }
  };
})();
