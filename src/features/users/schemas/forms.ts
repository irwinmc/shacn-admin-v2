import { z } from 'zod';

/** 基础用户表单字段验证 */
const baseUserFormSchema = z.object({
	firstName: z.string().min(1, 'First Name is required.'),
	lastName: z.string().min(1, 'Last Name is required.'),
	username: z.string().min(1, 'Username is required.'),
	email: z.email({ message: 'Invalid email address.' }),
	phoneNumber: z.string().min(1, 'Phone number is required.'),
	role: z.string().min(1, 'Role is required.'),
});

/** 添加用户表单验证（密码必填） */
export const addUserFormSchema = baseUserFormSchema
	.extend({
		password: z.string().min(1, 'Password is required.'),
		confirmPassword: z.string().min(1, 'Confirm Password is required.'),
	})
	.refine(data => data.password.length >= 8, {
		message: 'Password must be at least 8 characters long.',
		path: ['password'],
	})
	.refine(data => /[a-z]/.test(data.password), {
		message: 'Password must contain at least one lowercase letter.',
		path: ['password'],
	})
	.refine(data => /\d/.test(data.password), {
		message: 'Password must contain at least one number.',
		path: ['password'],
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match.",
		path: ['confirmPassword'],
	});

export type AddUserFormData = z.infer<typeof addUserFormSchema>;

/** 编辑用户表单验证（密码可选） */
export const editUserFormSchema = baseUserFormSchema
	.extend({
		password: z.string().optional(),
		confirmPassword: z.string().optional(),
	})
	.refine(
		data => {
			if (!data.password) return true;
			return data.password.length >= 8;
		},
		{
			message: 'Password must be at least 8 characters long.',
			path: ['password'],
		}
	)
	.refine(
		data => {
			if (!data.password) return true;
			return /[a-z]/.test(data.password);
		},
		{
			message: 'Password must contain at least one lowercase letter.',
			path: ['password'],
		}
	)
	.refine(
		data => {
			if (!data.password) return true;
			return /\d/.test(data.password);
		},
		{
			message: 'Password must contain at least one number.',
			path: ['password'],
		}
	)
	.refine(
		data => {
			if (!data.password) return true;
			return data.password === data.confirmPassword;
		},
		{
			message: "Passwords don't match.",
			path: ['confirmPassword'],
		}
	);

export type EditUserFormData = z.infer<typeof editUserFormSchema>;
