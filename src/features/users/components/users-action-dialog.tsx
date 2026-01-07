'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PasswordInput } from '@/components/password-input';
import { SelectDropdown } from '@/components/select-dropdown';
import { roles } from '../data';
import { type User } from '../schemas';

const formSchema = z
	.object({
		firstName: z.string().min(1, 'First Name is required.'),
		lastName: z.string().min(1, 'Last Name is required.'),
		username: z.string().min(1, 'Username is required.'),
		phoneNumber: z.string().min(1, 'Phone number is required.'),
		email: z.email({
			error: iss => (iss.input === '' ? 'Email is required.' : undefined),
		}),
		password: z.string().transform(pwd => pwd.trim()),
		role: z.string().min(1, 'Role is required.'),
		confirmPassword: z.string().transform(pwd => pwd.trim()),
		isEdit: z.boolean(),
	})
	.refine(
		data => {
			if (data.isEdit && !data.password) return true;
			return data.password.length > 0;
		},
		{
			message: 'Password is required.',
			path: ['password'],
		}
	)
	.refine(
		({ isEdit, password }) => {
			if (isEdit && !password) return true;
			return password.length >= 8;
		},
		{
			message: 'Password must be at least 8 characters long.',
			path: ['password'],
		}
	)
	.refine(
		({ isEdit, password }) => {
			if (isEdit && !password) return true;
			return /[a-z]/.test(password);
		},
		{
			message: 'Password must contain at least one lowercase letter.',
			path: ['password'],
		}
	)
	.refine(
		({ isEdit, password }) => {
			if (isEdit && !password) return true;
			return /\d/.test(password);
		},
		{
			message: 'Password must contain at least one number.',
			path: ['password'],
		}
	)
	.refine(
		({ isEdit, password, confirmPassword }) => {
			if (isEdit && !password) return true;
			return password === confirmPassword;
		},
		{
			message: "Passwords don't match.",
			path: ['confirmPassword'],
		}
	);
type UserForm = z.infer<typeof formSchema>;

type UserActionDialogProps = {
	currentRow?: User;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function UsersActionDialog({ currentRow, open, onOpenChange }: UserActionDialogProps) {
	const isEdit = !!currentRow;
	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
		reset,
		setValue,
	} = useForm<UserForm>({
		resolver: zodResolver(formSchema),
		defaultValues: isEdit
			? {
					...currentRow,
					password: '',
					confirmPassword: '',
					isEdit,
			  }
			: {
					firstName: '',
					lastName: '',
					username: '',
					email: '',
					role: '',
					phoneNumber: '',
					password: '',
					confirmPassword: '',
					isEdit,
			  },
	});

	const onSubmit = (values: UserForm) => {
		reset();
		console.log(values);
		onOpenChange(false);
	};

	const isPasswordTouched = !!dirtyFields.password;

	return (
		<Dialog
			open={open}
			onOpenChange={state => {
				reset();
				onOpenChange(state);
			}}
		>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader className="text-start">
					<DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
					<DialogDescription>
						{isEdit ? 'Update the user here. ' : 'Create new user here. '}
						Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div className="h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
					<form id="user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-0.5">
						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">First Name</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.firstName} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input
												placeholder="John"
												autoComplete="off"
												{...register('firstName')}
											/>
										</TooltipTrigger>
										{errors.firstName && (
											<TooltipContent side="top">{errors.firstName.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Last Name</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.lastName} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input
												placeholder="Doe"
												autoComplete="off"
												{...register('lastName')}
											/>
										</TooltipTrigger>
										{errors.lastName && (
											<TooltipContent side="top">{errors.lastName.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Username</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.username} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input placeholder="john_doe" {...register('username')} />
										</TooltipTrigger>
										{errors.username && (
											<TooltipContent side="top">{errors.username.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Email</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.email} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input placeholder="john.doe@gmail.com" {...register('email')} />
										</TooltipTrigger>
										{errors.email && (
											<TooltipContent side="top">{errors.email.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Phone Number</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.phoneNumber} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input placeholder="+123456789" {...register('phoneNumber')} />
										</TooltipTrigger>
										{errors.phoneNumber && (
											<TooltipContent side="top">{errors.phoneNumber.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Role</Label>
							<div className="col-span-4">
								<SelectDropdown
									defaultValue=""
									onValueChange={value => setValue('role', value)}
									placeholder="Select a role"
									items={roles.map(({ label, value }) => ({
										label,
										value,
									}))}
								/>
								{errors.role && (
									<span className="text-sm text-destructive">{errors.role.message}</span>
								)}
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Password</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.password} delayDuration={0}>
										<TooltipTrigger asChild>
											<PasswordInput
												placeholder="e.g., S3cur3P@ssw0rd"
												{...register('password')}
											/>
										</TooltipTrigger>
										{errors.password && (
											<TooltipContent side="top">{errors.password.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Confirm Password</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.confirmPassword} delayDuration={0}>
										<TooltipTrigger asChild>
											<PasswordInput
												disabled={!isPasswordTouched}
												placeholder="e.g., S3cur3P@ssw0rd"
												{...register('confirmPassword')}
											/>
										</TooltipTrigger>
										{errors.confirmPassword && (
											<TooltipContent side="top">{errors.confirmPassword.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					</form>
				</div>
				<DialogFooter>
					<Button type="submit" form="user-form">
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
