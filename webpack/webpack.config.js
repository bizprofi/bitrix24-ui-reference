const path = require('path');
const postcss = require('postcss-url');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: {
        index: './index.js',
    },
    output: {
        path: path.resolve(__dirname, '../'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                postcss({
                                    url: (asset) => {
                                        let documentRoot = path.resolve(__dirname, '../../public_html');
                                        return asset.absolutePath.replace(documentRoot, '/bitrix24-ui-reference');
                                    },
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.ejs',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
    ],
}
