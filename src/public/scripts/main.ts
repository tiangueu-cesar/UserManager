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



class App {
    constructor() {
        console.log('it works, too2');
        this.loadUsers();
    };

    private loadUsers() {
        console.log('loading the users');
        $.ajax('/api/users',   // request url
            {
                success: this.createUserTable
            });
    }

    createUserTable = (data, status, hhr) => {
        console.log(data);
        $('body').append(JSON.stringify(data));
    }
}




$(() => {
    const app = new App();
});