import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { AppTitle } from './app-title';
import { sidebarData } from './data/sidebar-data';
import { NavGroup } from './nav-group';
import { NavUser } from './nav-user';
import { LAYOUT_CONFIG } from '@/constants/config';

export function AppSidebar() {
	return (
		<Sidebar collapsible={LAYOUT_CONFIG.SIDEBAR_COLLAPSIBLE} variant={LAYOUT_CONFIG.SIDEBAR_VARIANT}>
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
