'use client';

import { useState, useEffect } from 'react';
import { Movie, ApiResponse, FetchState } from '@/interfaces/movie.types';
import { apiClient } from '@/lib/api';

/**
 * useMovieDetail — fetches a single movie by ID from the backend proxy.
 * Calls GET /api/movies/:id
 */
export function useMovieDetail(id: number): FetchState<Movie> {
    const [state, setState] = useState<FetchState<Movie>>({ status: 'loading' });

    useEffect(() => {
        let cancelled = false;

        const fetchDetail = async () => {
            setState({ status: 'loading' });
            try {
                const response = await apiClient.get<ApiResponse<Movie>>(
                    `/api/movies/${id}`
                );
                if (!cancelled) {
                    if (response.success) {
                        setState({ status: 'success', data: response.data });
                    } else {
                        setState({ status: 'error', message: 'Movie not found.' });
                    }
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    const message =
                        err instanceof Error ? err.message : 'Failed to load movie detail.';
                    setState({ status: 'error', message });
                }
            }
        };

        fetchDetail();

        // Cleanup: ignore the result if the component unmounted
        return () => {
            cancelled = true;
        };
    }, [id]);

    return state;
}
