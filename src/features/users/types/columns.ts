import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '../schemas';

/**
 * 扩展的列元数据类型，添加了自定义的样式属性
 */
export interface CustomColumnMeta {
	/** 应用于 th 和 td 的通用样式类名 */
	className?: string;
	/** 仅应用于 th（表头）的样式类名 */
	thClassName?: string;
	/** 仅应用于 td（单元格）的样式类名 */
	tdClassName?: string;
}

/**
 * Users 表格的列定义类型，带有自定义元数据
 */
export type UserColumnDef = ColumnDef<User, unknown> & {
	meta?: CustomColumnMeta;
};

/**
 * 从列元数据中安全地提取样式类名
 * @param meta - 列的元数据对象（可能包含任何属性）
 * @returns 包含 className、thClassName、tdClassName 的对象，类型安全
 */
export function getColumnMeta(meta: unknown): CustomColumnMeta {
	if (!meta || typeof meta !== 'object') return {};

	const metaObj = meta as Record<string, unknown>;
	return {
		className: typeof metaObj.className === 'string' ? metaObj.className : undefined,
		thClassName: typeof metaObj.thClassName === 'string' ? metaObj.thClassName : undefined,
		tdClassName: typeof metaObj.tdClassName === 'string' ? metaObj.tdClassName : undefined,
	};
}
