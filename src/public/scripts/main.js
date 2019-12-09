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
            $('#tab1').empty();
            data.forEach(function (value) {
                var newrow = $('<tr/>');
                $('#tab1').append(newrow);
                var td1 = $('</td>');
                newrow.append(td1);
                td1.text(value.vorname);
                newrow.append('<td>' + value.id + '</td>');
                newrow.append('<td>' + value.nachname + '</td>');
                newrow.append('<td>' + value.email + '</td>');
                newrow.append('<td>' + value.passwort + '</td>');
                newrow.append('<td>' + value.rolle + '</td>');
            });
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
            var vorname;
            var nachname;
            var email;
            vorname = $('#vorname').val().toString();
            nachname = $('#nachname').val().toString();
            email = $('#email').val().toString();
            var newUser = { "vorname": vorname, "nachname": nachname, "email": email, "passwort": "supersicher2", "rolle": "Admin2" };
            $.ajax('/api/users', {
                type: 'POST',
                data: JSON.stringify(newUser),
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
