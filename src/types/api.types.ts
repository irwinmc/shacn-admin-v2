/**
 * API 相关类型定义
 */

import type { JsonValue } from 'type-fest';

export interface ApiResponse<T = JsonValue> {
	code: number;
	message: string;
	data: T;
}

export interface ApiError {
	code: string;
	message: string;
	status: number;
	errors?: Record<string, string[]>;
}

export interface PaginationParams {
	page?: number;
	page_size?: number;
}

/**
 * 分页元信息
 *
 * @example
 * ```typescript
 * const pagination: PaginationMeta = {
 *   page: 1,
 *   page_size: 10,
 *   total: 42,
 *   total_pages: 5
 * };
 * ```
 */
export interface PaginationMeta {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
}

/**
 * 分页响应泛型
 *
 * @template T 列表项类型
 *
 * @example
 * ```typescript
 * const response: PaginationResponse<Server> = {
 *   data: [{ id: 1, name: "Server 1" }],
 *   pagination: {
 *     page: 1,
 *     page_size: 10,
 *     total: 42,
 *     total_pages: 5
 *   }
 * };
 * ```
 */
export interface PaginationResponse<T> {
	data: T[];
	pagination: PaginationMeta;
}
