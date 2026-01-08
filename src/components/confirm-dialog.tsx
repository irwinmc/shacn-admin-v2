import { cn } from '@/lib/utils';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: React.ReactNode;
	disabled?: boolean;
	desc: React.JSX.Element | string;
	cancelButtonText?: string;
	confirmButtonText?: React.ReactNode;
	destructive?: boolean;
	onConfirm: () => void;
	isLoading?: boolean;
	className?: string;
	children?: React.ReactNode;
};

export function ConfirmDialog(props: ConfirmDialogProps) {
	const {
		title,
		desc,
		children,
		className,
		confirmButtonText,
		cancelButtonText,
		destructive,
		isLoading,
		disabled = false,
		onConfirm,
		...actions
	} = props;
	return (
		<AlertDialog {...actions}>
			<AlertDialogContent className={cn(className && className)}>
				<AlertDialogHeader className="text-start">
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription asChild>
						<div className="w-full">{desc}</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				{children}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>{cancelButtonText ?? 'Cancel'}</AlertDialogCancel>
					<Button
						variant={destructive ? 'destructive' : 'default'}
						onClick={onConfirm}
						disabled={disabled || isLoading}
					>
						{confirmButtonText ?? 'Continue'}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
