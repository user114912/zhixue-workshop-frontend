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

    // ---- Agent API（对齐后端 /api/agents/runs 接口） ---- //

    /** 为新建 run 克隆 steps 和 events，替换 run_id */
    _cloneRunData: function (targetRunId) {
      var stepIdMap = {};
      var sourceSteps = ZHIXUE_MOCK.agentSteps || [];
      var sourceEvents = ZHIXUE_MOCK.agentEvents || [];

      // 克隆步骤，重置状态
      var newSteps = sourceSteps.map(function (s, i) {
        var newStepId = 'step-' + targetRunId + '-' + String(i + 1).padStart(2, '0');
        stepIdMap[s.step_id] = newStepId;
        return {
          step_id: newStepId,
          run_id: targetRunId,
          agent_id: s.agent_id,
          agent_name: s.agent_name,
          step_order: s.step_order,
          status: 'ready',
          input_summary: '',
          output_summary: '',
          duration_ms: null,
          started_at: null,
          finished_at: null,
          error_message: null
        };
      });

      // 克隆事件，映射 step_id
      var newEvents = sourceEvents.map(function (e, i) {
        return {
          id: 'evt-' + targetRunId + '-' + String(i + 1).padStart(3, '0'),
          run_id: targetRunId,
          agent_id: e.agent_id,
          step_id: e.step_id ? (stepIdMap[e.step_id] || e.step_id) : null,
          type: e.type,
          data: e.data,
          timestamp: null
        };
      });

      return { steps: newSteps, events: newEvents, stepIdMap: stepIdMap };
    },

    /** POST /api/agents/runs — 触发一次 Agent 运行 */
    createAgentRun: function (options) {
      options = options || {};
      var self = this;
      return this._delay(200).then(function () {
        var newRunId = 'run-' + new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14) + '-' + Math.random().toString(36).slice(2, 6);
        var cloned = self._cloneRunData(newRunId);

        var newRun = {
          run_id: newRunId,
          run_type: options.runType || 'resource_generation',
          user_id: options.userId || 'user-demo-001',
          course_id: options.courseId || 'course-python-001',
          status: 'running',
          input_json: options.input || { profile_id: 'prof-001' },
          output_json: null,
          agents: ZHIXUE_MOCK.agents.map(function (a) {
            return { id: a.id, status: 'ready', duration: '-', output: '', stepIds: (a.steps || []).map(function (s) { return typeof s === 'string' ? '' : s.stepId; }) };
          }),
          started_at: new Date().toISOString(),
          completed_at: null,
          finished_at: null,
          error_message: null
        };

        // 存储活跃 run 及其专属 steps/events
        ZHIXUE_MOCK._activeRun = newRun;
        ZHIXUE_MOCK._activeSteps = cloned.steps;
        ZHIXUE_MOCK._activeEvents = cloned.events;
        ZHIXUE_MOCK._activeStepIdMap = cloned.stepIdMap;

        return { code: 201, data: { run_id: newRunId }, message: 'Agent 运行已触发' };
      });
    },

    /** GET /api/agents/runs/:runId */
    getAgentRun: function (runId) {
      return this._delay(100).then(function () {
        var run = (runId && ZHIXUE_MOCK._activeRun && ZHIXUE_MOCK._activeRun.run_id === runId)
          ? ZHIXUE_MOCK._activeRun
          : ZHIXUE_MOCK.agentRun;
        return { code: 200, data: run, message: 'ok' };
      });
    },

    /** GET /api/agents/runs/:runId/steps */
    getAgentSteps: function (runId) {
      return this._delay(100).then(function () {
        // 优先返回活跃 run 的专属步骤
        if (runId && ZHIXUE_MOCK._activeSteps && ZHIXUE_MOCK._activeRun && ZHIXUE_MOCK._activeRun.run_id === runId) {
          return { code: 200, data: ZHIXUE_MOCK._activeSteps, message: 'ok' };
        }
        var steps = ZHIXUE_MOCK.agentSteps || [];
        if (runId) {
          steps = steps.filter(function (s) { return s.run_id === runId; });
        }
        return { code: 200, data: steps, message: 'ok' };
      });
    },

    /** SSE 模拟：订阅 Agent 运行事件流
     *  @param {string} runId - 运行 ID
     *  @param {object} callbacks - { onStepStart, onStepProgress, onStepComplete, onAgentComplete, onRunComplete, onError }
     *  @returns {function} unsubscribe - 调用以取消订阅
     */
    subscribeAgentRun: function (runId, callbacks) {
      callbacks = callbacks || {};

      // 优先使用活跃 run 的专属事件
      var events;
      if (runId && ZHIXUE_MOCK._activeEvents && ZHIXUE_MOCK._activeRun && ZHIXUE_MOCK._activeRun.run_id === runId) {
        events = ZHIXUE_MOCK._activeEvents;
      } else {
        events = ZHIXUE_MOCK.agentEvents || [];
        if (runId) {
          events = events.filter(function (e) { return e.run_id === runId; });
        }
      }

      // 定位到对应的 run 对象
      var runRef = (runId && ZHIXUE_MOCK._activeRun && ZHIXUE_MOCK._activeRun.run_id === runId)
        ? ZHIXUE_MOCK._activeRun
        : ZHIXUE_MOCK.agentRun;

      var cancelled = false;
      var timers = [];
      var delayPerEvent = 400; // 每个事件间隔 400ms 模拟真实 SSE

      events.forEach(function (evt, index) {
        var delay = index * delayPerEvent;
        var timer = setTimeout(function () {
          if (cancelled) return;

          // 动态填充时间戳
          if (!evt.timestamp) {
            evt.timestamp = new Date().toISOString();
          }

          try {
            switch (evt.type) {
              case 'step_start':
                if (callbacks.onStepStart) callbacks.onStepStart(evt);
                break;
              case 'step_progress':
                if (callbacks.onStepProgress) callbacks.onStepProgress(evt);
                break;
              case 'step_complete':
                if (callbacks.onStepComplete) callbacks.onStepComplete(evt);
                break;
              case 'agent_complete':
                if (callbacks.onAgentComplete) callbacks.onAgentComplete(evt);
                break;
              case 'run_complete':
                // run_complete 事件在 finalTimer 之前触发
                if (callbacks.onStepComplete) callbacks.onStepComplete(evt);
                break;
              case 'error':
                if (callbacks.onError) callbacks.onError({ message: evt.data, event: evt });
                break;
            }
          } catch (err) {
            if (callbacks.onError) callbacks.onError({ message: err.message, event: evt });
          }
        }, delay);
        timers.push(timer);
      });

      // 所有事件播完后：更新 run 状态为 completed，再触发 onRunComplete
      var finalDelay = events.length * delayPerEvent + 200;
      var finalTimer = setTimeout(function () {
        if (cancelled) return;

        // 将 run 更新为已完成状态
        var now = new Date().toISOString();
        if (runRef) {
          runRef.status = 'completed';
          runRef.completed_at = now;
          runRef.finished_at = now;
          runRef.output_json = {
            agents_completed: runRef.agents.filter(function (a) { return a.status === 'done'; }).length,
            total_agents: runRef.agents.length,
            summary: '全部 Agent 执行完毕，已生成个性化学习资源'
          };
          // 将所有 agent 状态更新为 done
          runRef.agents.forEach(function (a) {
            if (a.status === 'ready' || a.status === 'running') {
              a.status = 'done';
              a.duration = a.duration === '-' ? '1.5s' : a.duration;
            }
          });
        }

        if (callbacks.onRunComplete) {
          callbacks.onRunComplete(runRef);
        }
      }, finalDelay);
      timers.push(finalTimer);

      // 返回取消订阅函数
      return function unsubscribe() {
        cancelled = true;
        timers.forEach(function (t) { clearTimeout(t); });
        timers = [];
      };
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
