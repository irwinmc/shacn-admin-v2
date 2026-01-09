/**
 * 服务层导出入口
 * 包含 API 实例、Query Client 和所有 Hooks
 */

// API 实例
export { apiInstance, default as api, formatError } from './api';

// Query Client
export { queryClient, default as qc } from './query-client';

// 认证API
export * from './auth-api';

// 类型定义
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
