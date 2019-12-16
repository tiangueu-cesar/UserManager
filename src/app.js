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
        this.sortName = function (request, response) {
            response.send(_this.userRepository.sortName());
        };
        this.sortVName = function (request, response) {
            response.send(_this.userRepository.sortVName());
        };
        this.sortID = function (request, response) {
            response.send(_this.userRepository.sortID());
        };
        this.sortRolle = function (request, response) {
            response.send(_this.userRepository.sortRolle());
        };
        this.addUser = function (request, response) {
            var user = request.body;
            response.send(_this.userRepository.addUser(user));
        };
        this.addTestUsers = function (request, response) {
            response.send(_this.userRepository.addTestUsers());
        };
        this.editUserById = function (request, response) {
            var user = request.body;
            response.send(_this.userRepository.editUserById(user));
        };
        this.deleteUser = function (request, response) {
            var id = Number(request.query.ID);
            response.send(_this.userRepository.deleteUser(id));
        };
        this.vnameFilter = function (request, response) {
            var wordpart = request.query.wordpart;
            response.send(_this.userRepository.vnameFilter(wordpart));
        };
        this.nameFilter = function (request, response) {
            var wordpart = request.query.wordpart;
            response.send(_this.userRepository.nameFilter(wordpart));
        };
        this.rolleFilter = function (request, response) {
            var wordpart = request.query.wordpart;
            response.send(_this.userRepository.rolleFilter(wordpart));
        };
        this.editUser = function (request, response) {
            var id = Number(request.query.ID);
            response.send(_this.userRepository.editUser(id));
        };
        this.intializeRoutes();
    }
    UserController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.addUser);
        this.router.get(this.path + "/delete", this.deleteUser);
        this.router.get(this.path + "/sortVName", this.sortVName);
        this.router.get(this.path + "/sortName", this.sortName);
        this.router.get(this.path + "/sortRolle", this.sortRolle);
        this.router.get(this.path + "/sortID", this.sortID);
        this.router.get(this.path + "/edit", this.editUser);
        this.router.get(this.path + "/vnameFilter", this.vnameFilter);
        this.router.get(this.path + "/nameFilter", this.nameFilter);
        this.router.get(this.path + "/rolleFilter", this.rolleFilter);
        this.router.post(this.path + "/edit", this.editUserById);
        this.router.get(this.path + "/testUsers", this.addTestUsers);
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
    UserRepository.prototype.sortName = function () {
        return this.users.sort(function (a, b) { return (a.nachname > b.nachname) ?
            1 : (a.nachname === b.nachname) ?
            ((a.id > b.id) ? 1 : -1) : -1; });
    };
    UserRepository.prototype.sortVName = function () {
        return this.users.sort(function (a, b) { return (a.vorname > b.vorname) ?
            1 : (a.vorname === b.vorname) ?
            ((a.id > b.id) ? 1 : -1) : -1; });
    };
    UserRepository.prototype.sortRolle = function () {
        return this.users.sort(function (a, b) { return (a.rolle > b.rolle) ?
            1 : (a.rolle === b.rolle) ?
            ((a.id > b.id) ? 1 : -1) : -1; });
    };
    UserRepository.prototype.sortID = function () {
        return this.users.sort(function (a, b) { return (a.id > b.id) ? 1 : -1; });
    };
    UserRepository.prototype.addUser = function (user) {
        user.id = this.getNextId();
        this.users.push(user);
        return user;
    };
    UserRepository.prototype.deleteUser = function (id) {
        var index;
        index = this.users.findIndex(function (item) { return item.id == id; });
        this.users.splice(index, 1);
        return true;
    };
    UserRepository.prototype.vnameFilter = function (wordpart) {
        return this.users.filter(function (item) { return item.vorname.includes(wordpart); });
    };
    UserRepository.prototype.nameFilter = function (wordpart) {
        return this.users.filter(function (item) { return item.nachname.includes(wordpart); });
    };
    UserRepository.prototype.rolleFilter = function (wordpart) {
        return this.users.filter(function (item) { return item.rolle.includes(wordpart); });
    };
    UserRepository.prototype.addTestUsers = function () {
        this.users.push({
            id: this.getNextId(),
            vorname: 'David',
            nachname: 'Hasselhoff',
            email: 'freedom@mail.de',
            passwort: 'bier',
            rolle: 'Superuser',
        });
        this.users.push({
            id: this.getNextId(),
            vorname: 'Hello',
            nachname: 'Spencer',
            email: 'test@mail.de',
            passwort: 'supersicher',
            rolle: 'Admin',
        });
        this.users.push({
            id: this.getNextId(),
            vorname: 'Donald',
            nachname: 'Duck',
            email: 'entenhausen@mail.de',
            passwort: 'daisy',
            rolle: 'User',
        });
        this.users.push({
            id: this.getNextId(),
            vorname: 'Milan',
            nachname: 'Sens',
            email: 'Linux@mail.de',
            passwort: 'zugegeben',
            rolle: 'Superuser',
        });
        this.users.push({
            id: this.getNextId(),
            vorname: 'Christian',
            nachname: 'Peter',
            email: 'hallo@mail.de',
            passwort: 'quatsch',
            rolle: 'Admin',
        });
        this.users.push({
            id: this.getNextId(),
            vorname: 'Garfield',
            nachname: 'Katze',
            email: 'john@mail.de',
            passwort: 'lasagne',
            rolle: 'Admin',
        });
        this.users.push({
            id: this.getNextId(),
            vorname: 'John',
            nachname: 'Doe',
            email: 'test@mail.de',
            passwort: 'passwort',
            rolle: 'User',
        });
        return this.users;
    };
    UserRepository.prototype.editUser = function (id) {
        var user;
        user = this.users.find(function (item) { return item.id == id; });
        return user;
    };
    UserRepository.prototype.editUserById = function (user) {
        var userToChange;
        this.users.find(function (item) { return item.id == user.id; }).nachname = user.nachname;
        this.users.find(function (item) { return item.id == user.id; }).vorname = user.vorname;
        this.users.find(function (item) { return item.id == user.id; }).email = user.email;
        this.users.find(function (item) { return item.id == user.id; }).passwort = user.passwort;
        this.users.find(function (item) { return item.id == user.id; }).rolle = user.rolle;
        return user;
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
