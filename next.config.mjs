/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: '*'}
            // {hostname: 'cdn.saeedakhshijan.com'}
        ]
    },
    experimental:{
        typedRoutes: true
    }
};

export default nextConfig;
