// TypeScript interfaces for the Movie domain.
// These types mirror the transformed response from movie-service-proxy.
// The frontend never touches raw TMDB types.

export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterUrl: string | null;
    backdropUrl: string | null;
    releaseDate: string;
    rating: number;
    voteCount: number;
    genres?: string[];
    runtime?: number | null;
    tagline?: string;
}

export interface MovieListResponse {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: {
        message: string;
        statusCode: number;
    };
}

// State machine for async data fetching
export type FetchState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };
