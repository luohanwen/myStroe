module.exports = function(grunt) {
	grunt.initConfig({
		piece_modulejs: {
			main: {
				options: {
					mode: "project",
					exclude: ["node_modules", "piece"]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-piece-modulejs');

	grunt.registerTask('default', [
		'piece_modulejs'
	]);
};