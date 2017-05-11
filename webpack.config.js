var path = require("path");
module.exports = {
    entry: "./src/scripts/core/GCLLib.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "GCLLib.js",
        library: ["GCLLib"]
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ""]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            }
        ]
    }
};