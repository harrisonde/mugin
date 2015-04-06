module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    	app:{
    		srcDir: 'app/src',
    		distDir: 'app/dist',
    	},
    	/**
		* Copy files 
		*/
    	copy: {
			bootstrap: {
				files: [
					{
						expand: true,
						cwd: '<%= app.srcDir %>/vendors/bootstrap/js/',
						src: ['**/*'],
						dest: '<%= app.distDir %>/js/bootstrap/',
						flatten: false
					},
					{
						expand: true,
						cwd: '<%= app.srcDir %>/vendors/open-sans-fontface/fonts/',
						src: ['**/*'],
						dest: '<%= app.distDir %>/fonts/open-sans/',
						flatten: false
					}
				]
			},
			mugin: {
				files: [
					{
						expand: true,
						cwd: '<%= app.srcDir %>/mugin/js/',
						src: ['**/*'],
						dest: '<%= app.distDir %>/js/mugin/',
						flatten: false
					}
				]
			},
			jquery: {
				files: [
					{
						expand: true,
						cwd: '<%= app.srcDir %>/vendors/jquery/dist/',
						src: ['**/*'],
						dest: '<%= app.distDir %>/js/jquery/',
						flatten: false
					}
				]
			},
			resemble: {
				files: [
					{
						expand: true,
						cwd: '<%= app.srcDir %>/vendors/resemble/',
						src: ['**/*'],
						dest: '<%= app.distDir %>/js/resemble/',
						flatten: false
					}
				]
			}		
		},
		/**
		* LESS
		# Move argument is destination : source
		*/
		less: {
		    style: {
		       options: {
		         compress: true
		       },
		       files: {
		        '<%= app.distDir %>/css/main.css': '<%= app.srcDir %>/less/app.less',
		        '<%= app.distDir %>/css/vendor.css': '<%= app.srcDir %>/less/vendors.less',
		       }
		    }
   		},		
		/**
		* LESS
		* Watch automatically 
		*/
		watch: {
			css: {
				files: ['<%= app.srcDir %>/app/**/*.less', '<%= app.srcDir %>/vendors/bootstrap/less/**/*.less'],
				// files: '**/*.less',
				tasks: ['less:style']
			}
		}	
  });

	// Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch')
    
	// Default task(s).
    grunt.registerTask('default', [
		// default actions go here
  		'copy',
  		'less',
  		'watch'
  	]);

  	// Deploy Task(s)
  	grunt.registerTask('deploy', [
  		// Only tasks necessary for deploy
  		'copy',
  		'less'
  	]);
};