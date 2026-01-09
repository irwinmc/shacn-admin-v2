type AuthEvent = 'unauthorized';

const listeners = new Set<(event: AuthEvent) => void>();

export const authEvents = {
	subscribe(fn: (event: AuthEvent) => void) {
		listeners.add(fn);
		return () => listeners.delete(fn);
	},
	emit(event: AuthEvent) {
		listeners.forEach(fn => fn(event));
	},
};
