import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/interfaces/movie.types';

interface MovieCardProps {
    movie: Movie;
}

const PLACEHOLDER_POSTER = '/poster-placeholder.svg';

function RatingBadge({ rating }: { rating: number }) {
    const color =
        rating >= 7.5
            ? 'bg-green-500/20 text-green-400 border-green-500/30'
            : rating >= 5
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                : 'bg-red-500/20 text-red-400 border-red-500/30';

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}
        >
            ⭐ {rating.toFixed(1)}
        </span>
    );
}

/**
 * MovieCard displays:
 * - Poster image
 * - Title
 * - Rating badge
 * - Release date
 * - Short overview (2 lines max)
 *
 * Clicking navigates to /movies/[id] for the detail page.
 */
export default function MovieCard({ movie }: MovieCardProps) {
    const releaseYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : 'N/A';

    return (
        <Link href={`/movies/${movie.id}`} className="group block">
            <article className="h-full flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-[var(--color-card)] transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
                {/* Poster */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--color-surface)]">
                    <Image
                        src={movie.posterUrl ?? PLACEHOLDER_POSTER}
                        alt={`${movie.title} poster`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={!movie.posterUrl}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Rating on top of poster */}
                    <div className="absolute bottom-2 left-2">
                        <RatingBadge rating={movie.rating} />
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 gap-1">
                    <h3
                        className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-brand-300 transition-colors"
                        title={movie.title}
                    >
                        {movie.title}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)]">{releaseYear}</p>
                    {movie.overview && (
                        <p className="text-xs text-[var(--color-muted)] line-clamp-3 mt-1 leading-relaxed">
                            {movie.overview}
                        </p>
                    )}
                </div>
            </article>
        </Link>
    );
}
