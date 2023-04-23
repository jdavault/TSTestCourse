"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Utils_1 = require("../../../app/server_app/utils/Utils");
var requestMock = {
    on: jest.fn()
};
var someObject = {
    name: 'John',
    age: 30,
    city: 'Paris'
};
var someObjectAsString = JSON.stringify(someObject);
describe('getRequestBody test suite', function () {
    it('should return object for valid JSON', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.on.mockImplementation(function (event, cb) {
                        if (event == 'data') {
                            cb(someObjectAsString);
                        }
                        else {
                            cb();
                        }
                    });
                    return [4 /*yield*/, (0, Utils_1.getRequestBody)(requestMock)];
                case 1:
                    actual = _a.sent();
                    expect(actual).toEqual(someObject);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error for invalid JSON', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.on.mockImplementation(function (event, cb) {
                        if (event == 'data') {
                            cb('a' + someObjectAsString);
                        }
                        else {
                            cb();
                        }
                    });
                    return [4 /*yield*/, expect((0, Utils_1.getRequestBody)(requestMock)).rejects.
                            toThrow('Unexpected token a in JSON at position 0')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error for unexpected error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var someError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    someError = new Error('Something went wrong!');
                    requestMock.on.mockImplementation(function (event, cb) {
                        if (event == 'error') {
                            cb(someError);
                        }
                    });
                    return [4 /*yield*/, expect((0, Utils_1.getRequestBody)(requestMock)).rejects.
                            toThrow(someError.message)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});