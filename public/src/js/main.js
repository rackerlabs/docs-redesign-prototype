var CodeSamples = require('./components/code-samples');
var LanguageSelector = require('./components/language-selector');

var samples = Object.create(CodeSamples.prototype);
CodeSamples.call(samples, {
    referenceParent: '.docs-narrative',
    targetParent: '.docs-code'
});

$('[data-language-selector]').each(function (index, element) {
    var selector = Object.create(LanguageSelector.prototype);
    LanguageSelector.call(selector, {
        element: element
    });
});
