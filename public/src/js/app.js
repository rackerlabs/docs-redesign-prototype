var angular = require('angular');

var moduleName = 'drc.app';
module.exports = moduleName;

angular.module(moduleName, [
    require('./components/sticky'),
    require('./components/section-nav-toggle')
]);

angular.bootstrap(document, [moduleName]);
