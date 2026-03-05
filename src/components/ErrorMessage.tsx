interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

/**
 * ErrorMessage — shown when an API request fails (error state).
 * Provides a friendly user-facing message and an optional retry button.
 */
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-fade-in">
            <div className="text-6xl mb-5">😕</div>
            <h2 className="text-xl font-bold text-white mb-2">
                Something went wrong
            </h2>
            <p className="text-[var(--color-muted)] text-sm max-w-sm mb-6">
                {message || 'We couldn\'t load the movies right now. Please make sure the backend service is running.'}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95"
                >
                    Try Again
                </button>
            )}
            <p className="text-xs text-white/20 mt-8">
                Make sure movie-service-proxy is running on port 4000
            </p>
        </div>
    );
}
