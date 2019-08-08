webpack-demo
====
一个练习webpack的demo

# git
1. ls -al ~/.ssh 检查有无ssh密钥

2. ssh-keygen -t rsa -C "your_email@example.com" 创建密码

3. git add 文件上传到缓存区

4. git commit 提交文件 

5. git remote add origin 仓库地址  建立远程连接

6. git push -u origin master第一次推送master分支的所有内容；

7. git remote -v 查看远程仓库
# 命令
1. webpack --config webpack.dev.config.js webpack启动文件，config后为文件名
****
# 目录说明
1. ```postcss.config.js``` postcss配置文件
2. ```webpack.config.js``` webpack配置文件
3. ```.babelrc```   bebale配置文件
4. ```package.json``` 项目配置文件
5. ```.gitignore``` git忽略文件
6. `webpack.dev.config`  webpack练习文件
7. `webpack.ts.config` webpack打包ts练习文件
8. `src` 项目主目录
9. `dist` 打包后的文件目录
10. `node_modules` npm包
#webpack常用配置
1. `resolve`（解析） 该选项创建 import 或 require 的别名，来确保模块引入变得更简单。主要说一下extensions，`resolve.extensions`可以让引入文件时不用拓展名。
比如 ``import File from '../path/to/file'``。
webpack会根据extensions的配置去自动寻找依赖文件，extensions默认为.js，则上面的代码其实为``import File from '../path/to/file.js'``。