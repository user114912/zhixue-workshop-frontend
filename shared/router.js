/* ============================================================
   智学工坊 — 轻量 Hash 路由 + 角色管理
   无需依赖，直接 <script src> 引入即可用
   ============================================================ */

(function () {
  'use strict';

  /**
   * ZhixueApp — 路由 + 角色 + 导航管理
   *
   * 用法:
   *   ZhixueApp.init({
   *     defaultRole: 'default',
   *     roles: {
   *       default: {
   *         label: '智学工坊',
   *         sections: [{ id: 'chat', label: '学习诊断', onEnter: fn }, ...]
   *       },
   *       student: { label: '学生学习空间', sections: [...] },
   *       teacher: { label: '教师工作空间', sections: [...] }
   *     }
   *   });
   */
  var ZhixueApp = {
    _currentRole: null,
    _currentSection: null,
    _roles: {},
    _handlers: {},
    _navParent: null,

    /**
     * 初始化应用
     * @param {Object} opts
     * @param {string} opts.defaultRole     - 默认角色 key
     * @param {Object} opts.roles           - { roleKey: { label, sections: [...] } }
     * @param {string} [opts.containerId]   - 页面容器 id，默认 'mainContent'
     * @param {string} [opts.metaId]        - 面包屑文字元素 id
     * @param {string} [opts.navParentId]   - 导航按钮父容器 id（用于限定选择器范围），默认 'mainNav'
     */
    init: function (opts) {
      var self = this;
      this._roles = opts.roles || {};
      this._containerId = opts.containerId || 'mainContent';
      this._metaId = opts.metaId || 'pageMeta';
      this._navParentId = opts.navParentId || 'mainNav';

      // 注册所有 section handler
      var roleKeys = Object.keys(this._roles);
      for (var i = 0; i < roleKeys.length; i++) {
        var roleSections = this._roles[roleKeys[i]].sections || [];
        for (var j = 0; j < roleSections.length; j++) {
          var sec = roleSections[j];
          this._handlers[sec.id] = sec;
        }
      }

      // 监听 hash 变化
      window.addEventListener('hashchange', function () {
        self._onHashChange();
      });

      this._bindNavClicks();

      // 设置默认角色
      var initialRole = opts.defaultRole || roleKeys[0] || 'default';
      this.setRole(initialRole, true);

      // 如果没有 hash，设第一个 section
      if (!window.location.hash) {
        var firstSection = this._getSectionsForRole(initialRole)[0];
        if (firstSection) {
          history.replaceState(null, '', '#' + firstSection.id);
        }
      }
      this._onHashChange();
    },

    /**
     * 切换角色
     * @param {string} roleKey
     * @param {boolean} [isInit] 是否为初始化调用
     */
    setRole: function (roleKey, isInit) {
      if (!this._roles[roleKey]) return;
      this._currentRole = roleKey;

      // 更新导航按钮可见性
      this._updateNavVisibility(roleKey);

      // 检查当前 hash 是否在新角色的 section 中
      var currentHash = window.location.hash.replace('#', '');
      var validSections = this._getSectionsForRole(roleKey);
      var isValid = validSections.some(function (s) { return s.id === currentHash; });

      if (!isValid) {
        var first = validSections[0];
        if (first) {
          if (isInit) {
            history.replaceState(null, '', '#' + first.id);
          } else {
            window.location.hash = first.id;
          }
        }
      } else if (!isInit) {
        this._onHashChange();
      }

      // 更新页面标题
      document.title = (this._roles[roleKey].label || '智学工坊') + ' · 智学工坊';

      // 触发角色切换回调
      if (this._onRoleChange) {
        this._onRoleChange(roleKey);
      }
    },

    /**
     * 角色切换回调
     * @param {Function} fn
     */
    onRoleChange: function (fn) {
      this._onRoleChange = fn;
    },

    /**
     * 获取当前角色
     */
    getRole: function () {
      return this._currentRole;
    },

    /**
     * 获取当前角色标签
     */
    getRoleLabel: function () {
      var role = this._roles[this._currentRole];
      return role ? role.label : '智学工坊';
    },

    /**
     * 编程式导航
     * @param {string} sectionId
     */
    navigate: function (sectionId) {
      window.location.hash = sectionId;
    },

    /**
     * 获取当前 sectionId
     */
    getCurrentSection: function () {
      return this._currentSection;
    },

    // ---- 内部方法 ---- //

    /** 获取指定角色下的所有导航按钮（仅在 rail 内） */
    _getNavButtons: function () {
      var parent = document.getElementById(this._navParentId);
      if (parent) {
        return parent.querySelectorAll('[data-route]');
      }
      return document.querySelectorAll('.rail-btn[data-route]');
    },

    _getSectionsForRole: function (roleKey) {
      var role = this._roles[roleKey];
      return role ? (role.sections || []) : [];
    },

    _bindNavClicks: function () {
      var self = this;
      var navBtns = this._getNavButtons();
      for (var i = 0; i < navBtns.length; i++) {
        navBtns[i].addEventListener('click', function (event) {
          var route = this.dataset.route;
          if (!route) return;
          event.preventDefault();
          self.navigate(route);
        });
      }
    },

    _onHashChange: function () {
      var hash = window.location.hash.replace('#', '');
      var validSections = this._getSectionsForRole(this._currentRole);
      var isValid = validSections.some(function (s) { return s.id === hash; });

      if (!isValid && validSections.length > 0) {
        hash = validSections[0].id;
        history.replaceState(null, '', '#' + hash);
      }

      var prev = this._currentSection;
      this._currentSection = hash;

      // 调用 onLeave
      if (prev && this._handlers[prev] && this._handlers[prev].onLeave) {
        this._handlers[prev].onLeave();
      }

      // 切换 section 可见性
      var container = document.getElementById(this._containerId);
      if (container) {
        var allPages = container.querySelectorAll('.page');
        for (var i = 0; i < allPages.length; i++) {
          var page = allPages[i];
          var pageId = page.id.replace('section-', '');
          page.classList.toggle('active', pageId === hash);
        }
      }

      // 更新导航按钮高亮（仅限于 rail 内的按钮）
      var navBtns = this._getNavButtons();
      for (var j = 0; j < navBtns.length; j++) {
        navBtns[j].classList.toggle('active', navBtns[j].dataset.route === hash);
      }

      // 更新面包屑
      var metaEl = document.getElementById(this._metaId);
      if (metaEl && this._handlers[hash]) {
        metaEl.textContent = this._handlers[hash].label || '';
      }

      // 调用 onEnter
      if (this._handlers[hash] && this._handlers[hash].onEnter) {
        this._handlers[hash].onEnter();
      }
    },

    _updateNavVisibility: function (roleKey) {
      var validSections = this._getSectionsForRole(roleKey);
      var validIds = {};
      for (var i = 0; i < validSections.length; i++) {
        validIds[validSections[i].id] = true;
      }

      var navBtns = this._getNavButtons();
      for (var j = 0; j < navBtns.length; j++) {
        var route = navBtns[j].dataset.route;
        if (route) {
          navBtns[j].style.display = validIds[route] ? '' : 'none';
        }
      }

      // 同时处理分隔线：如果分隔线后面全是隐藏的按钮则隐藏分隔线
      var parent = document.getElementById(this._navParentId);
      if (parent) {
        var dividers = parent.querySelectorAll('.rail-divider');
        for (var k = 0; k < dividers.length; k++) {
          var divider = dividers[k];
          // 检查分隔线后面的兄弟节点是否全部隐藏
          var next = divider.nextElementSibling;
          var allHidden = true;
          while (next) {
            if (next.style.display !== 'none' && next.tagName !== 'DIV') {
              allHidden = false;
              break;
            }
            next = next.nextElementSibling;
          }
          divider.style.display = allHidden ? 'none' : '';
        }
      }
    },

    /**
     * 获取当前可用 sections
     */
    getSections: function () {
      return this._getSectionsForRole(this._currentRole);
    }
  };

  // 暴露到全局
  window.ZhixueApp = ZhixueApp;
})();
