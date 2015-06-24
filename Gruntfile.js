module.exports = function (grunt) {
    grunt.initConfig({
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
                    strictMath: true,
                    dumpLineNumbers: 'comments'
                }
            }
        },
        watch: {
            less: {
                files: ['public/src/css/less/**/*.less'],
                tasks: ['less:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', ['connect:server']);
    grunt.registerTask('dev', ['concurrent:dev']);
};
