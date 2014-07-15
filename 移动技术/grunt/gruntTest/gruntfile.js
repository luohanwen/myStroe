//包装函数
module.exports = function(grunt) {
	//任务配置
	grunt.initConfig({
		//读取package.json
		pkg: grunt.file.readJSON("package.json"),
		//任务concat 对src文件夹里所有js文件进行连接
		concat: {
			options: {
				//定义分割文件的字符
				sparator: ";",
				//插入顶部的内容
				banner: "/*test*/\n",
				//插入底部的内容
				footer: "\n/*footer*/"
			},
			dist: {
				//待拼接的文件
				src: ["src/**/*.js"],
				dest: "dist/<%=pkg.name%>.js"
			}
		},
		uglify: {
			//将concat.dist.dest 里生成的文件进行压缩
			uglify_target1: {
				options: {
					//生成注释并插入到输出文件的顶部
					banner: "/*!<%=pkg.name%><%=grunt.template.today('dd-mm-yyyy')%>*/\n"
				},
				files: {
					'dist/<%=pkg.name%>.min.js': '<%=concat.dist.dest%>'
				}
			},
			//将src里的所有js文件拷贝到dest里
			uglify_target2: {
				files: [{
					expand: true,
					cwd: "src",
					src: "**/*.js",
					dest: "copySrc"
				}]
			}
		},
		jshint: {
			options:{
				'-W033':true
			},
			all: ['dist/gruntjs.cn.min.js'],
			test: ['src/test.js']
		}
	});

	//加载任务所需插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	//建立默认任务
	grunt.registerTask('default', ['concat', 'uglify', "jshint"]);

	//建立指定任务
	grunt.registerTask("concatTest", ["concat"]);
	grunt.registerTask("uglifyTest", ["uglify"]);
};