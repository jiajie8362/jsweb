module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      client: [
        'public/js/**/*.js',
        '~public/js/vendor'
      ]
    },
    less: {
      compile: {
        files: {
          'build/css/compiled.css': [
            'public/*.less',
            'public/**/*.less',
            '!public/vendor/**/*.less'
          ]
        }
      }
    },
    concat: {
      js: {
        files: {
          'build/js/bundle.js': 'public/js/**/*.js'
        }
      }
    },
    uglify: {
      bundle: {
        files: {
          'build/js/bundle.min.js': 'build/js/bundle.js'
        }
      }
    },
    sprinte: {
      icons: {
        src: 'public/img/icons/*.png',
        destImg: 'build/img/icons.png',
        destCSS: 'build/css/icons.css'
      }
    },
    clean: {
      js: 'build/js',
      css: 'build/css',
      less: 'public/**/*.css'
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('js', 'Concatenate and minify static JavaScript assets', ['concat:js', 'uglify:bundle']);
};
