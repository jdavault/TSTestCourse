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
var DataBase_1 = require("../../app/server_app/data/DataBase");
var ServerModel_1 = require("../../app/server_app/model/ServerModel");
var Server_1 = require("../../app/server_app/server/Server");
var RequestTestWrapper_1 = require("./test_utils/RequestTestWrapper");
var ResponseTestWrapper_1 = require("./test_utils/ResponseTestWrapper");
jest.mock('../../app/server_app/data/DataBase');
var requestWrapper = new RequestTestWrapper_1.RequestTestWrapper();
var responseWrapper = new ResponseTestWrapper_1.ResponseTestWrapper();
var fakeServer = {
    listen: function () { },
    close: function () { }
};
jest.mock('http', function () { return ({
    createServer: function (cb) {
        cb(requestWrapper, responseWrapper);
        return fakeServer;
    }
}); });
var someReservation = {
    id: '',
    endDate: 'someEndDate',
    startDate: 'someStartDate',
    room: 'someRoom',
    user: 'someUser'
};
var someId = 'someId';
var jsonHeader = { 'Content-Type': 'application/json' };
describe('Reservation requests', function () {
    var insertSpy = jest.spyOn(DataBase_1.DataBase.prototype, 'insert');
    var getBySpy = jest.spyOn(DataBase_1.DataBase.prototype, 'getBy');
    var getAllElementsSpy = jest.spyOn(DataBase_1.DataBase.prototype, 'getAllElements');
    var updateSpy = jest.spyOn(DataBase_1.DataBase.prototype, 'update');
    var deleteSpy = jest.spyOn(DataBase_1.DataBase.prototype, 'delete');
    beforeEach(function () {
        requestWrapper.headers['user-agent'] = 'jest tests';
        requestWrapper.headers['authorization'] = 'someToken';
        // authenticate calls:
        getBySpy.mockResolvedValueOnce({
            valid: true
        });
    });
    afterEach(function () {
        requestWrapper.clearFields();
        responseWrapper.clearFields();
        jest.clearAllMocks();
    });
    describe('POST requests', function () {
        it('should create reservation from valid request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.POST;
                        requestWrapper.body = someReservation;
                        requestWrapper.url = 'localhost:8080/reservation';
                        insertSpy.mockResolvedValueOnce(someId);
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.CREATED);
                        expect(responseWrapper.body).toEqual({
                            reservationId: someId
                        });
                        expect(responseWrapper.headers).toContainEqual(jsonHeader);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not create reservation from invalid request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.POST;
                        requestWrapper.body = {};
                        requestWrapper.url = 'localhost:8080/reservation';
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseWrapper.body).toEqual('Incomplete reservation!');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('GET requests', function () {
        it('should return all reservations', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.GET;
                        requestWrapper.url = 'localhost:8080/reservation/all';
                        getAllElementsSpy.mockResolvedValueOnce([someReservation, someReservation]);
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.OK);
                        expect(responseWrapper.body).toEqual([someReservation, someReservation]);
                        expect(responseWrapper.headers).toContainEqual(jsonHeader);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return specific reservations', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.GET;
                        requestWrapper.url = "localhost:8080/reservation/".concat(someId);
                        getBySpy.mockResolvedValueOnce(someReservation);
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.OK);
                        expect(responseWrapper.body).toEqual(someReservation);
                        expect(responseWrapper.headers).toContainEqual(jsonHeader);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return not found if reservation is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.GET;
                        requestWrapper.url = "localhost:8080/reservation/".concat(someId);
                        getBySpy.mockResolvedValueOnce(undefined);
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.NOT_fOUND);
                        expect(responseWrapper.body).toEqual("Reservation with id ".concat(someId, " not found"));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if reservation is not provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.GET;
                        requestWrapper.url = "localhost:8080/reservation";
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseWrapper.body).toEqual('Please provide an ID!');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('PUT requests', function () {
        it('should update reservation if found and valid request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.PUT;
                        requestWrapper.url = "localhost:8080/reservation/".concat(someId);
                        getBySpy.mockResolvedValueOnce(someReservation);
                        updateSpy.mockResolvedValue(undefined);
                        requestWrapper.body = {
                            user: 'someOtherUser',
                            startDate: 'someOtherStartDate'
                        };
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.OK);
                        expect(responseWrapper.body).toEqual("Updated user,startDate of reservation ".concat(someId));
                        expect(responseWrapper.headers).toContainEqual(jsonHeader);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not update reservation if invalid fields are provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.PUT;
                        requestWrapper.url = "localhost:8080/reservation/".concat(someId);
                        getBySpy.mockResolvedValueOnce(someReservation);
                        updateSpy.mockResolvedValue(undefined);
                        requestWrapper.body = {
                            user: 'someOtherUser',
                            startDate: 'someOtherStartDate',
                            someOtherField: 'someOtherField'
                        };
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseWrapper.body).toEqual('Please provide valid fields to update!');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not update reservation if it is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.PUT;
                        requestWrapper.url = "localhost:8080/reservation/".concat(someId);
                        getBySpy.mockResolvedValueOnce(undefined);
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.NOT_fOUND);
                        expect(responseWrapper.body).toEqual("Reservation with id ".concat(someId, " not found"));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if no reservation id is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.PUT;
                        requestWrapper.url = "localhost:8080/reservation";
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseWrapper.body).toEqual('Please provide an ID!');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('DELETE requests', function () {
        it('should delete specific reservations', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.DELETE;
                        requestWrapper.url = "localhost:8080/reservation/".concat(someId);
                        deleteSpy.mockResolvedValueOnce(undefined);
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.OK);
                        expect(responseWrapper.body).toEqual("Deleted reservation with id ".concat(someId));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if no reservation id is provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestWrapper.method = ServerModel_1.HTTP_METHODS.DELETE;
                        requestWrapper.url = "localhost:8080/reservation";
                        return [4 /*yield*/, new Server_1.Server().startServer()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(process.nextTick)];
                    case 2:
                        _a.sent(); // this solves timing issues, 
                        expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseWrapper.body).toEqual('Please provide an ID!');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should do nothing for not supported methods', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestWrapper.method = ServerModel_1.HTTP_METHODS.OPTIONS;
                    requestWrapper.body = {};
                    requestWrapper.url = 'localhost:8080/reservation';
                    return [4 /*yield*/, new Server_1.Server().startServer()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(process.nextTick)];
                case 2:
                    _a.sent(); // this solves timing issues, 
                    expect(responseWrapper.statusCode).toBeUndefined();
                    expect(responseWrapper.headers).toHaveLength(0);
                    expect(responseWrapper.body).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return not authorized if request is not authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestWrapper.method = ServerModel_1.HTTP_METHODS.POST;
                    requestWrapper.body = {};
                    requestWrapper.url = 'localhost:8080/reservation';
                    getBySpy.mockReset();
                    getBySpy.mockResolvedValueOnce(undefined);
                    return [4 /*yield*/, new Server_1.Server().startServer()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(process.nextTick)];
                case 2:
                    _a.sent(); // this solves timing issues, 
                    expect(responseWrapper.statusCode).toBe(ServerModel_1.HTTP_CODES.UNAUTHORIZED);
                    expect(responseWrapper.body).toEqual('Unauthorized operation!');
                    return [2 /*return*/];
            }
        });
    }); });
});
