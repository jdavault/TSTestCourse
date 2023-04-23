"use strict";
exports.__esModule = true;
exports.generateRandomId = void 0;
var crypto_1 = require("crypto");
function generateRandomId() {
    var randomId = (0, crypto_1.randomBytes)(10).toString('hex');
    return randomId;
}
exports.generateRandomId = generateRandomId;
