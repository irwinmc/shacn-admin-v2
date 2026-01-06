import { Globe, ChevronsLeftRight } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';

export function NavFooter() {
	const { toggleSidebar } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex-1">
				<SidebarMenuButton tooltip="Language" asChild>
					<button className="w-full" title="Language">
						<Globe className="size-4" />
						<span>Language</span>
					</button>
				</SidebarMenuButton>
			</SidebarMenuItem>
			<SidebarMenuItem className="flex-1">
				<SidebarMenuButton tooltip="Toggle Sidebar" asChild>
					<button className="w-full" onClick={toggleSidebar} title="Toggle Sidebar">
						<ChevronsLeftRight className="size-4" />
						<span>Toggle</span>
					</button>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
