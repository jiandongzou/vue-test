const path = require('path')
const webpackConfig = require('./webpack.config.js')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const terserPlugin = new TerserWebpackPlugin({
  parallel: 4,
  extractComments: true,
  terserOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log'] //移除console
    }
  }
});
module.exports = merge(webpackConfig,{
  mode:'production',
  // devtool:'cheap-module-source-map',
  plugins:[
    new CopyWebpackPlugin({
      patterns:[{
      from:path.resolve(__dirname,'../public'),
      to:path.resolve(__dirname,'../dist')
        }]
      }),
      new OptimizeCssAssetsPlugin({})
     
  ],
  optimization:{
    minimizer:[
      terserPlugin
    ],
  splitChunks:{
      chunks:'all',
      cacheGroups:{
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})