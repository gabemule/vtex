
'use strict';

module.exports = function( grunt ) {

    var pkg, config, name, _results, tasks, taskName, taskArray, serverPort;

    pkg = grunt.file.readJSON('package.json');
    serverPort = pkg.serverPort;

    // Configurando as dependências
    config = {
        clean: {
            build: {
                src: [
                    'build/**/*',
                    'build/*',
                    'build'
                ]
            }
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: true,
                    targetDir: 'build/scripts/libs',
                    cleanTargetDir: true
                }
            }
        },
        compass: {
          dist: {
                options: {
                    config: 'config/config.rb'
                }
            }
        },
        jshint: {
            all: ['src/*.js', 'src/**/*.js', 'build/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: [ 'src/scripts/*.js', 'src/scripts/**/*.js' ],
                dest: 'build/scripts/functions.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            main: {
                files: [{
                    'build/scripts/plugins.min.js': [
                        'build/scripts/libs/*.js',
                        'build/scripts/libs/**/*.js'
                    ]
                }, {
                    'build/scripts/functions.min.js': [
                        'build/scripts/functions.js'
                    ]
                }]
            }
        },
        imagemin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        },
        watch: {
            dev: {
                options: {
                    atBegin: true,
                    livereload: true
                },
                files: [
                    'Gruntfile.js',
                    'src/scripts/*.js',
                    'src/scripts/**/*.js',
                    'src/sass/**/*.scss',
                    '*.html',
                    'partials/*.html'
                ],
                tasks: [
                    'compass',
                    'concat',
                    'uglify',
                    'imagemin',
                    'beep'
                ],
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: serverPort,
                    open: true
                }
            }
        }
    };

    // Configurando as tarefas
    tasks = {
        build:  ['clean', 'bower', 'compass', 'concat', 'uglify', 'imagemin'],
        server: ['connect', 'watch'],
        test:   ['jshint', 'beep'],
        "default": ['build', 'server']
    };

    grunt.initConfig(config);

    // Carregando os plugins
    for (name in pkg.devDependencies) {
        if (name.slice(0, 6) === 'grunt-') {
            grunt.loadNpmTasks(name);
        }
    }

    // Registrando as tarefas customizadas
    _results = [];
    for (taskName in tasks) {
        taskArray = tasks[taskName];
        _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;

};
