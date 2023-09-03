/** @type {import('next').NextConfig} */
const packageJson = require('./package.json');

const nextConfig = {
    env: {
        NEXT_PUBLIC_APP_VERSION: packageJson.version
    }
}

module.exports = nextConfig
