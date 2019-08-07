const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const dotenv = require('dotenv');

let WEBPACK_DEV_SERVER_PORT;

const config = {
    proxyUrlWordPress: '',
    distFolder: './',
    envFile: '../../../.env'
};

module.exports = (env, argv) => {
    'use strict';
    const PROD = (argv.mode !== 'development');

    if (!PROD) {
        dotenv.config({path: config.envFile});

        WEBPACK_DEV_SERVER_PORT = process.env.WEBPACK_DEV_SERVER_PORT;
        config.proxyUrlWordPress = `http://localhost:${process.env.WORDPRESS_PORT}`;

        if (!WEBPACK_DEV_SERVER_PORT) {
            throw new Error('.env file is missing');
        }
    }

    const appConfig = {
        mode: PROD ? 'production' : 'development',
        entry: ['./src/js/main.js'],
        output: {
            path: path.resolve(config.distFolder),
            filename: '[name].js',
            libraryTarget: 'umd',
            library: 'greenBeard',
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
                chunkFilename: '[id].css'
            }),
            new BrowserSyncPlugin({
                proxy: config.proxyUrlWordPress,
                files: ['./'],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        }
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'resolve-url-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(@nc-gb-sds|@nc-green-beard)\/).*/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: ['@babel/plugin-transform-object-assign','@babel/plugin-proposal-class-properties'],
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[hash].[name].[ext]'
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.scss', '.js'],
        },
        stats: {
            colors: true
        },
        performance: {
            hints: false
        },
        devtool: '#eval-source-map'
    };

    if (PROD) {
        appConfig.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    },
                    sourceMap: false
                }),
                new OptimizeCSSAssetsPlugin({})
            ],
            minimize: true,
        };
        appConfig.devtool = '#source-map';
    }

    return appConfig;
};
