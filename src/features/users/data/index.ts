import { faker } from '@faker-js/faker';

// Set a fixed seed for consistent data generation
faker.seed(67890);

export const users = Array.from({ length: 500 }, () => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	return {
		id: faker.string.uuid(),
		firstName,
		lastName,
		username: faker.internet.username({ firstName, lastName }).toLocaleLowerCase(),
		email: faker.internet.email({ firstName }).toLocaleLowerCase(),
		phoneNumber: faker.phone.number({ style: 'international' }),
		status: faker.helpers.arrayElement(['active', 'inactive', 'invited', 'suspended']),
		role: faker.helpers.arrayElement(['superadmin', 'admin', 'cashier', 'manager']),
		createdAt: faker.date.past(),
		updatedAt: faker.date.recent(),
	};
});

import { Shield, UserCheck, Users, CreditCard } from 'lucide-react';
import { type UserStatus } from '../schemas';

export const callTypes = new Map<UserStatus, string>([
	['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
	['inactive', 'bg-neutral-300/40 border-neutral-300'],
	['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
	['suspended', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
]);

export const roles = [
	{
		label: 'Superadmin',
		value: 'superadmin',
		icon: Shield,
	},
	{
		label: 'Admin',
		value: 'admin',
		icon: UserCheck,
	},
	{
		label: 'Manager',
		value: 'manager',
		icon: Users,
	},
	{
		label: 'Cashier',
		value: 'cashier',
		icon: CreditCard,
	},
] as const;
