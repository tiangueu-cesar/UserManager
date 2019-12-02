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
var UserController = /** @class */ (function () {
    function UserController(userRepository) {
        var _this = this;
        this.userRepository = userRepository;
        this.path = '/';
        this.router = express.Router();
        this.getAllUsers = function (request, response) {
            response.send(_this.userRepository.getUsers());
        };
    }
    UserController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
    };
    return UserController;
}());
var User = /** @class */ (function () {
    function User(vorname) {
        this.vorname = vorname;
    }
    return User;
}());
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.users = [];
        this.lastId = 0;
        this.initMockData();
    }
    UserRepository.prototype.getUsers = function () {
        return this.users;
    };
    UserRepository.prototype.getNextId = function () {
        return this.lastId++;
    };
    UserRepository.prototype.initMockData = function () {
        this.users.push({
            id: this.getNextId(),
            vorname: 'test',
            nachname: 'einnachname',
            email: 'test@mail.de',
            passwort: 'supersicher',
            rolle: 'Admin',
        });
    };
    return UserRepository;
}());
/*
addUser

deleteUserById
editUserById
getAllUsersSorted
*/
exports.default = App;
