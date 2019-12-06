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
    return App;
}());
$(function () {
    var app = new App();
});
