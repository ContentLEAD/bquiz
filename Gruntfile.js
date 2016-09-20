module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
        base: {
            src: ['src/ts/**/*.ts'],
            dest: 'src/partials',
            options: {
                module: 'amd', //or commonjs 
                target: 'es5',
                removeComments: true,
                comments: false,
                sourceMap: true
            }
        }
    },
    concat: {
        options: {
            separator: ';',
        },
        basic: {
            src: ['src/partials/*.js'],
            dest: 'src/js/bgraphics.js',
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/bgraphics.js',
        dest: 'src/js/bgraphics.min.js'
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