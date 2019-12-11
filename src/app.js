"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var App = /** @class */ (function () {
    function App() {
        this.repo = new UserRepository();
        this.controller = new UserController(this.repo);
        this.app = express();
        this.port = 5000;
        this.app.get("/", function (req, res) { res.sendFile(path.join(__dirname, 'public') + "/index.html"); });
        this.app.use(bodyParser.json());
        this.app.use("/assets", express.static(path.join(__dirname, "public")));
        this.app.use('/api', this.controller.router);
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
        this.path = '/users';
        this.router = express.Router();
        this.getAllUsers = function (request, response) {
            response.send(_this.userRepository.getUsers());
        };
        this.addUser = function (request, response) {
            var user = request.body;
            response.send(_this.userRepository.addUser(user));
        };
        this.deleteUser = function (request, response) {
            var id = Number(request.query.ID);
            response.send(_this.userRepository.deleteUser(id));
        };
        this.intializeRoutes();
    }
    UserController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.addUser);
        this.router.get(this.path + "/delete", this.deleteUser);
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
    UserRepository.prototype.addUser = function (user) {
        user.id = this.getNextId();
        this.users.push(user);
        return user;
    };
    UserRepository.prototype.deleteUser = function (id) {
        var index;
        index = this.users.findIndex(function (item) { return item.id == id; });
        console.log("ID: " + id);
        console.log("Index: " + index);
        this.users.splice(index, 1);
        console.log(this.users);
        return true;
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
