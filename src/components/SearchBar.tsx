'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

/**
 * SearchBar component
 * - Controlled input managing local state
 * - On submit (Enter or button click) → navigates to /search?query=
 * - Immediate navigation: the search page handles the debounce via useSearch hook
 */
export default function SearchBar({ initialQuery = '' }: { initialQuery?: string }) {
    const [query, setQuery] = useState(initialQuery);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    };

    const handleClear = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xl mx-auto gap-2"
            role="search"
            aria-label="Search movies"
        >
            <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-sm pointer-events-none">
                    🔍
                </span>
                <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[var(--color-surface)] border border-white/10 text-white placeholder-[var(--color-muted)] text-sm focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all"
                    aria-label="Movie search input"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-white transition-colors text-xs"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            <button
                type="submit"
                disabled={!query.trim()}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95"
                aria-label="Search"
            >
                Search
            </button>
        </form>
    );
}
