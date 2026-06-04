/* ============================================================
   智学工坊 — API 层（Mock）
   当前返回 ZHIXUE_MOCK 数据，后续替换为真实 fetch
   ============================================================ */

(function () {
  'use strict';

  var API = {
    /** 模拟网络延迟 */
    _delay: function (ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms || 0);
      });
    },

    // ---- 学生端 API ---- //

    /** POST /api/student/diagnose */
    diagnose: function (input) {
      return this._delay(300).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.profile, message: 'ok' };
      });
    },

    /** GET /api/student/profile */
    getProfile: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.profile, message: 'ok' };
      });
    },

    /** GET /api/student/resources */
    getResources: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.resources, message: 'ok' };
      });
    },

    /** POST /api/quiz/submit */
    submitQuiz: function (quizId, answer) {
      return this._delay(200).then(function () {
        var q = ZHIXUE_MOCK.quizBank.find(function (item) { return item.id === quizId; });
        var correct = q ? answer === q.correctAnswer : false;
        return { code: 200, data: { correct: correct, correctAnswer: q ? q.correctAnswer : '', analysis: q ? q.analysis : '' }, message: 'ok' };
      });
    },

    /** GET /api/student/path */
    getPath: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.paths, message: 'ok' };
      });
    },

    /** GET /api/student/report */
    getReport: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.report, message: 'ok' };
      });
    },

    /** GET /api/student/tutor */
    getTutorSessions: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.tutor.sessions, message: 'ok' };
      });
    },

    // ---- 教师端 API ---- //

    /** GET /api/teacher/dashboard */
    getDashboard: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.teacher, message: 'ok' };
      });
    },

    /** GET /api/teacher/knowledge */
    getKnowledge: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.knowledge, message: 'ok' };
      });
    },

    /** GET /api/teacher/resources/review */
    getReviewQueue: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.teacher.reviewQueue, message: 'ok' };
      });
    },

    /** GET /api/teacher/classroom */
    getClassroom: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.teacher.classroom, message: 'ok' };
      });
    },

    // ---- Agent API ---- //

    /** GET /api/agents/runs/:runId */
    getAgentRun: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.agentRun, message: 'ok' };
      });
    },

    // ---- 系统 API ---- //

    /** GET /api/tasks */
    getTasks: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.tasks, message: 'ok' };
      });
    },

    /** GET /api/safety/records */
    getSafetyRecords: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.safetyRecords, message: 'ok' };
      });
    },

    /** GET /api/settings */
    getSettings: function () {
      return this._delay(100).then(function () {
        return { code: 200, data: ZHIXUE_MOCK.settings, message: 'ok' };
      });
    }
  };

  window.ZhixueAPI = API;
})();
