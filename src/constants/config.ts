export const APP_CONFIG = {
	NAME: 'Zea Ops',
	VERSION: '0.0.1',
	DESCRIPTION: 'Modern Admin Dashboard for Zea Ops',
	AUTHOR: 'Zea Ops Team',
} as const;

export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL,
	TIMEOUT: 30000,
	RETRY_COUNT: 3,
	DELAY: import.meta.env.DEV ? 1000 : 0,
} as const;

export const STORAGE_KEYS = {
	AUTH_TOKEN: 'auth_token',
	REFRESH_TOKEN: 'refresh_token',
	USER_DATA: 'user_data',
	THEME: 'mantine_theme',
	LANGUAGE: 'app_language',
} as const;

export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_PAGE_SIZE: 10,
	PAGE_SIZE_OPTIONS: [5, 10, 15, 20, 50, 100],
} as const;

export const DATE_FORMATS = {
	DEFAULT: 'YYYY-MM-DD',
	DISPLAY: 'MMM DD, YYYY',
	FULL: 'YYYY-MM-DD HH:mm:ss',
	TIME: 'HH:mm:ss',
} as const;
