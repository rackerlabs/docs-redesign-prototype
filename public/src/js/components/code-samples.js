$ = require('jquery');
_ = require('lodash');

var CodeSamples = function (options) {
    this.options = options;

    this.referenceElements = $(this.options.referenceParent).find('[data-code-sample]');
    this.targetElements = $(this.options.targetParent).find('[data-code-sample]');

    this.positionElements();
    this.addEventListeners();
};

CodeSamples.prototype.positionElements = function () {
    var matchTargetToOffset = function (index, element) {
        var targetName = element.getAttribute('data-code-sample');
        var targetElement = this.targetElements.filter('[data-code-sample="' + targetName + '"]');

        if(targetElement.length === 0) {
            return;
        }

        var referenceFromTop = $(element).offset().top - $(this.options.referenceParent).offset().top;
        var targetFromTop = $(targetElement).offset().top - $(this.options.targetParent).offset().top;

        $(targetElement).css({
            marginTop: Math.max(0, referenceFromTop - targetFromTop)
        });

    };

    this.referenceElements.each(matchTargetToOffset.bind(this));
};

CodeSamples.prototype.addEventListeners = function () {
    var resizeHandler = function (event) {
        this.positionElements();
    };

    // $(window).on('resize', resizeHandler.bind(this));
};

module.exports = CodeSamples;
