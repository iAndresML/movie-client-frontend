'use client';

import { useMovies } from '@/hooks/useMovies';
import MovieGrid from '@/components/MovieGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

/**
 * Home Page — Popular Movies
 *
 * Demonstrates the 3 required UI states:
 *   1. loading  → LoadingSkeleton
 *   2. success  → MovieGrid with cards
 *   3. error    → ErrorMessage with retry
 */
export default function HomePage() {
    const { state, refetch } = useMovies(1);

    return (
        <div className="animate-fade-in">
            {/* Hero section */}
            <section className="mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 bg-gradient-to-r from-brand-300 to-purple-400 bg-clip-text text-transparent">
                    Discover Movies
                </h1>
                <p className="text-[var(--color-muted)] text-sm max-w-md mx-auto">
                    Browse the most popular films — powered by TMDB, served securely
                    through our SOA backend proxy.
                </p>
            </section>

            {/* State machine */}
            {state.status === 'loading' && <LoadingSkeleton count={10} />}

            {state.status === 'error' && (
                <ErrorMessage message={state.message} onRetry={refetch} />
            )}

            {state.status === 'success' && (
                <>
                    <MovieGrid
                        movies={state.data.results}
                        title="Popular Right Now"
                    />
                    <p className="text-center text-xs text-[var(--color-muted)] mt-8">
                        Showing page {state.data.page} of {state.data.totalPages} —{' '}
                        {state.data.totalResults.toLocaleString()} movies total
                    </p>
                </>
            )}
        </div>
    );
}
