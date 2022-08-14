const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  entry: ['regenerator-runtime/runtime', './src/editor.js'],
  output: {
    path: `${__dirname}/dist/`,
    filename: 'editor.js',
    library: 'editor',
    libraryTarget: 'umd',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'editor.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /^(?!.*?\.module).*\.scss$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: { lessOptions: { strictMath: true } },
          },
        ],
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.html$/,
        use: [{ loader: 'raw-loader' }],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 },
          },
        ],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 1600000,
    maxAssetSize: 1600000,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  }
  return config
}
