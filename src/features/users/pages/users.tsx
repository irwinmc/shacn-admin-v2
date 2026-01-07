import { UsersPrimaryButtons } from '../components/users-primary-buttons';
import { UsersTable } from '../components/users-table';
import { UsersDialogs } from '../components/users-dialogs';
import { UsersProvider } from '../context';
import { users } from '../data';

export const Users = () => {
	return (
		<UsersProvider>
			<UsersDialogs />
			<div className="px-4 lg:px-6 space-y-4">
				<div className="flex flex-wrap items-end justify-between gap-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">User List</h2>
						<p className="text-muted-foreground">Manage your users and their roles here.</p>
					</div>
					<UsersPrimaryButtons />
				</div>
				<UsersTable data={users} />
			</div>
		</UsersProvider>
	);
};
