var webpack = require("webpack"),
    path = require("path");

var libraryName = 'GCLLib',
    plugins = [ new DtsBundlePlugin(), new webpack.optimize.UglifyJsPlugin({
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
        ],
        noParse: /jquery|lodash/
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

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
    compiler.plugin('done', function(){
        var dts = require('dts-bundle');

        dts.bundle({
            name: libraryName,
            main: 'src/scripts/core/GCLLib.d.ts',
            out: path.resolve(__dirname, "dist") + '/GCLLib.d.ts',
            removeSource: true,
            outputAsModuleFolder: true // to use npm in-package typings
        });
    });
};

module.exports = config;
