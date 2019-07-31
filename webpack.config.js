const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const isDevelopment = process.env.NODE_ENV === 'development';

const webpackConfig = {
  mode: isDevelopment ? 'development' : 'production',

  entry: resolve('src/bootstrap'),

  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  devServer: {
    contentBase: resolve('static'),
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    overlay: { warnings: false, errors: true },
  },

  devtool: isDevelopment ? 'eval-source-map' : 'source-map',

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },

  optimization: {
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: isDevelopment,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: isDevelopment,
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: styleLoaders(),
      },
      {
        test: /\.scss$/,
        use: styleLoaders('sass'),
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
    ],
  },
};

if (isDevelopment) {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
  webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
  }));
}

if (process.argv.includes('--analyze')) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
  }));
}

module.exports = webpackConfig;

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

function styleLoaders(loader, options = {}) {
  const loaders = [
    isDevelopment ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: { ident: 'postcss', plugins: () => [postcssPresetEnv()] },
    },
  ];

  if (loader) {
    loader = `${loader}-loader`;
    loaders.push({ loader, options });
  }

  return loaders;
}
