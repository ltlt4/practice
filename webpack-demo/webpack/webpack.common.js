const path = require('path'); // path模块是node.js的核心模块，主要用来操作文件路径
//const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); webpack4已弃用，
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: { //入口文件 1.只打包一个文件（单入口），写个字符串；2.把多个文件打包成一个文件，写个数组;3.把多个文件分别打包成多个文件，写成对象
        index: './src/js/index.js',
    },
    module: { // 配置模块 主要用于解析css图片转换压缩等功能
        rules: [
            {//解析js
                test: /\.(js|jsx)$/,  // 正则匹配
                use: [
                    { loader: 'babel-loader', }
                ],
                exclude: path.resolve(__dirname, 'node_modules'), //exclude  不包含node_modules中js文件
                include: path.resolve(__dirname, 'src'), // include  包含src中的js文件
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    { loader: 'css-loader', options: { importLoaders: 1 } }, //使用cssloader处理css
                    {
                        loader: 'postcss-loader', //postcss
                    },
                ]

            }
        ]
    },
}
