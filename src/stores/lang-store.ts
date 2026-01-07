import type { Language } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStore {
	language: Language;
	setLanguage: (language: Language) => void;
}

const useLanguageStore = create<LanguageStore>()(
	persist(
		set => ({
			language: 'en',
			setLanguage: (language: Language) => set({ language }),
		}),
		{
			name: 'language-store',
		}
	)
);

export default useLanguageStore;
