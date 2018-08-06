const path = require('path');

module.exports = {
    entry: {
        'GCLLib': './src/index.ts',
        'GCLLib.min': './src/index.ts'
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
        library: 'GCLLib',
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: '_',
            root: '_'
        }
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: "babel-loader"
            // }
        ]
    }
};