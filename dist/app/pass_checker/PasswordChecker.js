"use strict";
exports.__esModule = true;
exports.PasswordChecker = exports.PasswordErrors = void 0;
var PasswordErrors;
(function (PasswordErrors) {
    PasswordErrors["SHORT"] = "Password is too short!";
    PasswordErrors["NO_UPPER_CASE"] = "Upper case letter required!";
    PasswordErrors["NO_LOWER_CASE"] = "Lower case letter required!";
    PasswordErrors["NO_NUMBER"] = "At least one number required!";
})(PasswordErrors = exports.PasswordErrors || (exports.PasswordErrors = {}));
var PasswordChecker = /** @class */ (function () {
    function PasswordChecker() {
    }
    PasswordChecker.prototype.checkPassword = function (password) {
        var reasons = [];
        this.checkForLength(password, reasons);
        this.checkForUpperCase(password, reasons);
        this.checkForLowerCase(password, reasons);
        return {
            valid: reasons.length > 0 ? false : true,
            reasons: reasons
        };
    };
    PasswordChecker.prototype.checkAdminPassword = function (password) {
        var basicCheck = this.checkPassword(password);
        this.checkForNumber(password, basicCheck.reasons);
        return {
            valid: basicCheck.reasons.length > 0 ? false : true,
            reasons: basicCheck.reasons
        };
    };
    PasswordChecker.prototype.checkForNumber = function (password, reasons) {
        var hasNumber = /\d/;
        if (!hasNumber.test(password)) {
            reasons.push(PasswordErrors.NO_NUMBER);
        }
    };
    PasswordChecker.prototype.checkForLength = function (password, reasons) {
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT);
        }
    };
    PasswordChecker.prototype.checkForUpperCase = function (password, reasons) {
        if (password == password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPER_CASE);
        }
    };
    PasswordChecker.prototype.checkForLowerCase = function (password, reasons) {
        if (password == password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWER_CASE);
        }
    };
    return PasswordChecker;
}());
exports.PasswordChecker = PasswordChecker;
