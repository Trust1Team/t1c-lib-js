module.exports = {
    entry: './src/scripts/Trust1Connector.ts',
    output: {
        filename: 'dist/bundle.js',
        library: ['Trust1Team']
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