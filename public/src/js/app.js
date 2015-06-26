var angular = require('angular');

var moduleName = 'drc.app';
module.exports = moduleName;

angular.module(moduleName, [
    require('./components/sticky')
]);

angular.bootstrap(document, [moduleName]);
