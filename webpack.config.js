const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
    console.log(argv.mode);
    return {
        mode: argv.mode,
        entry:
            argv.mode === 'production' ? {
                'GCLLib.min': './src/index.ts'
            } : {
                'GCLLib': './src/index.ts',
            },
        devtool: argv.mode === 'production' ? "source-map" : "eval-source-map",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name].js',
            library: 'GCLLib',
            libraryTarget: "umd",
            umdNamedDefine: true,
        },
        plugins:
            argv.mode === 'production' ? [
                new webpack.DefinePlugin({
                    VERSION: JSON.stringify(require("./package.json").version)
                }),
            ] : [
                new webpack.DefinePlugin({
                    VERSION: JSON.stringify(require("./package.json").version)
                }),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false
                })
            ],
        optimization: argv.mode === 'production' ? {
            minimize: true,
            minimizer: [new UglifyJsPlugin({
                include: /\.min\.js$/
            })]
        } : {
            minimize: false
        },
        resolve: {
            extensions: [".ts", ".js", ".tsx", ".jsx"]
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(pkijs|asn1|asn1js|pvutils)\/).*/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015"]
                        }
                    }
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                }
            ]
        }
    }
};