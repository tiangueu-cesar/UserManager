/*console.log('hello world');

$(function() {
    console.log('it works');

    $.ajax('/api/users',   // request url
        {
            success: function (data, status, xhr) {// success callback function
                console.log(data);
                $('body').append(JSON.stringify(data));
            }
        });
});*/
var App = /** @class */ (function () {
    function App() {
        this.createUserTable = function (data, status, hhr) {
            console.log(data);
            $('body').append(JSON.stringify(data));
        };
        console.log('it works, too2');
        this.initBtns();
        this.loadUsers();
    }
    ;
    App.prototype.loadUsers = function () {
        console.log('loading the users');
        $.ajax('/api/users', // request url
        {
            success: this.createUserTable
        });
    };
    App.prototype.initBtns = function () {
        var _this = this;
        $('#neuBtn').on('click', function (t) {
            alert("irgendein text");
            var dummyUser = { "vorname": "test2", "nachname": "einnachname2", "email": "test@mail.de2", "passwort": "supersicher2", "rolle": "Admin2" };
            $.ajax('/api/users', {
                type: 'POST',
                data: JSON.stringify(dummyUser),
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
    };
    return App;
}());
$(function () {
    var app = new App();
});
