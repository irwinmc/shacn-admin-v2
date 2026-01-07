import { AddUserDialog } from './add-user-dialog';
import { EditUserDialog } from './edit-user-dialog';
import { UsersDeleteDialog } from './users-delete-dialog';
import { UsersInviteDialog } from './users-invite-dialog';
import { useUsers } from './users-provider';

export function UsersDialogs() {
	const { open, setOpen, currentRow } = useUsers();
	return (
		<>
			<AddUserDialog key="user-add" open={open === 'add'} onOpenChange={() => setOpen('add')} />

			<UsersInviteDialog key="user-invite" open={open === 'invite'} onOpenChange={() => setOpen('invite')} />

			<EditUserDialog
				key={`user-edit-${currentRow?.id}`}
				open={open === 'edit'}
				onOpenChange={() => setOpen('edit')}
				currentRow={currentRow || undefined}
			/>

			{currentRow && (
				<UsersDeleteDialog
					key={`user-delete-${currentRow.id}`}
					open={open === 'delete'}
					onOpenChange={() => setOpen('delete')}
					currentRow={currentRow}
				/>
			)}
		</>
	);
}
