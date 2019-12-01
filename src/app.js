"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.port = 5000;
        this.app.get("/", function (req, res) { res.sendFile(path.join(__dirname, 'public') + "/index.html"); });
        this.app.use("/assets", express.static(path.join(__dirname, "public")));
    }
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("App listening on port " + _this.port);
        });
    };
    return App;
}());
exports.default = App;
