const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.join(__dirname, `src`),
  dist: path.join(__dirname, `docs`),
  assets: `assets`,
};

const baseConfig = {
  externals: {
    paths: paths,
  },
  entry: {
    app: paths.src,
  },
  output: {
    filename: `[name].min.js`,
    path: paths.dist,
    publicPath: '/utio',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-class-properties']],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  cssnano: {
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '~': `${paths.src}`,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/app/config`,
          to: 'app/config',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`,
      filename: `./index.html`,
    }),
  ],
};

const serveConfig = merge(baseConfig, {
  name: 'serve',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: '/',
    contentBase: baseConfig.externals.paths.dist,
    port: 8000,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
});

const buildConfig = merge(baseConfig, {
  name: 'build',
  mode: 'production',
  plugins: [],
});

module.exports = [serveConfig, buildConfig];
