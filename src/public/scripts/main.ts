class App {
    constructor() {
        console.log('it works, too2');
        this.initBtns();
        this.loadUsers();
    };

    private loadUsers() {
        console.log('loading the users');
        $.ajax('/api/users',
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
        $('#deleteIDbtn').on('click', t => {
                let id: string;
                id = $('#deleteIn').val().toString();
                $.ajax('/api/users/delete',
                    {
                        type: 'GET',
                        data: {
                            ID: $("#deleteIn").val().toString()
                        },
                        contentType: "application/json",
                        success: data => {
                            console.log('form submitted.' + data.ID);
                            this.loadUsers();
                        }
                    });
            }
        );

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
        });
    }}

        $(() => {
            const app = new App();
        });

