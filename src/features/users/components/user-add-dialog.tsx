'use client';

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
import { addUserFormSchema, type AddUserFormData } from '../schemas';
import { useUsers } from '../context';

type AddUserDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
	const { setOpen, setCurrentRow } = useUsers();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<AddUserFormData>({
		resolver: zodResolver(addUserFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			phoneNumber: '',
			role: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: AddUserFormData) => {
		reset();
		console.log('Add user:', values);
		setOpen(null);
		setCurrentRow(null);
	};

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
					<DialogTitle>Add New User</DialogTitle>
					<DialogDescription>Create new user here. Click save when you&apos;re done.</DialogDescription>
				</DialogHeader>
				<div className="h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
					<form id="add-user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-0.5">
						{/* First Name */}
						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">First Name</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.firstName} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input placeholder="John" autoComplete="off" {...register('firstName')} />
										</TooltipTrigger>
										{errors.firstName && (
											<TooltipContent side="top">{errors.firstName.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						{/* Last Name */}
						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Last Name</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.lastName} delayDuration={0}>
										<TooltipTrigger asChild>
											<Input placeholder="Doe" autoComplete="off" {...register('lastName')} />
										</TooltipTrigger>
										{errors.lastName && (
											<TooltipContent side="top">{errors.lastName.message}</TooltipContent>
										)}
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						{/* Username */}
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

						{/* Email */}
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

						{/* Phone Number */}
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

						{/* Role */}
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
								{errors.role && <span className="text-sm text-destructive">{errors.role.message}</span>}
							</div>
						</div>

						{/* Password */}
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

						{/* Confirm Password */}
						<div className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
							<Label className="col-span-2 text-end">Confirm Password</Label>
							<div className="col-span-4">
								<TooltipProvider>
									<Tooltip open={!!errors.confirmPassword} delayDuration={0}>
										<TooltipTrigger asChild>
											<PasswordInput
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
					<Button type="submit" form="add-user-form">
						Save User
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
