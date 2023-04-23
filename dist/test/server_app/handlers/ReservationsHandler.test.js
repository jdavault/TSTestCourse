"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ReservationsHandler_1 = require("../../../app/server_app/handlers/ReservationsHandler");
var ServerModel_1 = require("../../../app/server_app/model/ServerModel");
var getRequestBodyMock = jest.fn();
jest.mock('../../../app/server_app/utils/Utils', function () { return ({
    getRequestBody: function () { return getRequestBodyMock(); }
}); });
describe('ReservationsHandler test suite', function () {
    var sut;
    var request = {
        method: undefined,
        headers: {
            authorization: undefined
        },
        url: undefined
    };
    var responseMock = {
        writeHead: jest.fn(),
        write: jest.fn(),
        statusCode: 0
    };
    var authorizerMock = {
        registerUser: jest.fn(),
        validateToken: jest.fn()
    };
    var reservationsDataAccessMock = {
        createReservation: jest.fn(),
        getAllReservations: jest.fn(),
        getReservation: jest.fn(),
        updateReservation: jest.fn(),
        deleteReservation: jest.fn()
    };
    var someReservation = {
        id: undefined,
        endDate: new Date().toDateString(),
        startDate: new Date().toDateString(),
        room: 'someRoom',
        user: 'someUser'
    };
    var someReservationId = '1234';
    beforeEach(function () {
        sut = new ReservationsHandler_1.ReservationsHandler(request, responseMock, authorizerMock, reservationsDataAccessMock);
        request.headers.authorization = 'abcd';
        authorizerMock.validateToken.mockResolvedValueOnce(true);
    });
    afterEach(function () {
        jest.clearAllMocks();
        request.url = undefined;
        responseMock.statusCode = 0;
    });
    describe('POST requests', function () {
        beforeEach(function () {
            request.method = ServerModel_1.HTTP_METHODS.POST;
        });
        it('should create reservation from valid request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getRequestBodyMock.mockResolvedValueOnce(someReservation);
                        reservationsDataAccessMock.createReservation.mockResolvedValueOnce(someReservationId);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.CREATED);
                        expect(responseMock.writeHead).toBeCalledWith(ServerModel_1.HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
                        expect(responseMock.write).toBeCalledWith(JSON.stringify({ reservationId: someReservationId }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not create reservation from invalid request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getRequestBodyMock.mockResolvedValueOnce({});
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Incomplete reservation!'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not create reservation from invalid fields in request', function () { return __awaiter(void 0, void 0, void 0, function () {
            var moreThanAReservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        moreThanAReservation = __assign(__assign({}, someReservation), { someField: '123' });
                        getRequestBodyMock.mockResolvedValueOnce(moreThanAReservation);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Incomplete reservation!'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('GET requests', function () {
        beforeEach(function () {
            request.method = ServerModel_1.HTTP_METHODS.GET;
        });
        it('should return all reservations for /all request', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = '/reservations/all';
                        reservationsDataAccessMock.getAllReservations.mockResolvedValueOnce([someReservation]);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.writeHead).toBeCalledWith(ServerModel_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                        expect(responseMock.write).toBeCalledWith(JSON.stringify([someReservation]));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return reservation for existing id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.writeHead).toBeCalledWith(ServerModel_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                        expect(responseMock.write).toBeCalledWith(JSON.stringify(someReservation));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return not found for non existing id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        reservationsDataAccessMock.getReservation.mockResolvedValueOnce(undefined);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.NOT_fOUND);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify("Reservation with id ".concat(someReservationId, " not found")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if no id provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations";
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Please provide an ID!'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('PUT requests', function () {
        beforeEach(function () {
            request.method = ServerModel_1.HTTP_METHODS.PUT;
        });
        it('should return not found for non existing id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        reservationsDataAccessMock.getReservation.mockResolvedValueOnce(undefined);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.NOT_fOUND);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify("Reservation with id ".concat(someReservationId, " not found")));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if no id provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations";
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Please provide an ID!'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if invalid fields are provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
                        getRequestBodyMock.mockResolvedValueOnce({
                            startDate1: 'someDate'
                        });
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Please provide valid fields to update!'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if no fields are provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
                        getRequestBodyMock.mockResolvedValueOnce({});
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Please provide valid fields to update!'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update reservation with all valid fields provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            var updateObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
                        updateObject = {
                            startDate: 'someDate1',
                            endDate: 'someDate2'
                        };
                        getRequestBodyMock.mockResolvedValueOnce(updateObject);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(reservationsDataAccessMock.updateReservation).toBeCalledTimes(2);
                        expect(reservationsDataAccessMock.updateReservation).toBeCalledWith(someReservationId, 'startDate', updateObject.startDate);
                        expect(reservationsDataAccessMock.updateReservation).toBeCalledWith(someReservationId, 'endDate', updateObject.endDate);
                        expect(responseMock.writeHead).toBeCalledWith(ServerModel_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                        expect(responseMock.write).toBeCalledWith(JSON.stringify("Updated ".concat(Object.keys(updateObject), " of reservation ").concat(someReservationId)));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('PUT requests', function () {
        beforeEach(function () {
            request.method = ServerModel_1.HTTP_METHODS.DELETE;
        });
        it('should delete reservation with provided id', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations/".concat(someReservationId);
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(reservationsDataAccessMock.deleteReservation).toBeCalledWith(someReservationId);
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.OK);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify("Deleted reservation with id ".concat(someReservationId)));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return bad request if no id provided', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.url = "/reservations";
                        return [4 /*yield*/, sut.handleRequest()];
                    case 1:
                        _a.sent();
                        expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.BAD_REQUEST);
                        expect(responseMock.write).toBeCalledWith(JSON.stringify('Please provide an ID!'));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should return nothing for not authorized requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.headers.authorization = '1234';
                    authorizerMock.validateToken.mockReset();
                    authorizerMock.validateToken.mockResolvedValueOnce(false);
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.UNAUTHORIZED);
                    expect(responseMock.write).toBeCalledWith(JSON.stringify('Unauthorized operation!'));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return nothing if no authorization header is present', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.headers.authorization = undefined;
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(responseMock.statusCode).toBe(ServerModel_1.HTTP_CODES.UNAUTHORIZED);
                    expect(responseMock.write).toBeCalledWith(JSON.stringify('Unauthorized operation!'));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should do nothing for not supported http methods', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    request.method = 'SOME-METHOD';
                    return [4 /*yield*/, sut.handleRequest()];
                case 1:
                    _a.sent();
                    expect(responseMock.write).not.toBeCalled();
                    expect(responseMock.writeHead).not.toBeCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
