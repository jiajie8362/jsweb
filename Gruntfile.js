module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      client: [
        'public/js/**/*.js',
        '~public/js/vendor'
      ]，
      server: ['server/**/*.js'],
      support: ['Gruntfile.js']
    },
    less: {
      debug: {
        files: {
          'build/css/layout.css': 'public/css/layout.less',
          'build/css/home.css': 'public/css/home.less'
        }
      },
      release: {
        files: {
          'build/css/compiled.css': [
            'public/**/*.less'
          ]
        }
      },    },
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
    },
    timestamp: {
      options: {
        file: 'your/file/path'
      }
    }，
    jade: {
      debug: {
        options: {
          pretty: true
        }，
        files: {
          'build/views/home.html': 'public/views/home.jade'
        }
      },
      release: {
        files: {
          'build/views/home.html': 'public/views/home.jade'
        }
      }
    },
    watch: {
      // lint js files when they change, and then copy them over to build directory
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['jshint:client', 'copy:js_debug']
      },

      // run the less:debug task if a less file changes
      less: {
        files: ['public/css/**/*.less'],
        tasks: ['less:debug']
      },

      // run the jade:debug task if a jade file changes
      jade: {
        files: ['public/views/**/*.jade'],
        tasks: ['jade:debug']
      },

      // run the whole build again if the process changes
      rebuild: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:build', 'build:debug']
      },

      livereload: {
        options: {
          livereload: true
        },
        files: [
          'build/**/*.{css,js,html}'
        ]
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch']
      }
    }，
    imagemin: {
      release: {
        files: [{
          expand: true,
          src: 'build/img/**/*.jpg'
        }],
        options: {
          progressive: true
        }]
      }
    }，
    rev: {
      release: {
        files: {
          src: ['build/**/*.{css,js,png}']
        }
      }
    },
    usemin: {
      html: ['build/**/*.html']，
      css: ['build/**/*.css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('js', 'Concatenate and minify static JavaScript assets', ['concat:js', 'uglify:bundle']);

  grunt.registerTask('timestamp', function() {
    var options = this.options({
      file: '.timestamp'
    });
    var timestamp = +new Date();
    var contents = timestamp.toString();
    grunt.file.write(options.file, contents);
  })

  grunt.registerTask('build:debug', 'Lint and compile', [
    'clean', 'jshint', 'less:debug', 'jade:debug', 'copy:js_debug'
  ]);

  grunt.registerTask('build:release', 'Lint, compile, bundle, and optimize', [
    'clean', 'jshint', 'less:release', 'jade:release', 'concat:release', 'uglify:release'
  ]);

  grunt.registerTask('dev', ['build:debug', 'concurrent']);
};
