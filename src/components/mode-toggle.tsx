import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/theme-context';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<Button variant="outline" size="icon" className="size-8 rounded-md" onClick={toggleTheme}>
			{theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
