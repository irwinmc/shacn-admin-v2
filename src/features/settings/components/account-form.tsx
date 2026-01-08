import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Field, FieldContent, FieldError } from '@/components/ui/field';
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
						<Field>
							<label className="text-sm font-medium">First Name</label>
							<FieldContent>
								<Input
									placeholder="Enter your first name"
									aria-invalid={!!errors.firstName}
									{...register('firstName')}
								/>
								<FieldError errors={[errors.firstName]} />
							</FieldContent>
						</Field>

						{/* Last Name */}
						<Field>
							<label className="text-sm font-medium">Last Name</label>
							<FieldContent>
								<Input
									placeholder="Enter your last name"
									aria-invalid={!!errors.lastName}
									{...register('lastName')}
								/>
								<FieldError errors={[errors.lastName]} />
							</FieldContent>
						</Field>
					</div>

					{/* Email */}
					<Field>
						<label className="text-sm font-medium">Email Address</label>
						<FieldContent>
							<Input
								type="email"
								placeholder="Enter your email"
								aria-invalid={!!errors.email}
								{...register('email')}
							/>
							<FieldError errors={[errors.email]} />
						</FieldContent>
					</Field>

					{/* Username */}
					<Field>
						<label className="text-sm font-medium">Username</label>
						<FieldContent>
							<Input
								placeholder="Enter your username"
								aria-invalid={!!errors.username}
								{...register('username')}
							/>
							<FieldError errors={[errors.username]} />
						</FieldContent>
					</Field>
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
					<Field>
						<label className="text-sm font-medium">Current Password</label>
						<FieldContent>
							<Input
								type="password"
								placeholder="Enter current password"
								aria-invalid={!!errors.currentPassword}
								{...register('currentPassword')}
							/>
							<FieldError errors={[errors.currentPassword]} />
						</FieldContent>
					</Field>

					{/* New Password */}
					<Field>
						<label className="text-sm font-medium">New Password</label>
						<FieldContent>
							<Input
								type="password"
								placeholder="Enter new password"
								aria-invalid={!!errors.newPassword}
								{...register('newPassword')}
							/>
							<FieldError errors={[errors.newPassword]} />
						</FieldContent>
					</Field>

					{/* Confirm Password */}
					<Field>
						<label className="text-sm font-medium">Confirm New Password</label>
						<FieldContent>
							<Input
								type="password"
								placeholder="Confirm new password"
								aria-invalid={!!errors.confirmPassword}
								{...register('confirmPassword')}
							/>
							<FieldError errors={[errors.confirmPassword]} />
						</FieldContent>
					</Field>
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
