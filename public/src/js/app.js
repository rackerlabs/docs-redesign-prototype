var angular = require('angular');

var moduleName = 'drc.app';
module.exports = moduleName;

angular.module(moduleName, [
    require('./services/active-language'),
    require('./components/code-sample'),
    require('./components/flex-height'),
    require('./components/language-selector'),
    require('./components/scroll-indicator'),
    require('./components/section-nav-toggle'),
    require('./components/sticky')
]);

angular.bootstrap(document, [moduleName]);

window.sectionNav = document.querySelector('.docs-section-nav ul');
