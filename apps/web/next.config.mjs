import MillionLint from "@million/lint";

/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY
    }
};

export default MillionLint.next({
    rsc: true,
    filter: {
      include: "**/components/*.{mtsx,mjsx,tsx,jsx}",
    },
  })(nextConfig);
