const path = require('path');
const webpack = require('webpack');

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
        umdNamedDefine: true,
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
            {
                test: /\.ts$/,
                loader: 'lodash-ts-imports-loader',
                exclude: /node_modules/,
                enforce: "pre"
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: "babel-loader"
            // }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ]
};