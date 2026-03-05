'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMovieDetail } from '@/hooks/useMovieDetail';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * Movie Detail Page
 * Shows full movie information: backdrop, poster, title, tagline,
 * genres, rating, runtime, release date, and overview.
 */
export default function MovieDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const movieId = parseInt(id);
    const state = useMovieDetail(movieId);

    if (state.status === 'loading') {
        return (
            <div className="py-8">
                <LoadingSkeleton count={1} />
            </div>
        );
    }

    if (state.status === 'error') {
        return <ErrorMessage message={state.message} />;
    }

    if (state.status !== 'success') return null;

    const movie = state.data;
    const year = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : 'N/A';
    const runtimeH = movie.runtime ? Math.floor(movie.runtime / 60) : null;
    const runtimeM = movie.runtime ? movie.runtime % 60 : null;

    return (
        <article className="animate-fade-in">
            {/* Backdrop hero */}
            {movie.backdropUrl && (
                <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-8 h-64 sm:h-80 overflow-hidden">
                    <Image
                        src={movie.backdropUrl}
                        alt={`${movie.title} backdrop`}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="flex flex-col sm:flex-row gap-6 -mt-20 relative z-10">
                {/* Poster */}
                {movie.posterUrl && (
                    <div className="relative w-36 h-52 sm:w-48 sm:h-72 rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-2xl">
                        <Image
                            src={movie.posterUrl}
                            alt={`${movie.title} poster`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Info */}
                <div className="flex-1 pt-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                        {movie.title}
                    </h1>

                    {movie.tagline && (
                        <p className="text-[var(--color-muted)] italic text-sm mt-1 mb-3">
                            &ldquo;{movie.tagline}&rdquo;
                        </p>
                    )}

                    {/* Meta badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-brand-600/30 text-brand-300 border border-brand-500/30 text-xs font-semibold">
                            ⭐ {movie.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-[var(--color-muted)]">{year}</span>
                        {runtimeH !== null && (
                            <span className="text-xs text-[var(--color-muted)]">
                                {runtimeH}h {runtimeM}m
                            </span>
                        )}
                        {movie.genres?.map((genre) => (
                            <span
                                key={genre}
                                className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--color-muted)]"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>

                    {/* Overview */}
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-prose">
                        {movie.overview || 'No overview available.'}
                    </p>
                </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
                <Link
                    href="/"
                    className="text-sm text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
                >
                    ← Back to Popular Movies
                </Link>
            </div>
        </article>
    );
}
