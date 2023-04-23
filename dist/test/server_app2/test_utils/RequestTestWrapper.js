"use strict";
exports.__esModule = true;
exports.RequestTestWrapper = void 0;
var RequestTestWrapper = /** @class */ (function () {
    function RequestTestWrapper() {
        this.headers = {};
    }
    RequestTestWrapper.prototype.on = function (event, cb) {
        if (event == 'data') {
            cb(JSON.stringify(this.body));
        }
        else {
            cb();
        }
    };
    RequestTestWrapper.prototype.clearFields = function () {
        this.body = undefined;
        this.method = undefined;
        this.url = undefined;
        this.headers = {};
    };
    return RequestTestWrapper;
}());
exports.RequestTestWrapper = RequestTestWrapper;
