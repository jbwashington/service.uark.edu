module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copy web assets from bower_components to more convenient directories.
    copy: {
      main: {
        files: [
          // Vendor scripts.
          {
          expand: true,
          cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
          src: ['**/*.js'],
          dest: 'scripts/bootstrap-sass/'
        },
        {
          expand: true,
          cwd: 'bower_components/jquery/dist/',
          src: ['**/*.js', '**/*.map'],
          dest: 'scripts/jquery/'
        },

        // Fonts.
        {
          expand: true,
          filter: 'isFile',
          flatten: true,
          cwd: 'bower_components/',
          src: ['bootstrap-sass/assets/fonts/**'],
          dest: 'fonts/'
        },

        // Stylesheets
        {
          expand: true,
          cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
          src: ['**/*.scss'],
          dest: 'scss/'
        }
        ]
      }
    },

    // Compile SASS files into minified CSS.
    sass: {
      options: {
        includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    // Watch these files and notify of changes.
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: [
          'scss/**/*.scss'
        ],
        tasks: ['sass']
      },
      imagemin: {
        files: 'assets/images/uncompressed/*.{png,jpg,gif}',
        tasks: ['imagemin']
      }
    }
  });

  // Load externally defined tasks.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Establish tasks we can run from the terminal.
  grunt.registerTask('build', ['sass', 'copy']);
  grunt.registerTask('default', ['build', 'watch']);
};
