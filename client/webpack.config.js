const path = require("path");
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    mode: 'production',
    devServer: {
        port: 9200,
        contentBase: path.join(__dirname, "/dist"),
        hot: true,
        watchContentBase: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg|webm)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            }
        ],
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            favicon: "./src/favicon.ico",
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
        }),
    ],
};
