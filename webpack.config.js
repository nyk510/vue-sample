const ExtraTextPlugin = require('extract-text-webpack-plugin')
const webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")

var I18nPlugin = require('i18n-webpack-plugin')
var languages = {
    "ja": {
        name: "",
        data: null
    },
    "en": {
        name: "en.",
        data: require('./languages/en.json')
    }
}

var extext = new ExtraTextPlugin("./css/[name].css")

module.exports = Object.keys(languages).map(function (lang_i) {
    return {
        entry: {
            'main': './src/main.ts'
        },
        output: {
            path: __dirname,
            filename: './js/' + languages[lang_i].name + '[name].bundle.js'
        },
        devtool: 'source-map',
        resolve: {
            modules: ['#{__dirname}/dist/', "node_modules"],
            extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
            alias: {
                // import Vue from 'vue' の記法を有効にするため
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        module: {
            // rules を用いて記述するのは webpack2 より. 
            // loader で指定する方法は推奨されていない. 
            // https://webpack.js.org/guides/migrating/
            rules: [
                {
                    // .ts 読み込み
                    test: /\.ts$/,
                    loader: 'ts-loader'
                },
                {
                    // .css 読み込み
                    test: /\.css$/,
                    use: extext.extract({
                        fallback: "style-loader",
                        use: "css-loader",
                        publicPath: "/dist"
                    })
                },
                // .vue 読み込み
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        esModule: true
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
            extext,
            // jsファイルの圧縮
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     }
            // }),
            // // cssファイルの圧縮
            new webpack.LoaderOptionsPlugin({ minimize: true }),

            // HtmlWebpackPlugin
            //     読みこんだすべてのファイルが読み込まれた雛形のhtmlを出力するプラグイン

            // new HtmlWebpackPlugin({
            //     inject: false,
            //     chunks: ["assessment"],
            //     filename: __dirname + "/assessment.html", 
            //     inject: "body",
            // })
        ]
    }
})