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
var ServerModel_1 = require("../../app/server_app/model/ServerModel");
var Server_1 = require("../../app/server_app/server/Server");
var http_client_1 = require("./utils/http-client");
describe('Server app integration tests', function () {
    var server;
    beforeAll(function () {
        server = new Server_1.Server();
        server.startServer();
    });
    afterAll(function () {
        server.stopServer();
    });
    var someUser = {
        id: '',
        userName: 'someUserName',
        password: 'somePassword'
    };
    var someReservation = {
        id: '',
        endDate: 'someEndDate',
        startDate: 'someStartDate',
        room: 'someRoom',
        user: 'someUser'
    };
    var someReservation2 = {
        id: '',
        endDate: 'someEndDate2',
        startDate: 'someStartDate2',
        room: 'someRoom2',
        user: 'someUser2'
    };
    var someReservation3 = {
        id: '',
        endDate: 'someEndDate3',
        startDate: 'someStartDate3',
        room: 'someRoom3',
        user: 'someUser3'
    };
    it('should register new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:8080/register', {
                        method: ServerModel_1.HTTP_METHODS.POST,
                        body: JSON.stringify(someUser)
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    resultBody = _a.sent();
                    expect(result.status).toBe(ServerModel_1.HTTP_CODES.CREATED);
                    expect(resultBody.userId).toBeDefined();
                    console.log("connecting to address ".concat(process.env.HOST, ":").concat(process.env.PORT));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should register new user with awesomeRequest', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, http_client_1.makeAwesomeRequest)({
                        host: 'localhost',
                        port: 8080,
                        method: ServerModel_1.HTTP_METHODS.POST,
                        path: '/register'
                    }, someUser)];
                case 1:
                    result = _a.sent();
                    expect(result.statusCode).toBe(ServerModel_1.HTTP_CODES.CREATED);
                    expect(result.body.userId).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    var token;
    it('should login new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:8080/login', {
                        method: ServerModel_1.HTTP_METHODS.POST,
                        body: JSON.stringify(someUser)
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    resultBody = _a.sent();
                    expect(result.status).toBe(ServerModel_1.HTTP_CODES.CREATED);
                    expect(resultBody.token).toBeDefined();
                    token = resultBody.token;
                    return [2 /*return*/];
            }
        });
    }); });
    var createdReservationId;
    it('should create reservation if authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:8080/reservation', {
                        method: ServerModel_1.HTTP_METHODS.POST,
                        body: JSON.stringify(someReservation),
                        headers: {
                            authorization: token
                        }
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    resultBody = _a.sent();
                    expect(result.status).toBe(ServerModel_1.HTTP_CODES.CREATED);
                    createdReservationId = resultBody.reservationId;
                    expect(createdReservationId).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get reservation if authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, resultBody, expectedReservation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/reservation/".concat(createdReservationId), {
                        method: ServerModel_1.HTTP_METHODS.GET,
                        headers: {
                            authorization: token
                        }
                    })];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 2:
                    resultBody = _a.sent();
                    expectedReservation = structuredClone(someReservation);
                    expectedReservation.id = createdReservationId;
                    expect(result.status).toBe(ServerModel_1.HTTP_CODES.OK);
                    expect(resultBody).toEqual(expectedReservation);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create and retrieve multiple reservations, if authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getAllResults, resultBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:8080/reservation', {
                        method: ServerModel_1.HTTP_METHODS.POST,
                        body: JSON.stringify(someReservation),
                        headers: {
                            authorization: token
                        }
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fetch('http://localhost:8080/reservation', {
                            method: ServerModel_1.HTTP_METHODS.POST,
                            body: JSON.stringify(someReservation2),
                            headers: {
                                authorization: token
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fetch('http://localhost:8080/reservation', {
                            method: ServerModel_1.HTTP_METHODS.POST,
                            body: JSON.stringify(someReservation3),
                            headers: {
                                authorization: token
                            }
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fetch("http://localhost:8080/reservation/all", {
                            method: ServerModel_1.HTTP_METHODS.GET,
                            headers: {
                                authorization: token
                            }
                        })];
                case 4:
                    getAllResults = _a.sent();
                    return [4 /*yield*/, getAllResults.json()];
                case 5:
                    resultBody = _a.sent();
                    expect(getAllResults.status).toBe(ServerModel_1.HTTP_CODES.OK);
                    expect(resultBody).toHaveLength(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update reservation if authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateResult, result, getRequestBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/reservation/".concat(createdReservationId), {
                        method: ServerModel_1.HTTP_METHODS.PUT,
                        body: JSON.stringify({
                            startDate: 'otherStartDate'
                        }),
                        headers: {
                            authorization: token
                        }
                    })];
                case 1:
                    updateResult = _a.sent();
                    expect(updateResult.status).toBe(ServerModel_1.HTTP_CODES.OK);
                    return [4 /*yield*/, fetch("http://localhost:8080/reservation/".concat(createdReservationId), {
                            method: ServerModel_1.HTTP_METHODS.GET,
                            headers: {
                                authorization: token
                            }
                        })];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, result.json()];
                case 3:
                    getRequestBody = _a.sent();
                    expect(getRequestBody.startDate).toBe('otherStartDate');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete reservation if authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateResult, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:8080/reservation/".concat(createdReservationId), {
                        method: ServerModel_1.HTTP_METHODS.DELETE,
                        headers: {
                            authorization: token
                        }
                    })];
                case 1:
                    updateResult = _a.sent();
                    expect(updateResult.status).toBe(ServerModel_1.HTTP_CODES.OK);
                    return [4 /*yield*/, fetch("http://localhost:8080/reservation/".concat(createdReservationId), {
                            method: ServerModel_1.HTTP_METHODS.GET,
                            headers: {
                                authorization: token
                            }
                        })];
                case 2:
                    result = _a.sent();
                    expect(result.status).toBe(ServerModel_1.HTTP_CODES.NOT_fOUND);
                    return [2 /*return*/];
            }
        });
    }); });
    // it('snapshot demo', async () => {
    //   jest.spyOn(generated, 'generateRandomId').mockReturnValueOnce('1234')
    //   await fetch('http://localhost:8080/reservation', {
    //     method: HTTP_METHODS.POST,
    //     body: JSON.stringify(someReservation),
    //     headers: {
    //       authorization: token
    //     },
    //   });
    //   const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
    //     method: HTTP_METHODS.GET,
    //     headers: {
    //       authorization: token
    //     },
    //   });
    //   const getRequestBody: Reservation = await getResult.json()
    //   expect(getRequestBody).toMatchSnapshot()
    // })
});
