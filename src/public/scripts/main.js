var App = /** @class */ (function () {
    function App() {
        this.createUserTable = function (data) {
            $('#tab1').empty();
            $('#tab1').append('<th>ID</th>');
            $('#tab1').append('<th>Vorname</th>');
            $('#tab1').append('<th> Nachname</th>');
            $('#tab1').append('<th>Email-Adresse</th>');
            $('#tab1').append('<th>Passwort</th>');
            $('#tab1').append('<th>Rolle</th>');
            data.forEach(function (value) {
                var newrow = $('<tr/>');
                $('#tab1').append(newrow);
                var td1 = $('</td>');
                newrow.append(td1);
                td1.text(value.vorname);
                newrow.append('<td>' + value.id + '</td>');
                newrow.append('<td>' + value.vorname + '</td>');
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
        $.ajax('/api/users', {
            success: this.createUserTable
        });
    };
    //https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string/43220059
    App.prototype.getUser = function (data) {
        $('#vorname').val(JSON.stringify(data.vorname).replace(/(^"|"$)/g, ''));
        $('#nachname').val(JSON.stringify(data.nachname).replace(/(^"|"$)/g, ''));
        $('#email').val(JSON.stringify(data.email).replace(/(^"|"$)/g, ''));
        $('#passwort').val(JSON.stringify(data.passwort).replace(/(^"|"$)/g, ''));
        $('#rolle').val(JSON.stringify(data.rolle).replace(/(^"|"$)/g, ''));
    };
    App.prototype.initBtns = function () {
        var _this = this;
        $('#deleteIDbtn').on('click', function (t) {
            var id;
            id = $('#deleteIn').val().toString();
            $.ajax('/api/users/delete', {
                type: 'GET',
                data: {
                    ID: $("#deleteIn").val().toString()
                },
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
        $('#neuBtn').on('click', function (t) {
            var vorname;
            var nachname;
            var email;
            var passwort;
            var rolle;
            vorname = $('#vorname').val().toString();
            nachname = $('#nachname').val().toString();
            email = $('#email').val().toString();
            passwort = $('#passwort').val().toString();
            rolle = $('#rolle').val().toString();
            var newUser = { "vorname": vorname, "nachname": nachname, "email": email, "passwort": passwort, "rolle": rolle };
            $.ajax('/api/users', {
                type: 'POST',
                data: JSON.stringify(newUser),
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
        $('#sortName').on('click', function (t) {
            $.ajax('/api/users/sortname', {
                type: 'GET',
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
        $('#sortVName').on('click', function (t) {
            $.ajax('/api/users/sortvname', {
                type: 'GET',
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
        $('#sortID').on('click', function (t) {
            $.ajax('/api/users/sortID', {
                type: 'GET',
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
        $('#sortRolle').on('click', function (t) {
            $.ajax('/api/users/sortRolle', {
                type: 'GET',
                contentType: "application/json",
                success: function (data) {
                    _this.loadUsers();
                }
            });
        });
        $('#editIDbtn').on('click', function (t) {
            $.ajax('/api/users/edit', {
                type: 'GET',
                data: {
                    ID: $("#deleteIn").val().toString()
                },
                contentType: "application/json",
                success: function (data) {
                    _this.getUser(data);
                }
            });
        });
        $('#vnamepartBtn').on('click', function (t) {
            $.ajax('/api/users/vnameFilter', {
                type: 'GET',
                data: {
                    wordpart: $("#wordpart").val().toString()
                },
                contentType: "application/json",
                success: _this.createUserTable
            });
        });
        $('#clearFilterBtn').on('click', function (t) {
            _this.loadUsers();
        });
        $('#okBtn').on('click', function (t) {
            var vorname;
            var nachname;
            var email;
            var passwort;
            var rolle;
            vorname = $('#vorname').val().toString();
            nachname = $('#nachname').val().toString();
            email = $('#email').val().toString();
            passwort = $('#passwort').val().toString();
            rolle = $('#rolle').val().toString();
            var newUser = { "id": $("#deleteIn").val().toString(), "vorname": vorname, "nachname": nachname, "email": email, "passwort": passwort, "rolle": rolle };
            $.ajax('/api/users/edit', {
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
