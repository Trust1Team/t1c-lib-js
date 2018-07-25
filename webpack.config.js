const path = require('path');

module.exports = {
    entry: ["./src/scripts/core/GCLLib.ts"],
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'GCLLib.min.js',
        library: 'GCLLib'
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    //plugins: [new DtsBundlePlugin()]
};