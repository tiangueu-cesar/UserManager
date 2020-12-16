class App {
    constructor() {
        console.log('it works, too2');
        this.initBtns();
        this.loadUsers();
    };

    private loadUsers() {
        $.ajax('/api/users', {
                success: this.createUserTable
            });
    }


    private getUser(data) {
        $('#vorname').val(JSON.stringify(data.vorname).replace(/(^"|"$)/g, ''));
        $('#nachname').val(JSON.stringify(data.nachname).replace(/(^"|"$)/g, ''));
        $('#email').val(JSON.stringify(data.email).replace(/(^"|"$)/g, ''));
        $('#passwort').val(JSON.stringify(data.passwort).replace(/(^"|"$)/g, ''));
        $('#rolle').val(JSON.stringify(data.rolle).replace(/(^"|"$)/g, ''));
    }

    createUserTable = (data) => {

        $('#tab1').empty();
        $('#tab1').append('<th>ID</th>');
        $('#tab1').append('<th>Vorname</th>');
        $('#tab1').append('<th> Nachname</th>');
        $('#tab1').append('<th>Email-Adresse</th>');
        $('#tab1').append('<th>Passwort</th>');
        $('#tab1').append('<th>Rolle</th>');
        data.forEach(function (value)
        {
            let newrow = $('<tr/>');
            $('#tab1').append(newrow);
            let td1 = $('</td>');
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
                            this.loadUsers();
                        }
                    });
            }
        );

        $('#neuBtn').on('click', t => {
            let vorname: string;
            let nachname: string;
            let email: string;
            let passwort: string;
            let rolle: string;

            vorname = $('#vorname').val().toString();
            nachname = $('#nachname').val().toString();
            email = $('#email').val().toString();
            passwort = $('#passwort').val().toString();
            rolle = $('#rolle').val().toString();
            let newUser = {"vorname": vorname, "nachname": nachname,   "email": email,   "passwort": passwort,  "rolle": rolle};

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


        $('#sortName').on('click', t => {
            $.ajax('/api/users/sortname',
                {
                    type: 'GET',
                    contentType: "application/json",
                    success: data => {
                        this.loadUsers();
                    }
                });
        });

        $('#sortVName').on('click', t => {
            $.ajax('/api/users/sortvname',
                {
                    type: 'GET',
                    contentType: "application/json",
                    success: data => {
                        this.loadUsers();
                    }
                });
        });

        $('#sortID').on('click', t => {
            $.ajax('/api/users/sortID',
                {
                    type: 'GET',
                    contentType: "application/json",
                    success: data => {
                        this.loadUsers();
                    }
                });
        });

        $('#sortRolle').on('click', t => {
            $.ajax('/api/users/sortRolle',
                {
                    type: 'GET',
                    contentType: "application/json",
                    success: data => {
                        this.loadUsers();
                    }
                });
        });
        $('#editIDbtn').on('click', t => {
            $.ajax('/api/users/edit',
                {
                    type: 'GET',
                    data: {
                        ID: $("#deleteIn").val().toString()
                    },
                    contentType: "application/json",
                    success: data => {
                        this.getUser(data);
                        }
                });
        });

        $('#vnamepartBtn').on('click', t => {
            $.ajax('/api/users/vnameFilter',
                {
                    type: 'GET',
                    data: {
                        wordpart: $("#wordpart").val().toString()
                    },
                    contentType: "application/json",
                    success:  this.createUserTable
                });
        });

        $('#namepartBtn').on('click', t => {
            $.ajax('/api/users/nameFilter',
                {
                    type: 'GET',
                    data: {
                        wordpart: $("#wordpart").val().toString()
                    },
                    contentType: "application/json",
                    success:  this.createUserTable
                });
        });

        $('#rollePartBtn').on('click', t => {
            $.ajax('/api/users/rolleFilter',
                {
                    type: 'GET',
                    data: {
                        wordpart: $("#wordpart").val().toString()
                    },
                    contentType: "application/json",
                    success:  this.createUserTable
                });
        });

        $('#clearFilterBtn').on('click', t => {
           this.loadUsers();
        });


        $('#okBtn').on('click', t => {
            let vorname: string;
            let nachname: string;
            let email: string;
            let passwort: string;
            let rolle: string;

            vorname = $('#vorname').val().toString();
            nachname = $('#nachname').val().toString();
            email = $('#email').val().toString();
            passwort = $('#passwort').val().toString();
            rolle = $('#rolle').val().toString();

            let newUser = {"id": $("#deleteIn").val().toString(), "vorname": vorname, "nachname": nachname,   "email": email,   "passwort": passwort,  "rolle": rolle};

            $.ajax('/api/users/edit',
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

