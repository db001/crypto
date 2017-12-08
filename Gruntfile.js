module.exports = function(grunt) {
    grunt.initConfig({    
  
      watch: {
        sass: {
          files: "src/scss/*.scss",
          tasks: ['sass']
          },
        css: {
          files: ['src/css/*.css'],
          tasks: ['postcss'],
          options: {
            spawn: false
          }  
        },
        scripts: {
          files: ['app/js/*.js'],
          tasks: ['eslint'],
          options: {
            spawn: false
          }      
        },
        files: [
          '*.html'
        ]
      },
  
      eslint: {
        options: {
          configFile: 'eslint.json'
        },
        target: ['app/js/*.js']
      },
  
      sass: {
        dist: {
          files: {
            // destination          // source file
            "src/css/styles.css" : "src/scss/styles.scss"
          }
        }
      },  
  
      postcss: {
        options: {
          map: false,
          processors: [
            // require('pixrem')(), //add fallbacks for rem units
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        },
        dist: {
          src: 'src/css/*.css',
          dest: 'app/css/compiled.css'
        }
      },
  
      browserSync: {
        default_options: {
          bsFiles: {
            src: [
              "app/css/*.css",
              "*.html",
              "app/js/*.js",
              "src/js/*.js"
            ]
          },
          options: {
            watchTask: true,
            server: {
              baseDir: "./"
            }
          }
        }
      },
  
      bsReload: {
        css: {
          reload: "compiled.css"
        },
        all: {
          reload: true
        }
      }
  
    });
  
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.registerTask('default', ['eslint', 'sass', 'postcss', 'browserSync', 'watch']);
  
  };