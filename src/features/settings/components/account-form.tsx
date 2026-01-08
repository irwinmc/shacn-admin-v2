import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { accountFormSchema, type AccountFormValues } from '../schemas';

export function AccountForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AccountFormValues>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	function onSubmit(data: AccountFormValues) {
		console.log('Form submitted:', data);
		// Here you would typically save the data
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Personal Information Card */}
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>
						Update your personal information that will be displayed on your profile.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						{/* First Name */}
						<div className="space-y-2">
							<label className="text-sm font-medium">First Name</label>
							<TooltipProvider>
								<Tooltip open={!!errors.firstName} delayDuration={0}>
									<TooltipTrigger asChild>
										<Input
											placeholder="Enter your first name"
											{...register('firstName')}
											className={errors.firstName ? 'border-destructive' : ''}
										/>
									</TooltipTrigger>
									{errors.firstName && (
										<TooltipContent side="top">{errors.firstName.message}</TooltipContent>
									)}
								</Tooltip>
							</TooltipProvider>
						</div>

						{/* Last Name */}
						<div className="space-y-2">
							<label className="text-sm font-medium">Last Name</label>
							<TooltipProvider>
								<Tooltip open={!!errors.lastName} delayDuration={0}>
									<TooltipTrigger asChild>
										<Input
											placeholder="Enter your last name"
											{...register('lastName')}
											className={errors.lastName ? 'border-destructive' : ''}
										/>
									</TooltipTrigger>
									{errors.lastName && (
										<TooltipContent side="top">{errors.lastName.message}</TooltipContent>
									)}
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>

					{/* Email */}
					<div className="space-y-2">
						<label className="text-sm font-medium">Email Address</label>
						<TooltipProvider>
							<Tooltip open={!!errors.email} delayDuration={0}>
								<TooltipTrigger asChild>
									<Input
										type="email"
										placeholder="Enter your email"
										{...register('email')}
										className={errors.email ? 'border-destructive' : ''}
									/>
								</TooltipTrigger>
								{errors.email && <TooltipContent side="top">{errors.email.message}</TooltipContent>}
							</Tooltip>
						</TooltipProvider>
					</div>

					{/* Username */}
					<div className="space-y-2">
						<label className="text-sm font-medium">Username</label>
						<TooltipProvider>
							<Tooltip open={!!errors.username} delayDuration={0}>
								<TooltipTrigger asChild>
									<Input
										placeholder="Enter your username"
										{...register('username')}
										className={errors.username ? 'border-destructive' : ''}
									/>
								</TooltipTrigger>
								{errors.username && (
									<TooltipContent side="top">{errors.username.message}</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				</CardContent>
			</Card>

			{/* Change Password Card */}
			<Card>
				<CardHeader>
					<CardTitle>Change Password</CardTitle>
					<CardDescription>Update your password to keep your account secure.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{/* Current Password */}
					<div className="space-y-2">
						<label className="text-sm font-medium">Current Password</label>
						<TooltipProvider>
							<Tooltip open={!!errors.currentPassword} delayDuration={0}>
								<TooltipTrigger asChild>
									<Input
										type="password"
										placeholder="Enter current password"
										{...register('currentPassword')}
										className={errors.currentPassword ? 'border-destructive' : ''}
									/>
								</TooltipTrigger>
								{errors.currentPassword && (
									<TooltipContent side="top">{errors.currentPassword.message}</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>

					{/* New Password */}
					<div className="space-y-2">
						<label className="text-sm font-medium">New Password</label>
						<TooltipProvider>
							<Tooltip open={!!errors.newPassword} delayDuration={0}>
								<TooltipTrigger asChild>
									<Input
										type="password"
										placeholder="Enter new password"
										{...register('newPassword')}
										className={errors.newPassword ? 'border-destructive' : ''}
									/>
								</TooltipTrigger>
								{errors.newPassword && (
									<TooltipContent side="top">{errors.newPassword.message}</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>

					{/* Confirm Password */}
					<div className="space-y-2">
						<label className="text-sm font-medium">Confirm New Password</label>
						<TooltipProvider>
							<Tooltip open={!!errors.confirmPassword} delayDuration={0}>
								<TooltipTrigger asChild>
									<Input
										type="password"
										placeholder="Confirm new password"
										{...register('confirmPassword')}
										className={errors.confirmPassword ? 'border-destructive' : ''}
									/>
								</TooltipTrigger>
								{errors.confirmPassword && (
									<TooltipContent side="top">{errors.confirmPassword.message}</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				</CardContent>
			</Card>

			{/* Danger Zone Card */}
			<Card>
				<CardHeader>
					<CardTitle>Danger Zone</CardTitle>
					<CardDescription>Irreversible and destructive actions.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Separator />
					<div className="flex flex-wrap gap-2 items-center justify-between">
						<div>
							<h4 className="font-semibold">Delete Account</h4>
							<p className="text-sm text-muted-foreground">
								Permanently delete your account and all associated data.
							</p>
						</div>
						<Button variant="destructive" type="button" className="cursor-pointer">
							Delete Account
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Action Buttons */}
			<div className="flex space-x-2">
				<Button type="submit" className="cursor-pointer">
					Save Changes
				</Button>
				<Button variant="outline" type="button" className="cursor-pointer" onClick={() => reset()}>
					Cancel
				</Button>
			</div>
		</form>
	);
}
