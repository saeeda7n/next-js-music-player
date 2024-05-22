/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: '*'}
        ]
    },
    experimental:{
        typedRoutes: true
    }
};

export default nextConfig;
