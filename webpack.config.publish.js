var webpack = require("webpack"),
    path = require("path");

var libraryName = 'GCLLib',
    plugins = [ new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            drop_console: true,
            drop_debugger: true
        },
        output: {
            comments: false
        }
    }) ],
    outputFile = libraryName + ".min.js";

var config = {
    entry: [ "babel-polyfill", "./src/scripts/core/GCLLib.ts" ],
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: outputFile,
        library: libraryName
    },
    module: {
        preloaders: [
            { test: /\.tsx?$/, loader: "tslint", exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ""]
    },
    plugins: plugins,
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
};

module.exports = config;
