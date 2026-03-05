/**
 * Centralized HTTP client that always targets the backend proxy.
 * The frontend NEVER directly calls TMDB — all requests pass through
 * movie-service-proxy to protect the API key.
 */

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(path: string): Promise<T> {
        const url = `${this.baseUrl}${path}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 }, // ISR: revalidate every 60s for Server Components
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const message =
                errorBody?.error?.message || `HTTP error ${response.status}`;
            throw new Error(message);
        }

        return response.json() as Promise<T>;
    }

    get<T>(path: string): Promise<T> {
        return this.request<T>(path);
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
