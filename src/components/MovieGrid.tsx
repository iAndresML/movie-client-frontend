import { Movie } from '@/interfaces/movie.types';
import MovieCard from './MovieCard';

interface MovieGridProps {
    movies: Movie[];
    title?: string;
}

/**
 * MovieGrid renders a responsive grid of MovieCards.
 * Adapts from 2 columns (mobile) to 5 columns (xl screens).
 */
export default function MovieGrid({ movies, title }: MovieGridProps) {
    if (movies.length === 0) {
        return (
            <div className="text-center py-20 text-[var(--color-muted)]">
                <div className="text-5xl mb-4">🎬</div>
                <p className="text-lg font-medium">No movies found</p>
                <p className="text-sm mt-1">Try a different search term.</p>
            </div>
        );
    }

    return (
        <section>
            {title && (
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-brand-400">▍</span>
                    {title}
                </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="animate-slide-up">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </section>
    );
}
