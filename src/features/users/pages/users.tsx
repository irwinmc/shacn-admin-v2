import { getRouteApi } from '@tanstack/react-router';
import { UsersPrimaryButtons } from '../components/users-primary-buttons';
import { UsersProvider } from '../components/users-provider';
import { UsersTable } from '../components/users-table';
import { users } from '../data';

const route = getRouteApi('/_authenticated/users/');

export const Users = () => {
	const search = route.useSearch();
	const navigate = route.useNavigate();

	return (
		<UsersProvider>
			<div className="px-4 lg:px-6">
				<div className="flex flex-wrap items-end justify-between gap-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">User List</h2>
						<p className="text-muted-foreground">Manage your users and their roles here.</p>
					</div>
					<UsersPrimaryButtons />
				</div>
				<div className="px-4 lg:px-6 space-y-6">
					<UsersTable data={users} search={search} navigate={navigate} />
				</div>
			</div>
		</UsersProvider>
	);
};
