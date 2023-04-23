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
var LoginHandler_1 = require("../../../app/server_app/handlers/LoginHandler");
var ServerModel_1 = require("../../../app/server_app/model/ServerModel");
var getRequestBodyMock = jest.fn();
jest.mock('../../../app/server_app/utils/Utils', function () { return ({
    getRequestBody: function () { return getRequestBodyMock(); }
}); });
describe('LoginHandler test suite', function () {
    var sut;
    var request = {
        method: undefined
    };
    var responseMock = {
        writeHead: jest.fn(),
        write: jest.fn(),
        statusCode: 0
    };
    var authorizerMock = {
        login: jest.fn()
    };
    var someToken = '1234';
    var someAccount = {
        id: '',
        password: 'somePassword',
        userName: 'someUserName'
    };
    beforeEach(function () {
        sut = new LoginHandler_1.LoginHandler(request, responseMock, authorizerMock);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('should return token for valid accounts in requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.method = ServerModel_1.HTTP_METHODS.POST;
                    getRequestBodyMock.mockResolvedValueOnce(someAccount);
                    authorizerMock.login.mockResolvedValueOnce(someToken);
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(authorizerMock.login).toBeCalledWith(someAccount.userName, someAccount.password);
                    expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.CREATED);
                    expect(responseMock.writeHead).toBeCalledWith(ServerModel_1.HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
                    expect(responseMock.write).toBeCalledWith(JSON.stringify({
                        token: someToken
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return not found for invalid accounts in requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.method = ServerModel_1.HTTP_METHODS.POST;
                    getRequestBodyMock.mockResolvedValueOnce(someAccount);
                    authorizerMock.login.mockResolvedValueOnce(undefined);
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(authorizerMock.login).toBeCalledWith(someAccount.userName, someAccount.password);
                    expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.NOT_fOUND);
                    expect(responseMock.write).toBeCalledWith(JSON.stringify('wrong username or password'));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return bad request for invalid requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.method = ServerModel_1.HTTP_METHODS.POST;
                    getRequestBodyMock.mockResolvedValueOnce({});
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(authorizerMock.login).not.toBeCalled();
                    expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                    expect(responseMock.write).toBeCalledWith(JSON.stringify('userName and password required'));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should do nothing for not supported http methods', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.method = ServerModel_1.HTTP_METHODS.GET;
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(responseMock.writeHead).not.toBeCalled();
                    expect(responseMock.write).not.toBeCalled();
                    expect(getRequestBodyMock).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
