var webpack = require("webpack"),
    path = require("path");

var libraryName = 'GCLLib',
    outputFile = libraryName + ".js";


var config = {
    entry: [ "./src/scripts/core/GCLLib.ts" ],
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
        ],
        noParse: /jquery|lodash/
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ""]
    },
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
};

module.exports = config;