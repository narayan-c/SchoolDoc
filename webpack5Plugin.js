module.exports = function (context, options) {
    return {
        name: 'custom-docusaurus-plugin',
        // eslint-disable-next-line
        configureWebpack(config, isServer, utils) {
            return {
                resolve: {
                    fallback: {
                        fs: false,
                        http: false,//require.resolve('stream-http'),
                        https: false,//require.resolve('https-browserify'),
                        os: false,
                        buffer: false,
                        querystring: false,
                        url: false,
                        stream: false,
                        path: false,
                        util: false,
                        crypto: false,
                        assert: false,
                        net: false,
                        tls: false,
                        child_process: false//require.resolve('child_process'),
                    },
                },
            };
        },
    };
};