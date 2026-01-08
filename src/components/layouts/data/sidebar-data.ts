import { LayoutDashboard, Package, Settings, Users, AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import { type SidebarData } from '../types';

export const sidebarData: SidebarData = {
	user: {
		name: 'satnaing',
		email: 'satnaingdev@gmail.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Shadcn Admin',
			logo: Command,
			plan: 'Vite + ShadcnUI',
		},
		{
			name: 'Acme Inc',
			logo: GalleryVerticalEnd,
			plan: 'Enterprise',
		},
		{
			name: 'Acme Corp.',
			logo: AudioWaveform,
			plan: 'Startup',
		},
	],
	navGroups: [
		{
			title: 'General',
			items: [
				{
					title: 'Dashboard',
					url: '/',
					icon: LayoutDashboard,
				},
				{
					title: 'Users',
					url: '/users',
					icon: Users,
				},
				{
					title: 'Apps',
					url: '/apps',
					icon: Package,
				},
			],
		},
		{
			title: 'AI',
			items: [
				{
					title: 'Chatbot',
					url: '/chatbot',
					icon: AudioWaveform,
				},
			],
		},
		{
			title: 'Other',
			items: [
				{
					title: 'Settings',
					url: '/settings',
					icon: Settings,
				},
			],
		},
	],
};
