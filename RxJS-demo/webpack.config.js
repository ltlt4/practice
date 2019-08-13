const path = require('path'); // path模块是node.js的核心模块，主要用来操作文件路径
const webpack = require('webpack');  // 引入已经安装的webpack模块
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//显示打包进度条
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩js插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次打包前，先清空打包后生成的dist文件包
module.exports = {
    mode: 'development',  // 4.x 新增,提供 mode 配置选项,会将 process.env.NODE_ENV 的值设为 development, 启用相应环境模式下的 webpack 内置的优化
    entry: { //入口文件 1.只打包一个文件（单入口），写个字符串；2.把多个文件打包成一个文件，写个数组;3.把多个文件分别打包成多个文件，写成对象
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // __dirname：是node.js中的一个全局变量，它指向当前执行脚本所在的目录
        filename: 'js/[name].js', //[chunkhash:5]: 数字和字母组成的8位哈希值,[name]：是根据入口文件的自动生成的，有几个入口文件，就可以打包几个出口文件。
        publicPath: './'  //表示打包文件中引用文件的路径前缀,如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了。
        // 表示线上地址： "http://glkj.com/"
        // 例如: publicPath: 'http://cdn.example.com/assets/[hash]/'

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

        ]
    },
    devtool:"inline-source-map",
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                mangle: false,
                warnings: false,
                output: {
                    beautify: false,
                },
                compress: {
                    drop_debugger: false,  //去掉debugger
                    drop_console: true,  // 去掉console
                    // pure_funcs: ['console.log']// 移除console
                }
            }
        })],
    },
    plugins: [
        new ProgressBarPlugin({}),
        new HtmlWebpackPlugin({ //作用是打包生成对应的html文件
            template:  path.join(__dirname, 'src/html/index.html'), //要处理的html模板文件(打包后，生成新的html文件) 
            filename: 'rxjs.html',  // 打包生成的文件地址及文件名，filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
            title: 'index', // 设置该页面的title标题标签
            chunks: ['index'],
            inject: 'body',  // 所有js资源插入到head标签中
        }),
        // new CleanWebpackPlugin(), // 打包前，先将dist文件中的内容全部清除
        new webpack.HotModuleReplacementPlugin({  //热更新模块HRM
            // Options...
          })
    ],
    devServer: { // 配置本地开发服务器
        contentBase: path.resolve(__dirname, 'dist'),//webpack-dev-ser运行时的文件根目录 (将 dist 目录下的文件，作为搭建的开发服务器可访问的文件)
        historyApiFallback: false,
        host: 'localhost',  // 可以通过localhost访问
        overlay: {
            errors: true // 出现错误之后会在页面中出现遮罩层提示
        },
        inline: true,
        stats: 'errors-only',
        hot: true, // 启动热更新
        open: true, // 启用webpack-dev-server时，自动打开浏览器
    },
}