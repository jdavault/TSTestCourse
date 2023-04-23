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
exports.ReservationsHandler = void 0;
var ServerModel_1 = require("../model/ServerModel");
var Utils_1 = require("../utils/Utils");
var ReservationsHandler = /** @class */ (function () {
    function ReservationsHandler(request, response, authorizer, reservationsDataAccess) {
        this.request = request;
        this.response = response;
        this.authorizer = authorizer;
        this.reservationsDataAccess = reservationsDataAccess;
    }
    ReservationsHandler.prototype.handleRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isAuthorized, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.isOperationAuthorized()];
                    case 1:
                        isAuthorized = _b.sent();
                        if (!isAuthorized) {
                            this.response.statusCode = ServerModel_1.HTTP_CODES.UNAUTHORIZED;
                            this.response.write(JSON.stringify('Unauthorized operation!'));
                            return [2 /*return*/];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 13, , 14]);
                        _a = this.request.method;
                        switch (_a) {
                            case ServerModel_1.HTTP_METHODS.POST: return [3 /*break*/, 3];
                            case ServerModel_1.HTTP_METHODS.GET: return [3 /*break*/, 5];
                            case ServerModel_1.HTTP_METHODS.PUT: return [3 /*break*/, 7];
                            case ServerModel_1.HTTP_METHODS.DELETE: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 3: return [4 /*yield*/, this.handlePost()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, this.handleGet()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.handlePut()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.handleDelete()];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11: return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        error_1 = _b.sent();
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ReservationsHandler.prototype.isOperationAuthorized = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenId, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenId = this.request.headers.authorization;
                        if (!tokenId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.authorizer.validateToken(tokenId)];
                    case 1:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
    };
    ReservationsHandler.prototype.handlePost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, reservationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, Utils_1.getRequestBody)(this.request)];
                    case 1:
                        requestBody = _a.sent();
                        if (!this.isValidReservation(requestBody)) {
                            this.response.statusCode = ServerModel_1.HTTP_CODES.BAD_REQUEST;
                            this.response.write(JSON.stringify('Incomplete reservation!'));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.reservationsDataAccess.createReservation(requestBody)];
                    case 2:
                        reservationId = _a.sent();
                        this.response.statusCode = ServerModel_1.HTTP_CODES.CREATED;
                        this.response.writeHead(ServerModel_1.HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
                        this.response.write(JSON.stringify({ reservationId: reservationId }));
                        return [2 /*return*/];
                }
            });
        });
    };
    ReservationsHandler.prototype.handleGet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, allReservations, reservation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.getIdFromUrl();
                        if (!(id === 'all')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reservationsDataAccess.getAllReservations()];
                    case 1:
                        allReservations = _a.sent();
                        this.response.writeHead(ServerModel_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                        this.response.write(JSON.stringify(allReservations));
                        return [2 /*return*/];
                    case 2:
                        if (!id) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.reservationsDataAccess.getReservation(id)];
                    case 3:
                        reservation = _a.sent();
                        if (reservation) {
                            this.response.writeHead(ServerModel_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                            this.response.write(JSON.stringify(reservation));
                        }
                        else {
                            this.response.statusCode = ServerModel_1.HTTP_CODES.NOT_fOUND;
                            this.response.write(JSON.stringify("Reservation with id ".concat(id, " not found")));
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.response.statusCode = ServerModel_1.HTTP_CODES.BAD_REQUEST;
                        this.response.write(JSON.stringify('Please provide an ID!'));
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ReservationsHandler.prototype.handlePut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, reservation, requestBody, _a, _b, _c, _i, property;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        id = this.getIdFromUrl();
                        if (!id) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.reservationsDataAccess.getReservation(id)];
                    case 1:
                        reservation = _d.sent();
                        if (!reservation) return [3 /*break*/, 9];
                        return [4 /*yield*/, (0, Utils_1.getRequestBody)(this.request)];
                    case 2:
                        requestBody = _d.sent();
                        if (!this.isValidPartialReservation(requestBody)) return [3 /*break*/, 7];
                        _a = requestBody;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 3;
                    case 3:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 5];
                        property = _c;
                        return [4 /*yield*/, this.reservationsDataAccess.updateReservation(id, property, requestBody[property])];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.response.writeHead(ServerModel_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                        this.response.write(JSON.stringify("Updated ".concat(Object.keys(requestBody), " of reservation ").concat(id)));
                        return [3 /*break*/, 8];
                    case 7:
                        this.response.statusCode = ServerModel_1.HTTP_CODES.BAD_REQUEST;
                        this.response.write(JSON.stringify('Please provide valid fields to update!'));
                        _d.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        this.response.statusCode = ServerModel_1.HTTP_CODES.NOT_fOUND;
                        this.response.write(JSON.stringify("Reservation with id ".concat(id, " not found")));
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        this.response.statusCode = ServerModel_1.HTTP_CODES.BAD_REQUEST;
                        this.response.write(JSON.stringify('Please provide an ID!'));
                        _d.label = 12;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ReservationsHandler.prototype.handleDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.getIdFromUrl();
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reservationsDataAccess.deleteReservation(id)];
                    case 1:
                        _a.sent();
                        this.response.statusCode = ServerModel_1.HTTP_CODES.OK;
                        this.response.write(JSON.stringify("Deleted reservation with id ".concat(id)));
                        return [3 /*break*/, 3];
                    case 2:
                        this.response.statusCode = ServerModel_1.HTTP_CODES.BAD_REQUEST;
                        this.response.write(JSON.stringify('Please provide an ID!'));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReservationsHandler.prototype.getIdFromUrl = function () {
        var fullRoute = this.request.url;
        if (fullRoute) {
            return fullRoute.split('/')[2];
        }
    };
    ReservationsHandler.prototype.isValidPartialReservation = function (reservation) {
        if (Object.keys(reservation).length === 0) {
            return false;
        }
        var genericReservation = {
            endDate: undefined,
            id: undefined,
            room: undefined,
            startDate: undefined,
            user: undefined
        };
        var reservationKeys = Object.keys(genericReservation);
        var hasValidKeys = false;
        var hasRightKeys = true;
        for (var key in reservation) {
            if (reservationKeys.includes(key)) {
                hasValidKeys = true;
            }
            else {
                hasRightKeys = false;
            }
        }
        return hasRightKeys && hasValidKeys;
    };
    ReservationsHandler.prototype.isValidReservation = function (reservation) {
        if (Object.keys(reservation).length === 0) {
            return false;
        }
        var genericReservation = {
            endDate: undefined,
            room: undefined,
            startDate: undefined,
            user: undefined,
            id: undefined
        };
        var reservationKeys = Object.keys(genericReservation);
        var hasRightKeys = true;
        for (var key in reservation) {
            if (!reservationKeys.includes(key)) {
                hasRightKeys = false;
            }
        }
        return hasRightKeys;
    };
    return ReservationsHandler;
}());
exports.ReservationsHandler = ReservationsHandler;
