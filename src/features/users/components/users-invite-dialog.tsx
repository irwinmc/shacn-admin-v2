import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailPlus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SelectDropdown } from '@/components/select-dropdown';
import { roles } from '../data';

const formSchema = z.object({
	email: z.email({
		error: iss => (iss.input === '' ? 'Please enter an email to invite.' : undefined),
	}),
	role: z.string().min(1, 'Role is required.'),
	desc: z.string().optional(),
});

type UserInviteForm = z.infer<typeof formSchema>;

type UserInviteDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function UsersInviteDialog({ open, onOpenChange }: UserInviteDialogProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<UserInviteForm>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', role: '', desc: '' },
	});

	const onSubmit = (values: UserInviteForm) => {
		reset();
		console.log(values);
		onOpenChange(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={state => {
				reset();
				onOpenChange(state);
			}}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="text-start">
					<DialogTitle className="flex items-center gap-2">
						<MailPlus /> Invite User
					</DialogTitle>
					<DialogDescription>
						Invite new user to join your team by sending them an email invitation. Assign a role to define
						their access level.
					</DialogDescription>
				</DialogHeader>
				<form id="user-invite-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid gap-3">
						<Label htmlFor="email">Email</Label>
						<TooltipProvider>
							<Tooltip open={!!errors.email} delayDuration={0}>
								<TooltipTrigger asChild>
									<Input
										id="email"
										type="email"
										placeholder="eg: john.doe@gmail.com"
										{...register('email')}
									/>
								</TooltipTrigger>
								{errors.email && (
									<TooltipContent side="top">{errors.email.message}</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>

					<div className="grid gap-3">
						<Label htmlFor="role">Role</Label>
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

					<div className="grid gap-3">
						<Label htmlFor="desc">Description (optional)</Label>
						<Textarea
							id="desc"
							className="resize-none"
							placeholder="Add a personal note to your invitation (optional)"
							{...register('desc')}
						/>
					</div>
				</form>
				<DialogFooter className="gap-y-2">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form="user-invite-form">
						Invite <Send />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
