import { Check, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useLanguageStore from '@/stores/lang-store';
import { LANGUAGES, type Language } from '@/types';

export function LangSelector() {
	const lang = useLanguageStore(state => state.language);

	const onLangChange = (newLang: Language) => {
		useLanguageStore.setState({ language: newLang });
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="size-8 rounded-md">
					<Languages className="size-4" />
					<span className="sr-only">Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{(Object.entries(LANGUAGES) as [Language, string][]).map(([code, name]) => (
					<DropdownMenuItem key={code} onClick={() => onLangChange(code)}>
						{name}
						<Check size={14} className={cn('ms-auto', lang !== code && 'hidden')} />
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
