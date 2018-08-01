module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon', 'karma-typescript'],
        preprocessors: {
            "src/test/**/*.ts": "karma-typescript"
        },
        reporters: ["progress", "karma-typescript" , "html"],
        plugins: [require('karma-htmlfile-reporter'), require('progress'), require('karma-mocha'),
                  require('karma-phantomjs-launcher'), require('karma-chai'), require('karma-sinon'), require('karma-typescript')],
        files: [
            'src/test/**/*.ts'
        ],
        exclude: ["src/**/*.d.ts"],
        htmlReporter: {
            outputFile: 'reports/unit-tests.html',
            pageTitle: 'Trust1Connector JS Library',
            subPageTitle: 'Unit Tests',
            groupSuites: true,
            useCompactStyle: true,
            useLegacyStyle: false
        },
        karmaTypescriptConfig: {
            include: ["src/test/**/*.ts"],
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")()
                ],
            },
            tsconfig: "./tsconfig.json"
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        browsers: ['PhantomJS'],
        singleRun: true,
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