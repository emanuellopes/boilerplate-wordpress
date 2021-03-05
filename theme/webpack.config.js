const path = require('path');
const fs = require('fs');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const postcssPresetEnv = require('postcss-preset-env');
const WebpackProgressOraPlugin = require('webpack-progress-ora-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode !== 'development';
  const mode = isProduction ? 'production' : 'development';

  let entries = {
    style: path.resolve('src/scss/_index.scss'),
	script_js: path.resolve('src/js/index.js'),
  };

  const appConfig = {
    mode,
    entry: entries,
    output: {
      path: path.resolve('./dist'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: ['[name]'],
    },
    resolve: {
      extensions: ['.scss', '.js'],
      alias: {
        'lodash-es': 'lodash',
      },
    },
    module: {
      rules: [
        {
          test: /\.(eot|otf|ttf|woff|woff2)(\?.*)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
              sourceMap: true,
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(@nc-gb-morpheus|@nc-green-beard|@nc-gb-sds)\/).*/,
          use: [
            'thread-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                babelrc: false,
                configFile: false,
                presets: ['@wordpress/babel-preset-default'],
                plugins: ["@babel/plugin-proposal-class-properties"]
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                plugins: [
                  postcssPresetEnv({
                    autoprefixer: {
                      grid: false,
                    },
                  }),
                ],
              },
            },
            'resolve-url-loader?sourceMap',
            'sass-loader?sourceMap',
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/images/[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new DependencyExtractionWebpackPlugin({ injectPolyfill: true }),
      new MiniCssExtractPlugin({
        moduleFilename: ({ name }) => {
          if (name === 'style') {
            return '../style.css';
          }
          return `[name].css`;
        },
        chunkFilename: '[id].css',
      }),
      new WebpackProgressOraPlugin(),
      () => {
        if (fs.existsSync('src/assets')) {
          new CopyPlugin([{ from: path.resolve('src/assets'), to: path.resolve('assets') }]);
        }
      },
      new CleanWebpackPlugin({
        dry: false,
        verbose: true,
        cleanAfterEveryBuildPatterns: ['./*.php', '!./resource-center-blocks.asset.php'],
      }),
    ],
    stats: {
      colors: true,
    },
    performance: {
      hints: false,
    },
    devtool: 'source-map',
  };

  if (isProduction) {
    appConfig.devtool = '#source-map';

    appConfig.optimization = {
      concatenateModules: true,
      splitChunks: {
        cacheGroups: {
          style: {
            test: /[\\/]style\.(sc|sa|c)ss$ /,
            chunks: 'all',
            enforce: true,
            automaticNameDelimiter: '-',
          },
          default: false,
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      minimize: true,
    };
  }

  return appConfig;
};
