"use strict";
exports.__esModule = true;
exports.HTTP_METHODS = exports.HTTP_CODES = void 0;
var HTTP_CODES;
(function (HTTP_CODES) {
    HTTP_CODES[HTTP_CODES["OK"] = 200] = "OK";
    HTTP_CODES[HTTP_CODES["CREATED"] = 201] = "CREATED";
    HTTP_CODES[HTTP_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_CODES[HTTP_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_CODES[HTTP_CODES["NOT_fOUND"] = 404] = "NOT_fOUND";
    HTTP_CODES[HTTP_CODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HTTP_CODES = exports.HTTP_CODES || (exports.HTTP_CODES = {}));
var HTTP_METHODS;
(function (HTTP_METHODS) {
    HTTP_METHODS["GET"] = "GET";
    HTTP_METHODS["POST"] = "POST";
    HTTP_METHODS["PUT"] = "PUT";
    HTTP_METHODS["DELETE"] = "DELETE";
    HTTP_METHODS["OPTIONS"] = "OPTIONS";
})(HTTP_METHODS = exports.HTTP_METHODS || (exports.HTTP_METHODS = {}));
