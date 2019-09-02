/* eslint-disable */
const path = require('path');
const OptimizeJsPlugin = require('optimize-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
var ImageminPlugin = require('imagemin-webpack-plugin').default;


const plugins = [new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    inject: 'body'
})];
module.exports = (env) => {
    const environment = env || 'production';
    if (env === 'production') {
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
        plugins.push(
            new MinifyPlugin({}, {})
        )
        plugins.push(
            new ImageminPlugin({
                pngquant: {
                    quality: '95-100'
                }
            })
        )
    }
    return {
        mode: environment,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'app.bundle.js'
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        plugins: env !== 'production' ? ["react-hot-loader/babel", "@babel/plugin-proposal-class-properties"] : []
                    }
                },
                {
                    test: /\.css$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            },
                        
                        },
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true, // webpack@1.x
                                disable: true, // webpack@2.x and newer
                            },
                        },
                    ],
                }
            ]
        },
        optimization: {
            minimize: false
        },
        plugins,
        devServer: {
            historyApiFallback: true,
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: false,
                warnings: false,
                publicPath: false
            }
        }
    }
};