import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { AppTitle } from './app-title';
import { sidebarData } from './data/sidebar-data';
import { NavGroup } from './nav-group';
import { NavFooter } from './nav-footer';
import { NavUser } from './nav-user';

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader>
				<AppTitle />
			</SidebarHeader>
			<SidebarContent>
				{sidebarData.navGroups.map(props => (
					<NavGroup key={props.title} {...props} />
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavFooter />
				<NavUser user={sidebarData.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
