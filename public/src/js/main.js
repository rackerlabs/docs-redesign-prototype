var LanguageSelector = require('./components/language-selector');

$('[data-language-selector]').each(function (index, element) {
    var selector = Object.create(LanguageSelector.prototype);
    LanguageSelector.call(selector, {
        element: element
    });
});
