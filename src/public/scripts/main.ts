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



import htmlString = JQuery.htmlString;

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

        $('#tab1').empty();
        data.forEach(function (value)
        {
            let newrow = $('<tr/>');
            $('#tab1').append(newrow);
            let td1 = $('</td>');
            newrow.append(td1);
            td1.text(value.vorname);
            newrow.append('<td>' + value.id + '</td>');
            newrow.append('<td>' + value.nachname + '</td>');
            newrow.append('<td>' + value.email + '</td>');
            newrow.append('<td>' + value.passwort + '</td>');
            newrow.append('<td>' + value.rolle + '</td>');
        });
    };

    private initBtns() {
        $('#neuBtn').on('click', t => {
            let vorname: string;
            let nachname: string;
            let email: string;

            vorname = $('#vorname').val().toString();
            nachname = $('#nachname').val().toString();
            email = $('#email').val().toString();

            let newUser = {"vorname": vorname, "nachname": nachname,   "email": email,   "passwort": "supersicher2",  "rolle": "Admin2"};

            $.ajax('/api/users',
                {
                    type: 'POST',
                    data: JSON.stringify(newUser),
                    contentType: "application/json",
                    success: data => {
                        this.loadUsers();
                    }
                });
        })
    }}

        $(() => {
            const app = new App();
        });

