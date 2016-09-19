module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
        base: {
            src: ['src/ts/**/*.ts'],
            dest: 'src/js',
            options: {
                module: 'amd', //or commonjs 
                target: 'es5',
                removeComments: true,
                comments: false
            }
        }
    },
    concat: {
        options: {
            separator: ';',
        },
        dist: {
            src: ['src/js/*.js'],
            dest: 'src/bgraphics.js',
        },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/bgraphics.js',
        dest: 'build/bgraphics.min.js'
      }
    },
    copy: {
        main: {
            files: [
            // includes files within path and its sub-directories
            {expand: true ,cwd: "src/js", src: ['**'], dest: 'build/js/'},

            ],
        },
    },
  });
  
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  
  // Default task(s).
  grunt.registerTask('full', ['typescript','concat','uglify', 'copy']);
    grunt.registerTask('default', ['typescript','concat','uglify']);
};