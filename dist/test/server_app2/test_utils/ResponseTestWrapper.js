"use strict";
exports.__esModule = true;
exports.ResponseTestWrapper = void 0;
var ResponseTestWrapper = /** @class */ (function () {
    function ResponseTestWrapper() {
        this.headers = new Array();
    }
    ResponseTestWrapper.prototype.writeHead = function (statusCode, header) {
        this.statusCode = statusCode;
        this.headers.push(header);
    };
    ResponseTestWrapper.prototype.write = function (stringifiedBody) {
        this.body = JSON.parse(stringifiedBody);
    };
    ResponseTestWrapper.prototype.end = function () { };
    ResponseTestWrapper.prototype.clearFields = function () {
        this.statusCode = undefined;
        this.body = undefined;
        this.headers.length = 0;
    };
    return ResponseTestWrapper;
}());
exports.ResponseTestWrapper = ResponseTestWrapper;
