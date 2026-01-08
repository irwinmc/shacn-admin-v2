import { z } from 'zod';

export const accountFormSchema = z
	.object({
		firstName: z.string().min(1, 'First name is required'),
		lastName: z.string().min(1, 'Last name is required'),
		email: z.string().email('Invalid email address'),
		username: z.string().min(3, 'Username must be at least 3 characters'),
		currentPassword: z.string().optional(),
		newPassword: z.string().optional(),
		confirmPassword: z.string().optional(),
	})
	.refine(
		data => {
			// If newPassword is provided, currentPassword must also be provided
			if (data.newPassword && !data.currentPassword) {
				return false;
			}
			return true;
		},
		{
			message: 'Current password is required to set a new password',
			path: ['currentPassword'],
		}
	)
	.refine(
		data => {
			// Passwords must match
			if (data.newPassword && data.newPassword !== data.confirmPassword) {
				return false;
			}
			return true;
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}
	);

export type AccountFormValues = z.infer<typeof accountFormSchema>;
