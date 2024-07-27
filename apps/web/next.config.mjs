/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY
    }
};

export default nextConfig;
