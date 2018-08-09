const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
        umdNamedDefine: true,
    },
    externals: {
        lodash: {
            commonjs: '_',
            commonjs2: '_',
            amd: '_',
            root: '_',
            umd: '_'
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
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
            }
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: "babel-loader"
            // }
        ]
    }
};