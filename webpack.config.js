const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

const entry = {}
const htmlPlugins = []

const pagePath = glob.sync('./examples/**/*.html')

pagePath.forEach(page => {
  const pathInfo = path.parse(page)

  entry[pathInfo.name] = path.resolve(pathInfo.dir, 'index.js')
  htmlPlugins.push(new htmlWebpackPlugin({
    template: page,
    filename: `${pathInfo.name}.html`,
    chunks: ['vendor', 'common', pathInfo.name],
    inject: true
  }))
})

Object.assign(entry, {
    common: './src/index.js'
})

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['common']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
         return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './',
    port: 8088,
    hot: true
  }
}
