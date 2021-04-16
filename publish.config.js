const path = require('path');

module.exports = {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "index.js",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", "scss", "css"]
    },
    externals: {
        'react': 'commonjs react'
    }
};