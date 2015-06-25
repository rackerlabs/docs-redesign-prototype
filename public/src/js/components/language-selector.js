var $ = require('jquery');
var _ = require('lodash');

var LanguageSelector = function (options) {
    this.options = options;
    this.addEventListeners();
};

LanguageSelector.prototype.addEventListeners = function () {
    $(this.options.element).on('click', (function (e) {
        e.preventDefault();

        var activeLanguage = this.options.element.getAttribute('data-language-selector');

        $('[data-language-selector]').removeClass('active');
        $('[data-language-selector="' + activeLanguage + '"]').addClass('active');
    }).bind(this));
};

module.exports = LanguageSelector;
