/*global module:false */

module.exports = function (grunt) {

  var gruntConfig = {};
  var pkg = 'package.json';

  gruntConfig.pkg = grunt.file.readJSON(pkg);

  gruntConfig.bumpup = pkg;

  gruntConfig.tagrelease = {
    file: pkg,
    commit:  true,
    message: 'Release %version%',
    prefix:  'v',
    annotate: false
  };

  gruntConfig.meta = {
    app: { assets: 'app/assets/red-app' },
    assets: 'app/assets/',
    views: 'app/views/',
    build: 'public',
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today() %> */\n'
  };

  gruntConfig.jade = {
    build: {
      options: {
        pretty: true,
        data: {
          appcache: null,
          title: '<%= pkg.title %>',
          modules: '<%= pkg.subDependencies %>'
        }
      },
      files: [{
        expand: true,
        src: ['*.jade'],
        ext: '.html',
        cwd:  '<%= meta.views %>/red-app/',
        dest: '<%= meta.build %>/'
      }, {
        expand: true,
        cwd:  '<%= meta.views %>/',
        src: ['red-*/*.jade', '!red-app/*.jade'],
        dest: '<%= meta.build %>/partials/',
        ext: '.html',
        rename: function(dest, src) {
          return dest + src;
        }
      }, {
        expand: true,
        cwd:  '<%= meta.assets %>/',
        src: 'red-*/ajax/*.jade',
        dest: '<%= meta.build %>/',
        ext: '.html',
        rename: function(dest, src) {
          src = src.replace('/ajax', '');
          return dest + 'ajax/' + src;
        }
      }]
    }
  };

  gruntConfig.less = {
    build: {
      files: [{
        expand: true,
        cwd: 'app/assets/',
        src: 'red-*/stylesheets/app.less',
        dest: '<%= meta.build %>/stylesheets/',
        ext: '.css',
        rename: function(dest, src) {
          src = src.replace('/stylesheets/app', '');
          return dest + src;
        }
      }]
    }
  };

  gruntConfig.jshint = {
    options: {
      jshintrc: '.jshintrc',
      ignores: [
        '<%= meta.app.assets %>/javascripts/app.js',
        '<%= meta.app.assets %>/javascripts/all.js',
        '<%= meta.app.assets %>/javascripts/app-filtering.js' // Because of IE8 compatibility snippets
      ]
    },
    files: ['package.json', 'Gruntfile.js', 'app/assets/**/javascripts/**/*.js']
  };

  gruntConfig.concat = {
    head: {
      src: [
        '<%= meta.app.assets %>/vendor/modernizr/modernizr.js'
      ],
      dest: '<%= meta.build %>/javascripts/libs/head.js'
    },
    settings: {
      src: [
        '<%= meta.app.assets %>/javascripts/app-settings.js'
      ],
      dest: '<%= meta.build %>/javascripts/red-app-settings.js'
    },
    facebook: {
      src: [
        '<%= meta.app.assets %>/javascripts/all.js'
      ],
      dest: '<%= meta.build %>/javascripts/all.js'
    },
    vendor: {
      src: [
        '<%= meta.app.assets %>/vendor/jquery/jquery.js',
        '<%= meta.app.assets %>/vendor/bootstrap/js/transition.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/alert.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/button.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/carousel.js',
        '<%= meta.app.assets %>/vendor/bootstrap/js/collapse.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/dropdown.js',
        '<%= meta.app.assets %>/vendor/bootstrap/js/modal.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/tooltip.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/popover.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/scrollspy.js',
        // '<%= meta.app.assets %>/vendor/bootstrap/js/tab.js',
        '<%= meta.app.assets %>/vendor/bootstrap/js/affix.js',
        '<%= meta.app.assets %>/vendor/flexslider/jquery.flexslider.js',
        '<%= meta.app.assets %>/vendor/PxLoader/PxLoader.js',
        '<%= meta.app.assets %>/vendor/PxLoader/PxLoaderImage.js'

      ],
      dest: '<%= meta.build %>/javascripts/libs/vendor.js'
    },
    application: {
      options: {
        banner: '<%= meta.banner %>'
      },
      src: [
        '<%= meta.app.assets %>/javascripts/app-plugin-sample.js'
      ],
      dest: '<%= meta.build %>/javascripts/red-app.js'
    },
    modules: {
      files: [{
        expand: true,
        cwd: 'app/assets/',
        src: ['*/javascripts/*.js', '!*/javascripts/app-settings.js'],
        dest: '<%= meta.build %>/javascripts/',
        rename: function(dest, src) {
          src = src.replace(/\/javascripts\/.*\.js/, '');
          return dest + src + '.js' ;
        }
      }]
    }
  };

  gruntConfig.uglify = {

    options:      { report: 'gzip' },

    head:         { files: { '<%= meta.build %>/javascripts/libs/head.min.js':        ['<%= concat.head.dest %>']         } },
    vendor:       { files: { '<%= meta.build %>/javascripts/libs/vendor.min.js':      ['<%= concat.vendor.dest %>']       } },
    application:  { files: { '<%= meta.build %>/javascripts/red-app.min.js':          ['<%= concat.application.dest %>']  } },

    modules: {
      files: [{
        expand: true,
        cwd: '<%= meta.build %>/javascripts/',
        src: ['*.js', '!red-app-settings.js', '!all.js','!red-app.js'],
        dest: '<%= meta.build %>/javascripts/',
        ext: '.min.js',
        rename: function(dest, src) {
          return dest + src;
        }
      }]
    }
  };

  gruntConfig.copy = {
    icons: {
      files: [{
        src: ['favicon.png','favicon.ico'], expand: true,
        cwd: '<%= meta.app.assets %>/ico/',
        dest: '<%= meta.build %>'
      }]
    },
    humans: {
      files: [{
        src: ['*.txt'], expand: true,
        cwd: '<%= meta.app.assets %>/humans/',
        dest: '<%= meta.build %>'
      }]
    },
    robots: {
      files: [{
        src: ['*.txt'], expand: true,
        cwd: '<%= meta.app.assets %>/robots/',
        dest: '<%= meta.build %>'
      }]
    },
    fonts: {
      files: [{
        src: ['**/*'], expand: true,
        cwd: '<%= meta.app.assets %>/fonts/',
        dest: '<%= meta.build %>/fonts/'
      },{
        src: ['helvetica-*/*'], expand: true,
        cwd: '<%= meta.app.assets %>/vendor/renault-fonts/',
        dest: '<%= meta.build %>/fonts/'
      },{
        src: ['fontawesome-*'], expand: true,
        cwd: '<%= meta.app.assets %>/vendor/font-awesome/fonts/',
        dest: '<%= meta.build %>/fonts/'
      },{
        src: ['**/*'], expand: true,
        cwd: '<%= meta.app.assets %>/vendor/renault-icons/fonts/',
        dest: '<%= meta.build %>/fonts/'
      }]
    },
    flash: {
      files: [{
        src: ['**/*'], expand: true,
        cwd: '<%= meta.app.assets %>/flash/',
        dest: '<%= meta.build %>/flash/'
      }]
    },
    images: {
      files: [{
        expand: true,
        cwd: 'app/assets/',
        src: ['*/images/**/*'],
        dest: '<%= meta.build %>/images/',
        rename: function(dest, src) {
          src = src.replace('/images', '');
          return dest + src;
        }
      }]
    },
    fontscss: {
      files: [
        {
          src: ['renault-fonts.css', 'renault-fonts-fallback.css'], expand: true,
          cwd: '<%= meta.app.assets %>/vendor/renault-fonts/',
          dest: '<%= meta.build %>/stylesheets/'
        }
      ]
    },
    iconscss: {
      files: [
        {
          src: ['renault-icons.css'], expand: true,
          cwd: '<%= meta.app.assets %>/vendor/renault-icons/stylesheets/',
          dest: '<%= meta.build %>/stylesheets/'
        }
      ]
    }
  };

  gruntConfig.watch = {
    ajax: {
      files: ['app/assets/**/ajax/*'],
      tasks: ['jade:build']
    },
    application: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat']
    },
    vendor: {
      files: ['<%= concat.vendor.src %>'],
      tasks: ['concat']
    },
    less: {
      files: ['app/assets/**/stylesheets/**/*.less'],
      tasks: ['less:build']
    },
    images: {
      files: ['app/assets/**/images/**/*'],
      tasks: ['copy:images']
    },
    icons: {
      files: ['<%= meta.app.assets %>/icons/**/*'],
      tasks: ['copy:icons']
    },
    humans: {
      files: ['<%= meta.app.assets %>/humans/**/*'],
      tasks: ['copy:humans']
    },
    robots: {
      files: ['<%= meta.app.assets %>/robots/**/*'],
      tasks: ['copy:robots']
    },
    fonts: {
      files: ['<%= meta.app.assets %>/fonts/**/*'],
      tasks: ['copy:fonts']
    },
    flash: {
      files: ['<%= meta.app.assets %>/flash/**/*'],
      tasks: ['copy:flash']
    }
  };

  gruntConfig.usemin = {
    html: '<%= meta.build %>/*.html',
    options: {
      patterns: {
        html: [
          [
            /<script.+src=['"]([^"']+)["']/gm,
            'Update the HTML with the new javascript filenames'
          ],
          [
            /<link[^\>]+href=['"]([^"']+)["']/gm,
            'Update the HTML with the new css filenames'
          ]
        ]
      }
    }
  };

  gruntConfig.cssmin = {
    compress: {
      expand: true,
      cwd:  '<%= meta.build %>/stylesheets/',
      dest: '<%= meta.build %>/stylesheets/',
      src: ['*.css', '!*.min.css'],
      ext: '.min.css',
      options: {
        keepSpecialComments: 0
      }
    }
  };

  gruntConfig.imagemin = {
    jpg: {
      options: { progressive: true },
      files: [{
        expand: true, src: ['**/*.jpg'], ext: '.jpg',
        cwd: '<%= meta.build %>/images/',
        dest: '<%= meta.build %>/images/'
      }]
    },
    png: {
      options: { optimizationLevel: 2, pngquant: true },
      files: [{
        expand: true, src: ['**/*.png'], ext: '.png',
        cwd: '<%= meta.build %>/images/',
        dest: '<%= meta.build %>/images/'
      }]
    },
    gif: {
      files: [{
        expand: true, src: ['**/*.gif'], ext: '.gif',
        cwd: '<%= meta.build %>/images/',
        dest: '<%= meta.build %>/images/'
      }]
    }
  };

  gruntConfig.shell = {
    options: { stdout: true },
    start: {
      command: 'node app/server.js'
    },
    prepare: {
      command: [
        'BRANCH="gh-pages"',
        'mkdir <%= meta.build %>',
        'cd <%= meta.build %>',
        'git init',
        'git remote add origin <%= pkg.repository.url %>',
        'git checkout -b $BRANCH',
        'git pull origin $BRANCH',
        'rm -rf ./*'
      ].join(' && '),
      options: {
        stdout: true
      }
    },
    devprepare: {
      command: [
        'BRANCH="gh-pages"',
        'ORIGIN="`git ls-remote --get-url`"',
        'mkdir <%= meta.build %>',
        'cd <%= meta.build %>',
        'git init',
        'git remote add origin $ORIGIN',
        'git checkout -b $BRANCH',
        'git pull origin $BRANCH',
        'rm -rf ./*'
      ].join(' && '),
      options: {
        stdout: true
      }
    },
    deploy: {
      command: [
        'BRANCH="gh-pages"',
        "HASH=`git log --pretty=format:'%h - %s' -n 1`",
        'cd <%= meta.build %>',
        'git add -A .',
        'git commit -m "Deploy from $HASH"',
        'git push --force origin $BRANCH'
      ].join(' && '),
      options: {
        stdout: true
      }
    },
    pushtags: {
      command: function(){
        // once again parse package.json
        // after it's version has been bumped
        var _pkg = grunt.file.readJSON(pkg);
        // git push release commit
        var cmd = ['git push origin master'];
        // git push actual tag
        cmd.push( 'git push origin v' + _pkg.version );
        return cmd.join(' && ');
      }
    }
  };

  gruntConfig.clean = {
    options: { force: true },
    build: {
      src: ['<%= meta.build %>']
    },
    sources: {
      src: [
        '<%= meta.build %>/javascripts/**/*.js',
        '!<%= meta.build %>/javascripts/**/*.min.js',
        '!<%= meta.build %>/javascripts/red-app-settings.js',
        '!<%= meta.build %>/javascripts/all.js',
        '<%= meta.build %>/stylesheets/*.css',
        '!<%= meta.build %>/stylesheets/*.min.css'
      ]
    }
  };

  gruntConfig.notify = {
    options: { title: '<%= pkg.title %>' },
    build: { options: { message: 'Build Complete' } },
    deploy: { options: { message: 'Deploy Complete' } },
    optimized: { options: { message: 'Optimized Build Complete' } }
  };

  gruntConfig.nodemon = {
    server: {
      options: {
        file: 'app/server.js',
        ignoredFiles: ['README.md', 'node_modules/**', 'assets/**'],
        watchedFolders: ['app/'], watchedExtensions: ['js', 'json']
      }
    }
  };

  gruntConfig.concurrent = {
    start: {
      tasks: ['nodemon', 'watch'],
      options: { logConcurrentOutput: true }
    }
  };

  grunt.initConfig(gruntConfig);

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('release', function(type){
    if( typeof type !== 'string' ){
      throw new Error('Grunt release task needs a type (patch, minor, major)');
    }
    grunt.task.run(['bumpup:' + type, 'tagrelease', 'shell:pushtags']);
  });

  grunt.registerTask('deploy', [
    'optimize',
    'shell:deploy', 'notify:deploy'
  ]);

  grunt.registerTask('devdeploy', [
    'jshint', 'clean:build', 'shell:devprepare', 'concat', 'less', 'copy', 'jade', 'notify:build',
    'shell:deploy', 'notify:deploy'
  ]);

  grunt.registerTask('optimize', [
    'build',
    'usemin', 'cssmin', 'uglify', 'clean:sources', 'notify:optimized',
  ]);

  grunt.registerTask('build', [
    'jshint', 'clean:build', 'shell:prepare', 'concat', 'less', 'copy', 'jade', 'notify:build'
  ]);

  grunt.registerTask('start',   ['build', 'server']);
  grunt.registerTask('server',  ['concurrent:start']);

  grunt.registerTask('default', ['build']);

};
