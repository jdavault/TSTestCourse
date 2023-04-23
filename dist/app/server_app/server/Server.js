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
exports.Server = void 0;
var http_1 = require("http");
var Authorizer_1 = require("../auth/Authorizer");
var ReservationsDataAccess_1 = require("../data/ReservationsDataAccess");
var LoginHandler_1 = require("../handlers/LoginHandler");
var RegisterHandler_1 = require("../handlers/RegisterHandler");
var ReservationsHandler_1 = require("../handlers/ReservationsHandler");
var ServerModel_1 = require("../model/ServerModel");
var Server = /** @class */ (function () {
    function Server() {
        this.authorizer = new Authorizer_1.Authorizer();
        this.reservationsDataAccess = new ReservationsDataAccess_1.ReservationsDataAccess();
    }
    Server.prototype.startServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.server = (0, http_1.createServer)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Got request from ".concat(req.headers['user-agent']));
                                console.log("Got request for ".concat(req.url));
                                return [4 /*yield*/, this.handleRequest(req, res)];
                            case 1:
                                _a.sent();
                                res.end();
                                return [2 /*return*/];
                        }
                    });
                }); });
                this.server.listen(8080);
                console.log('server started');
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.handleRequest = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var route, _a, reservation, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        route = this.getRouteFromUrl(request);
                        _a = route;
                        switch (_a) {
                            case 'register': return [3 /*break*/, 1];
                            case 'login': return [3 /*break*/, 3];
                            case 'reservation': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, new RegisterHandler_1.RegisterHandler(request, response, this.authorizer).handleRequest()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 3: return [4 /*yield*/, new LoginHandler_1.LoginHandler(request, response, this.authorizer).handleRequest()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        reservation = new ReservationsHandler_1.ReservationsHandler(request, response, this.authorizer, this.reservationsDataAccess);
                        return [4 /*yield*/, reservation.handleRequest()];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7: return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _b.sent();
                        response.writeHead(ServerModel_1.HTTP_CODES.INTERNAL_SERVER_ERROR, JSON.stringify("Internal server error: ".concat(error_1.message)));
                        console.log(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.getRouteFromUrl = function (request) {
        var fullRoute = request.url;
        if (fullRoute) {
            return fullRoute.split('/')[1];
        }
    };
    Server.prototype.stopServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.server) {
                    this.server.close();
                    console.log('server closed');
                }
                return [2 /*return*/];
            });
        });
    };
    return Server;
}());
exports.Server = Server;
