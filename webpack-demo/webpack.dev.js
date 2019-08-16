const merge = require('webpack-merge');
const common = require('./webpack/webpack.common.js');
const path = require('path'); // path模块是node.js的核心模块，主要用来操作文件路径
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 每次打包前，先清空打包后生成的dist文件包
const HtmlWebpackPlugin = require('html-webpack-plugin');  //引入 htmlwebpackplugin 插件 作用生成html文件
const webpack = require('webpack');  // 引入已经安装的webpack模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports =merge(common,{
    mode: 'development',  //开发模式
    output: {
        path: path.resolve(__dirname, 'dist'), // __dirname：是node.js中的一个全局变量，它指向当前执行脚本所在的目录
        filename: 'js/[name].js', //[chunkhash:5]: 数字和字母组成的8位哈希值,[name]：是根据入口文件的自动生成的，有几个入口文件，就可以打包几个出口文件。
        publicPath: '/'  //表示打包文件中引用文件的路径前缀,如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了。
        // 表示线上地址： "http://glkj.com/"
        // 例如: publicPath: 'http://cdn.example.com/assets/[hash]/'

    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                mangle: false,
                output: {
                    beautify: true,
                },
                compress: {
                    warnings: true,
                    drop_debugger: false,  //去掉debugger
                    drop_console: false,  // 去掉console
                    pure_funcs: ['console.log']// 移除console
                  }
            }
        })],
    },
    plugins: [// 配置插件 用于生产模板等各项功能
        new CleanWebpackPlugin(), // 打包前，先将dist文件中的内容全部清除
        new webpack.ProvidePlugin({ // 自动加载模块插件  使用模块插件的时候，不需要通过 import/require引入 使用该模块
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'Production',
            filename: 'index.html',
            template: 'src/html/index.html'
        }),
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new webpack.HotModuleReplacementPlugin() // HotModuleReplacementPlugin为webpack内置插件调用使用webpack.[plugin-name]使用这些插件
    ],
    devServer: { // 配置本地开发服务器
        contentBase: path.resolve(__dirname, 'dist'),//webpack-dev-ser运行时的文件根目录 (将 dist 目录下的文件，作为搭建的开发服务器可访问的文件)
        open: true, // 启用webpack-dev-server时，自动打开浏览器
        historyApiFallback: false,
        host: 'localhost',  // 可以通过localhost访问
        port:4020,
        overlay: {
            errors: true // 出现错误之后会在页面中出现遮罩层提示
        },
        inline: true,
        stats: 'errors-only', //只在发生错误时输出
        hot: true, // 启动热更新
    },
    devtool: 'inline-source-map' //是一个工具，主要是查看编译后的文件如果报错，控制台提示错误来自于编译前的哪一个文件。方便找错
})