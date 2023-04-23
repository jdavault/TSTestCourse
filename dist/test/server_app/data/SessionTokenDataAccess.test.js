"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var SessionTokenDataAccess_1 = require("../../../app/server_app/data/SessionTokenDataAccess");
var DataBase_1 = require("../../../app/server_app/data/DataBase");
var IdGenerator = __importStar(require("../../../app/server_app/data/IdGenerator"));
var mockInsert = jest.fn();
var mockGetBy = jest.fn();
var mockUpdate = jest.fn();
jest.mock('../../../app/server_app/data/DataBase', function () {
    return {
        DataBase: jest.fn().mockImplementation(function () {
            return {
                insert: mockInsert,
                getBy: mockGetBy,
                update: mockUpdate
            };
        })
    };
});
var someAccount = {
    id: '',
    password: 'somePassword',
    userName: 'someUserName'
};
describe('SessionTokenDataAccess test suite', function () {
    var sut;
    var fakeId = '1234';
    beforeEach(function () {
        sut = new SessionTokenDataAccess_1.SessionTokenDataAccess();
        expect(DataBase_1.DataBase).toHaveBeenCalledTimes(1);
        jest.spyOn(global.Date, 'now').mockReturnValue(0);
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValueOnce(fakeId);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it('should generate token for account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actualTokenId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockInsert.mockResolvedValueOnce(fakeId);
                    return [4 /*yield*/, sut.generateToken(someAccount)];
                case 1:
                    actualTokenId = _a.sent();
                    expect(actualTokenId).toBe(fakeId);
                    expect(mockInsert).toBeCalledWith({
                        id: '',
                        userName: someAccount.userName,
                        valid: true,
                        expirationDate: new Date(1000 * 60 * 60)
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should invalidate token', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sut.invalidateToken(fakeId)];
                case 1:
                    _a.sent();
                    expect(mockUpdate).toBeCalledWith(fakeId, 'valid', false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check valid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGetBy.mockResolvedValueOnce({ valid: true });
                    return [4 /*yield*/, sut.isValidToken({})];
                case 1:
                    actual = _a.sent();
                    expect(actual).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check invalid token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGetBy.mockResolvedValueOnce({ valid: false });
                    return [4 /*yield*/, sut.isValidToken({})];
                case 1:
                    actual = _a.sent();
                    expect(actual).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should check inexistent token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockGetBy.mockResolvedValueOnce(undefined);
                    return [4 /*yield*/, sut.isValidToken({})];
                case 1:
                    actual = _a.sent();
                    expect(actual).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
