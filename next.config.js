/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // Otimizações para produção
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true
}

module.exports = nextConfig
