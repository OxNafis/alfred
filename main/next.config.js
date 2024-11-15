/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SHOW_DONATE: process.env.SHOW_DONATE || "",
        SHOW_TWEET: process.env.SHOW_TWEET || "",
        SITE_URL: process.env.SITE_URL || "",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || ""
    }
};

module.exports = nextConfig;
