/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack(config, {isServer}) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    experimental: {
        incrementalCacheHandlerPath: require.resolve('./cache-handler'),
        // isrMemoryCacheSize: 0,
    },
    poweredByHeader:false,
    optimizeFonts:false,
}

module.exports = nextConfig

