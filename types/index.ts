/**
 * 智学工坊 — TypeScript 类型定义入口
 *
 * 这些类型定义用于前后端接口对齐。
 * 当前阶段为纯文档用途，后续迁移到 React/Vite/TypeScript 时可直接使用。
 *
 * @module types
 */

/// <reference path="./profile.ts" />
/// <reference path="./resource.ts" />
/// <reference path="./quiz.ts" />
/// <reference path="./path.ts" />
/// <reference path="./knowledge.ts" />
/// <reference path="./agent.ts" />
/// <reference path="./teacher.ts" />

/** 通用 API 响应包装 */
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/** 分页响应 */
interface PaginatedResponse<T> {
  code: number;
  data: {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  message: string;
}

/** 角色类型 */
type UserRole = 'default' | 'student' | 'teacher';

/** 前端页面路由 */
type RouteId =
  | 'chat'
  | 'resources-preview'
  | 'agents-preview'
  | 'student-chat'
  | 'student-profile'
  | 'student-resources'
  | 'student-tutor'
  | 'student-quiz'
  | 'student-path'
  | 'student-report'
  | 'teacher-dashboard'
  | 'teacher-knowledge'
  | 'teacher-review'
  | 'teacher-classroom'
  | 'teacher-advice'
  | 'agents-activity'
  | 'agents-tasks'
  | 'safety'
  | 'settings'
  | 'recording-script';
