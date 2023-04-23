"use strict";
exports.__esModule = true;
exports.getStringInfo = exports.toUpperCase = exports.StringUtils = void 0;
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.prototype.toUpperCase = function (arg) {
        if (!arg) {
            throw new Error("Invalid argument!");
        }
        return toUpperCase(arg);
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
function toUpperCase(arg) {
    return arg.toUpperCase();
}
exports.toUpperCase = toUpperCase;
/* istanbul ignore next */
function getStringInfo(arg) {
    return {
        lowerCase: arg.toLowerCase(),
        upperCase: arg.toUpperCase(),
        characters: Array.from(arg),
        length: arg.length,
        extraInfo: {}
    };
}
exports.getStringInfo = getStringInfo;
