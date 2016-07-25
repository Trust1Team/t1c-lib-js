var path = require("path");
module.exports = {
    entry: './src/scripts/core/gclClient.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'gclClient.js',
        library: ['gclClient']
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    }
};