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
                    open: true,
                    port: 3000,
                    useAvailablePort: true
                }
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
            livereload: {
                files: ['public/src/css/main.css', 'public/dist/js/main.js', 'public/index.html'],
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
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', ['connect:server']);
    grunt.registerTask('dev', ['concurrent:dev']);
};
