var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'node_modules/es6-promise/dist/es6-promise.js',
            'src/test/**/*.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            'src/test/**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity,

        // Increase timeouts to prevent the issue with disconnected tests (https://goo.gl/nstA69)
        captureTimeout: 4 * 60 * 1000,
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 4 * 60 * 1000,

        // increase mocha timeout
        client: {
            mocha: {
                timeout: 20000 // 20 seconds
            }
        }
    })
};