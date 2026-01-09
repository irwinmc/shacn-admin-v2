import axios from 'axios';
import type { ApiError } from '@/types';

export function formatApiError(error: unknown): Error {
	if (axios.isAxiosError<ApiError>(error)) {
		const status = error.response?.status;
		const data = error.response?.data;

		const message = data?.message ?? error.message ?? 'Request failed';

		const err = new Error(message) as Error & {
			status?: number;
			code?: string;
		};

		err.status = status;
		err.code = data?.code ?? String(status ?? 'UNKNOWN');

		return err;
	}

	return error instanceof Error ? error : new Error('Unknown error');
}
