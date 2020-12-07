const path = require('path')
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const devMode = process.argv.indexOf('--mode=production') === -1;
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
  entry:{
    main:path.resolve(__dirname,'../src/main.js')
  },
  output:{
    path:path.resolve(__dirname,'../dist'),
    filename:'js/[name].[hash:8].js',
    chunkFilename:'js/[name].[hash:8].js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader: ['cache-loader','happypack/loader?id=happyBabel'],
        //use:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/, // 用正则去匹配要用该 loader 转换的 CSS 文件
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          'sass-loader',
          'postcss-loader'
        ],
      },
     {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
          loader: 'url-loader', 
          options: {
              esModule: false,
              name: '[name].[ext]',
              limit: 8192,
              outputPath: "images/",   //输出图片放置的位置
              publicPath: './images', //html的img标签src所指向图片的位置，与outputPath一致
          }
      }]
      
  },
      {
        test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      }
    ]
  },
  // resolve:{
  //   alias:{
  //     'vue$':'vue/dist/vue.runtime.esm.js',
  //     ' @':path.resolve(__dirname,'../src')
  //   },
  //   extensions:['*','.js','.json','.vue']
  // },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html')
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
    id: 'happyBabel',
    //如何处理  用法和loader 的配置一样
    loaders: [{
      loader: 'babel-loader?cacheDirectory=true',
    }],
    //共享进程池
    threadPool: happyThreadPool,
    //允许 HappyPack 输出日志
    verbose: true,
  }),
  new HappyPack({
    id: 'styles',
    threadPool: happyThreadPool,
    loaders: [ 'style-loader', 'css-loader', 'less-loader','sass-loader' ]
  }),
    new vueLoaderPlugin(),
    new miniCssExtractPlugin({
      filename:'css/[name].[hash].css',
      chunkFilename:'css/[id].[hash].css'
     
    })
  ]
}
