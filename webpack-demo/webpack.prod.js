const merge = require('webpack-merge');
const common = require('./webpack/webpack.common.js');
const path = require('path'); // path模块是node.js的核心模块，主要用来操作文件路径
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包前，先清空打包后生成的dist文件包
const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入 htmlwebpackplugin 插件 作用生成html文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common, {
    mode: 'production', //生产模式
    output: {
        path: path.resolve(__dirname, 'dist'), // __dirname：是node.js中的一个全局变量，它指向当前执行脚本所在的目录
        filename: 'js/[name]-[hash:5].js', //[chunkhash:5]: 数字和字母组成的8位哈希值,[name]：是根据入口文件的自动生成的，有几个入口文件，就可以打包几个出口文件。
        publicPath: './'  //表示打包文件中引用文件的路径前缀,如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了。
        // 表示线上地址： "http://glkj.com/"
        // 例如: publicPath: 'http://cdn.example.com/assets/[hash]/'

    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                mangle: false,
                output: {
                    beautify: false,
                },
                compress: {
                    drop_debugger: false,  //去掉debugger
                    drop_console: false,  // 去掉console
                    pure_funcs: ['console.log']// 移除console
                }
            }
        })],
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
    plugins: [
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(), // 打包前，先将dist文件中的内容全部清除
        new HtmlWebpackPlugin({
            title: 'Production',
            filename: 'index.html',
            template: 'src/html/index.html'
        }),
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
    ]
})