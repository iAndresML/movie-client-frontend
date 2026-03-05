/**
 * LoadingSkeleton — shown while fetching movies (loading state).
 * Renders animated placeholder cards that mimic the MovieCard layout.
 */
export default function LoadingSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-white/5 bg-[var(--color-card)] animate-pulse-slow"
                    style={{ animationDelay: `${i * 60}ms` }}
                >
                    {/* Poster skeleton */}
                    <div className="aspect-[2/3] w-full bg-[var(--color-surface)]" />
                    {/* Content skeleton */}
                    <div className="p-3 flex flex-col gap-2">
                        <div className="h-3 w-3/4 rounded bg-white/5" />
                        <div className="h-3 w-1/3 rounded bg-white/5" />
                        <div className="h-2 w-full rounded bg-white/5 mt-1" />
                        <div className="h-2 w-5/6 rounded bg-white/5" />
                    </div>
                </div>
            ))}
        </div>
    );
}
