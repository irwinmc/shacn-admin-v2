import { GalleryVerticalEnd } from 'lucide-react';

import { SidebarMenuButton } from '@/components/ui/sidebar';

export function AppTitle() {
	return (
		<SidebarMenuButton
			size="lg"
			className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
		>
			<div className="flex gap-2 items-center">
				<div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
					<GalleryVerticalEnd className="size-4" />
				</div>

				<div className="flex flex-col gap-0.5 text-start text-sm leading-tight">
					<span className="truncate font-bold">Shadcn-Admin</span>
					<span className="truncate text-xs">Vite + ShadcnUI</span>
				</div>
			</div>
		</SidebarMenuButton>
	);
}
