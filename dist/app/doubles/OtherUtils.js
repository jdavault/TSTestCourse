"use strict";
exports.__esModule = true;
exports.OtherStringUtils = exports.toUpperCaseWithCb = exports.calculateComplexity = exports.toLowerCaseWithId = exports.toUpperCase = void 0;
var uuid_1 = require("uuid");
function toUpperCase(arg) {
    return arg.toUpperCase();
}
exports.toUpperCase = toUpperCase;
function toLowerCaseWithId(arg) {
    return arg.toLowerCase() + (0, uuid_1.v4)();
}
exports.toLowerCaseWithId = toLowerCaseWithId;
function calculateComplexity(stringInfo) {
    return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}
exports.calculateComplexity = calculateComplexity;
function toUpperCaseWithCb(arg, callBack) {
    if (!arg) {
        callBack('Invalid argument!');
        return;
    }
    callBack("called function with ".concat(arg));
    return arg.toUpperCase();
}
exports.toUpperCaseWithCb = toUpperCaseWithCb;
var OtherStringUtils = /** @class */ (function () {
    function OtherStringUtils() {
    }
    OtherStringUtils.prototype.callExternalService = function () {
        console.log('Calling external service!!!');
    };
    OtherStringUtils.prototype.toUpperCase = function (arg) {
        return arg.toUpperCase();
    };
    OtherStringUtils.prototype.logString = function (arg) {
        console.log(arg);
    };
    return OtherStringUtils;
}());
exports.OtherStringUtils = OtherStringUtils;
