import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { AppTitle } from './app-title';
import { sidebarData } from './data/sidebar-data';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<AppTitle />
			</SidebarHeader>
			<SidebarContent>
				{sidebarData.navGroups.map(props => (
					<NavGroup key={props.title} {...props} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={sidebarData.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
