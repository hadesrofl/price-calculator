/** @type {import('next').NextConfig} */
const packageJson = require('./package.json');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = {
    env: {
        NEXT_PUBLIC_APP_VERSION: packageJson.version
    },
    output: 'export',
}

module.exports = (phase, { }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) return {
        images: {
            unoptimized: true
        }, 
        ...nextConfig
    }

    return nextConfig;
}
