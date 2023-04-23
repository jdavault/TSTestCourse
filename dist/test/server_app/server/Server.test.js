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
var Authorizer_1 = require("../../../app/server_app/auth/Authorizer");
var ReservationsDataAccess_1 = require("../../../app/server_app/data/ReservationsDataAccess");
var LoginHandler_1 = require("../../../app/server_app/handlers/LoginHandler");
var RegisterHandler_1 = require("../../../app/server_app/handlers/RegisterHandler");
var ReservationsHandler_1 = require("../../../app/server_app/handlers/ReservationsHandler");
var ServerModel_1 = require("../../../app/server_app/model/ServerModel");
var Server_1 = require("../../../app/server_app/server/Server");
jest.mock('../../../app/server_app/auth/Authorizer');
jest.mock('../../../app/server_app/data/ReservationsDataAccess');
jest.mock('../../../app/server_app/handlers/LoginHandler');
jest.mock('../../../app/server_app/handlers/RegisterHandler');
jest.mock('../../../app/server_app/handlers/ReservationsHandler');
var requestMock = {
    url: '',
    headers: {
        'user-agent': 'jest-test'
    }
};
var responseMock = {
    end: jest.fn(),
    writeHead: jest.fn()
};
var serverMock = {
    listen: jest.fn(),
    close: jest.fn()
};
jest.mock('http', function () { return ({
    createServer: function (cb) {
        cb(requestMock, responseMock);
        return serverMock;
    }
}); });
describe('Server test suite', function () {
    var sut;
    beforeEach(function () {
        sut = new Server_1.Server();
        expect(Authorizer_1.Authorizer).toBeCalledTimes(1);
        expect(ReservationsDataAccess_1.ReservationsDataAccess).toBeCalledTimes(1);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('should start server on port 8080 and end the request', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    expect(serverMock.listen).toBeCalledWith(8080);
                    console.log('checking response.end calls:');
                    expect(responseMock.end).toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle register requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        var handleRequestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.url = 'localhost:8080/register';
                    handleRequestSpy = jest.spyOn(RegisterHandler_1.RegisterHandler.prototype, 'handleRequest');
                    return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    expect(handleRequestSpy).toBeCalledTimes(1);
                    expect(RegisterHandler_1.RegisterHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer_1.Authorizer));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle login requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        var handleRequestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.url = 'localhost:8080/login';
                    handleRequestSpy = jest.spyOn(LoginHandler_1.LoginHandler.prototype, 'handleRequest');
                    return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    expect(handleRequestSpy).toBeCalledTimes(1);
                    expect(LoginHandler_1.LoginHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer_1.Authorizer));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle reservation requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        var handleRequestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.url = 'localhost:8080/reservation';
                    handleRequestSpy = jest.spyOn(ReservationsHandler_1.ReservationsHandler.prototype, 'handleRequest');
                    return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    expect(handleRequestSpy).toBeCalledTimes(1);
                    expect(ReservationsHandler_1.ReservationsHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer_1.Authorizer), expect.any(ReservationsDataAccess_1.ReservationsDataAccess));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should do nothing for not supported routes', function () { return __awaiter(void 0, void 0, void 0, function () {
        var validateTokenSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.url = 'localhost:8080/someRandomRoute';
                    validateTokenSpy = jest.spyOn(Authorizer_1.Authorizer.prototype, 'validateToken');
                    return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    expect(validateTokenSpy).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle errors in serving requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        var handleRequestSpy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestMock.url = 'localhost:8080/reservation';
                    handleRequestSpy = jest.spyOn(ReservationsHandler_1.ReservationsHandler.prototype, 'handleRequest');
                    handleRequestSpy.mockRejectedValueOnce(new Error('Some error'));
                    return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    expect(responseMock.writeHead).toBeCalledWith(ServerModel_1.HTTP_CODES.INTERNAL_SERVER_ERROR, JSON.stringify("Internal server error: Some error"));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should stop the server if started', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sut.startServer()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, sut.stopServer()];
                case 2:
                    _a.sent();
                    expect(serverMock.close).toBeCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
