'use client';

import { useState, useEffect, useCallback } from 'react';
import { Movie, MovieListResponse, ApiResponse, FetchState } from '@/interfaces/movie.types';
import { apiClient } from '@/lib/api';

interface UseMoviesReturn {
    state: FetchState<MovieListResponse>;
    refetch: () => void;
}

/**
 * useMovies — fetches the popular movies list from the backend proxy.
 *
 * Implements the 3 required UI states:
 *   - loading  → show skeleton/spinner
 *   - success  → show movie cards
 *   - error    → show error message
 *
 * IMPORTANT: Calls /api/movies/popular on the proxy (port 4000),
 * NOT directly to TMDB.
 */
export function useMovies(page = 1): UseMoviesReturn {
    const [state, setState] = useState<FetchState<MovieListResponse>>({
        status: 'loading',
    });

    const fetchMovies = useCallback(async () => {
        setState({ status: 'loading' });
        try {
            const response = await apiClient.get<ApiResponse<MovieListResponse>>(
                `/api/movies/popular?page=${page}`
            );
            if (response.success) {
                setState({ status: 'success', data: response.data });
            } else {
                setState({ status: 'error', message: 'Failed to load movies.' });
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'An unexpected error occurred.';
            setState({ status: 'error', message });
        }
    }, [page]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return { state, refetch: fetchMovies };
}
