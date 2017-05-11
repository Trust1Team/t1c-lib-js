var webpack = require("webpack"),
    path = require("path"),
    yargs = require("yargs");

var libraryName = 'GCLLib',
    plugins = [],
    outputFile;

if (yargs.argv.p) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + ".min.js"
} else {
    outputFile = libraryName + ".js";
}

var config = {
    entry: "./src/scripts/core/GCLLib.ts",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: outputFile,
        library: libraryName,
        libraryTarget: "umd",
        umdNamedDefine: true
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
