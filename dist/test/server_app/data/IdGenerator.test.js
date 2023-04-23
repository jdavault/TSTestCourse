"use strict";
exports.__esModule = true;
var IdGenerator_1 = require("../../../app/server_app/data/IdGenerator");
describe('IdGenerator test suite', function () {
    it('should return a random string', function () {
        var randomId = (0, IdGenerator_1.generateRandomId)();
        expect(randomId.length).toBe(20);
    });
});
