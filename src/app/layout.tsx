import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'SOA Movie Explorer',
    description:
        'Browse and discover movies powered by TMDB, served through a secure SOA backend proxy.',
    keywords: ['movies', 'TMDB', 'Next.js', 'SOA'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {/* ── Navigation ── */}
                <header className="sticky top-0 z-50 border-b border-white/5 bg-[var(--color-bg)]/80 backdrop-blur-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 flex-wrap">
                        <Link
                            href="/"
                            className="text-lg font-bold text-white flex items-center gap-2 shrink-0 hover:text-brand-300 transition-colors"
                        >
                            🎬 <span>Movie Explorer</span>
                        </Link>

                        <div className="flex-1 min-w-[200px] max-w-md">
                            <SearchBar />
                        </div>

                        <nav className="flex items-center gap-4 ml-auto text-sm text-[var(--color-muted)]">
                            <Link
                                href="/"
                                className="hover:text-white transition-colors"
                            >
                                Popular
                            </Link>
                            <span className="text-white/10">|</span>
                            <a
                                href="http://localhost:4000/health"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                API Status
                            </a>
                        </nav>
                    </div>
                </header>

                {/* ── Main Content ── */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>

                {/* ── Footer ── */}
                <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-[var(--color-muted)]">
                    <p>
                        Movie data provided by{' '}
                        <a
                            href="https://www.themoviedb.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-400 hover:underline"
                        >
                            TMDB
                        </a>
                        {' '}via a secure SOA proxy (port 4000)
                    </p>
                    <p className="mt-1 text-white/20">
                        Architecture: Frontend :3000 → Proxy :4000 → TMDB API
                    </p>
                </footer>
            </body>
        </html>
    );
}
