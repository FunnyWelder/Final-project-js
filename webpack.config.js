const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    context: __dirname + "/assets/js",
    entry: {
        gallery: "./gallery.js",
        puzzle: "./puzzle.js",
        index: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        library: "[name]"
    },
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery' : 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    }
}