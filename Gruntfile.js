module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                files: {
                    'public/dist/js/main.js': ['public/src/js/main.js']
                },
                options: {
                    watch: true
                }
            },
            build: {
                files: {
                    'public/dist/js/main.js': ['public/src/js/main.js']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['connect:server', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: 'public',
                    hostname: '*',
                    keepalive: true,
                    port: 3000,
                    useAvailablePort: true
                }
            }
        },
        copy: {
            fonts: {
                cwd: 'public/src/',
                expand: true,
                src: 'fonts/**/*',
                dest: 'public/dist/'
            },
            images: {
                cwd: 'public/src/',
                expand: true,
                src: 'img/**/*',
                dest: 'public/dist/'
            }
        },
        less: {
            dev: {
                files: {
                    'public/src/css/main.css': ['public/src/css/less/main.less']
                },
                options: {
                    dumpLineNumbers: 'comments',
                    paths: ['public/components'],
                    strictMath: true,
                }
            },
            build: {
                files: {
                    'public/dist/css/main.css': ['public/src/css/less/main.less']
                },
                options: {
                    paths: ['public/components'],
                    strictMath: true,
                }
            }
        },
        nunjucks: {
            options: {
                configureEnvironment: function (env) {
                    env.addFilter('onePageLinks', function (input) {
                        var cheerio = require('cheerio');
                        var $ = cheerio.load(input);

                        $('a').each(function () {
                            if($(this).attr('href').indexOf('#') === -1) {
                                return;
                            }

                            $(this).attr(
                                'href',
                                $(this).attr('href').substr($(this).attr('href').indexOf('#'))
                            );
                        });

                        return $.html();
                    });

                    env.addFilter('addScrollIndicators', function (input) {
                        var cheerio = require('cheerio');

                        var $ = cheerio.load(input);
                        $('li').each(function () {
                            $(this).attr('data-drc-scroll-indicator', $('a', this).attr('href').replace('#',''));
                            $(this).attr('data-use-attribute', 'id');
                        });

                        return $.html();
                    });
                }
            },
            dev: {
                options: {
                    data: {},
                    paths: 'public/src/html'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/src/html',
                        src: './*.html',
                        dest: './public/',
                        ext: '.html'
                    }
                ]
            }
        },
        watch: {
            less: {
                files: ['public/src/css/less/**/*.less'],
                tasks: ['less:dev']
            },
            js: {
                files: ['public/src/js/**/*.js'],
                tasks: ['browserify:dev']
            },
            nunjucks: {
                files: ['public/src/html/**/*.html'],
                tasks: ['nunjucks:dev']
            },
            livereload: {
                files: ['public/src/css/main.css', 'public/dist/js/main.js', 'public/*.html'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nunjucks-2-html');

    grunt.registerTask('serve', ['connect:server']);
    grunt.registerTask('dev', ['nunjucks:dev', 'less:dev', 'browserify:dev', 'concurrent:dev']);
    grunt.registerTask('build', ['less:build', 'browserify:dev', 'copy:images', 'copy:fonts']);
};
