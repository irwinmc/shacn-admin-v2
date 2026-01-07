import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string({ message: '邮箱为必填项' }).min(1, '邮箱为必填项').email('请输入有效的邮箱地址'),
	password: z.string({ message: '密码为必填项' }).min(6, '密码至少6个字符'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		email: z.string({ message: '邮箱为必填项' }).min(1, '邮箱为必填项').email('请输入有效的邮箱地址'),
		password: z.string({ message: '密码为必填项' }).min(6, '密码至少6个字符'),
		confirmPassword: z.string({ message: '确认密码为必填项' }).min(1, '确认密码为必填项'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: '两次输入的密码不一致',
		path: ['confirmPassword'],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
