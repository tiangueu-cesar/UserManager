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
        this.initBtns();
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

    private initBtns() {
        $('#neuBtn').on('click', t => {
            alert("irgendein text");
            let dummyUser = {"vorname": "test2",  "nachname": "einnachname2",   "email": "test@mail.de2",   "passwort": "supersicher2",  "rolle": "Admin2"};
            $.ajax('/api/users',
                {
                    type: 'POST',
                    data: JSON.stringify(dummyUser),
                    contentType: "application/json",
                });
        })
    }
}


$(() => {
    const app = new App();
});