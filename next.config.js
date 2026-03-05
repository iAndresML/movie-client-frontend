/** @type {import('next').NextConfig} */
const nextConfig = {
    // Standalone output for Docker multi-stage builds
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
                pathname: '/t/p/**',
            },
        ],
    },
    // All API calls go through the proxy — never directly to TMDB
};

module.exports = nextConfig;
