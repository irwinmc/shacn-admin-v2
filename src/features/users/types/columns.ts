import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '../schemas';

/**
 * Users 表格的列定义类型
 */
export type UserColumnDef<TValue = unknown> = ColumnDef<User, TValue>;
