const ExtraTextPlugin = require('extract-text-webpack-plugin')
const webpack = require("webpack")

// 多言語化対応のためのプラグイン
var I18nPlugin = require('i18n-webpack-plugin')
var languages = require('./languages/setting.js')

// map を使って languages の各キーに対して設定ファイルを return する. 
module.exports = Object.keys(languages).map(function (lang_i) {
  return {
    entry: {
      // bundleを行うエントリファイルの指定
      // keyの値が name に代入される
      'todo': './src/ToDo.ts',
    },
    output: {
      path: __dirname,
      filename: './js/' + languages[lang_i].name + '[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
      modules: ['#{__dirname}/dist/', "node_modules"],
      extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.vue'],
      alias: {
        // import Vue from 'vue' の記法を有効にするため
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      // module の指定の仕方は検索すると色々と出て来るが
      // webpack2 からは rules を用いて記述することが推奨されている. 
      // https://webpack.js.org/guides/migrating/
      rules: [
        {
          // .ts 読み込み
          test: /\.ts$/,
          exclude: /node_modules|vue\/src/,
          loader: 'ts-loader',
          options: {
            // .vue ファイルの中で記述されている typescript のコンパイルをさせる設定
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          // .css 読み込み
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          // .vue 読み込み
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            esModule: true,
            loaders: {
              i18n: '@kazupon/vue-i18n-loader'
            },
          }
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
          ]
        },
        {
          // 画像の読み込み
          test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 100000,  // 画像の容量の上限
                name: "./img/[name].[ext]" // 画像は ./img/~ に保存
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new I18nPlugin(
        languages[lang_i]['data']
      ),

      // jsファイルの圧縮
      // 普通に開発しているときは時間がかかるのでコメントアウトしてる            
      // new webpack.optimize.UglifyJsPlugin({
      //     compress: {
      //         warnings: false
      //     }
      // }),

      // // cssファイルの圧縮
      new webpack.LoaderOptionsPlugin({ minimize: true }),
    ]
  }
})