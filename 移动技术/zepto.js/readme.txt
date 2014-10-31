一、zepto模块的的搭建
1.在https://github.com/madrobby/zepto下载zepto项目
2.在项目中build自己想要的zepto模块
You will need Node.js installed on your system.
$ npm install
$ npm run-script dist
# do a custom build
$ MODULES="zepto event data" npm run-script dist

注意：MODULES 命令在windows下报错
解决方案：不用这个命令，你可以修改zepto文件夹下的make文件的第42行，
  modules = (env['MODULES'] || 'zepto event ajax form ie data touch fx fx_methods').split(' ')
加入你想要的模块保存，然后运行npm run-script dist就可

二、zepto使用的一些注意点
http://www.cnblogs.com/samwu/archive/2013/06/06/3121649.html