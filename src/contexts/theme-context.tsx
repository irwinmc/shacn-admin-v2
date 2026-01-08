import React, { useState, useLayoutEffect } from 'react';

export type Theme = 'dark' | 'light';

export type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: 'light',
	setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
	const [theme, setThemeState] = useState<Theme>(defaultTheme);

	useLayoutEffect(() => {
		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(theme);
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	const value: ThemeProviderState = {
		theme,
		setTheme,
	};

	return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
	const context = React.useContext(ThemeProviderContext);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
}
