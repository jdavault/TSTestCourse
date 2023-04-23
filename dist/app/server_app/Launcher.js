"use strict";
exports.__esModule = true;
/* istanbul ignore file */
var Server_1 = require("./server/Server");
var Launcher = /** @class */ (function () {
    function Launcher() {
        this.server = new Server_1.Server();
    }
    Launcher.prototype.startServer = function () {
        this.server.startServer();
    };
    Launcher.prototype.stopServer = function () {
        this.server.stopServer();
    };
    return Launcher;
}());
var launcher = new Launcher();
launcher.startServer();
