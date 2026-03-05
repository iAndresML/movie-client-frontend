'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useSearch } from '@/hooks/useSearch';
import MovieGrid from '@/components/MovieGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import SearchBar from '@/components/SearchBar';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const state = useSearch(query);

    return (
        <div>
            {/* Search header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                    {query ? (
                        <>
                            Results for{' '}
                            <span className="text-brand-300">&ldquo;{query}&rdquo;</span>
                        </>
                    ) : (
                        'Search Movies'
                    )}
                </h1>
                <div className="mt-4 max-w-md mx-auto">
                    <SearchBar initialQuery={query} />
                </div>
            </div>

            {/* State machine */}
            {state.status === 'idle' && (
                <div className="text-center py-24 text-[var(--color-muted)]">
                    <div className="text-5xl mb-4">🔍</div>
                    <p>Type a movie title to search</p>
                </div>
            )}

            {state.status === 'loading' && <LoadingSkeleton count={8} />}

            {state.status === 'error' && (
                <ErrorMessage message={state.message} />
            )}

            {state.status === 'success' && (
                <>
                    <MovieGrid
                        movies={state.data.results}
                        title={`Found ${state.data.totalResults} results`}
                    />
                </>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<LoadingSkeleton count={8} />}>
            <SearchResults />
        </Suspense>
    );
}
