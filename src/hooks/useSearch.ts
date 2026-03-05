'use client';

import { useState, useEffect, useCallback } from 'react';
import { MovieListResponse, ApiResponse, FetchState } from '@/interfaces/movie.types';
import { apiClient } from '@/lib/api';

/**
 * useSearch — searches movies via the backend proxy.
 * Calls GET /api/movies/search?query=<q>
 * Debounces input by 400ms to avoid flooding requests.
 */
export function useSearch(query: string) {
    const [state, setState] = useState<FetchState<MovieListResponse>>({
        status: 'idle',
    });

    const search = useCallback(async (q: string) => {
        if (!q.trim()) {
            setState({ status: 'idle' });
            return;
        }
        setState({ status: 'loading' });
        try {
            const response = await apiClient.get<ApiResponse<MovieListResponse>>(
                `/api/movies/search?query=${encodeURIComponent(q.trim())}`
            );
            if (response.success) {
                setState({ status: 'success', data: response.data });
            } else {
                setState({ status: 'error', message: 'Search failed. Please try again.' });
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Search request failed.';
            setState({ status: 'error', message });
        }
    }, []);

    useEffect(() => {
        // Debounce: wait 400ms after typing stops
        const timer = setTimeout(() => {
            search(query);
        }, 400);

        return () => clearTimeout(timer);
    }, [query, search]);

    return state;
}
