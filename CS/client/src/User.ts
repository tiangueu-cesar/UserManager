namespace AJAX {

/**********************************************************************************************************************
 * Class "User": represents all data of a user in the userList - class is exported  (needs ES6)                       *
 **********************************************************************************************************************/
class User {
	id       : number;
	rolle :string;
	vorname  : string;
	emailadresse :string;
	password    :string;
	nachname : string;
	time     : string;
    constructor( vname:string, nname:string , emailadresse :string, password    :string ,rolle :string ) {

        this.vorname  = vname;
        this.nachname = nname;
        this.emailadresse= emailadresse;
        this.password =password;
        this.rolle=rolle;

    }
}

/*****************************************************************************/
/* render function: takes a message and a userData-array                     */

/*****************************************************************************/



function render(message: string, userList: User[]): void {

	let buffer: string = "";
	//--- render message --------------------------------------------------------
	buffer += "<div id='serverMessage'> " + message + "</div>\n";
	//--- render table (only if userData exists) --------------------------------
	if (userList.length > 0) {
		buffer += "<div id='userList'>\n";
		buffer += "  <table class=\"table table-striped table-hover\" " +
			"align='center' width='20'>\n";
		buffer += "    <tr >\n";
		buffer += "      <th style=\"text-align:center\" > Id       </th>";
		buffer += "      <th style=\"text-align:center\" > Vorname  </th>";
		buffer += "      <th style=\"text-align:center\"> Nachname </th>";
        buffer += "      <th style=\"text-align:center\" > Emailadresse </th>";
        buffer += "      <th style=\"text-align:center\" > Passwort </th>";
        buffer += "      <th style=\"text-align:center\"> Rolle </th>";
		buffer += "    </tr>\n";
		for (let user of userList) { // iterate through array "userData"
			if (user != null) {  // ignore array-elements that have been deleted
				buffer += "    <tr id=user'" + user.id + "'>\n";
				buffer += "      <td style=\"text-align:center\"> " + user.id + " </td>\n";
				buffer += "      <td style=\"text-align:center\"> " + user.vorname + " </td>\n";
				buffer += "      <td style=\"text-align:center\"> " + user.nachname + " </td>\n";
                buffer += "      <td style=\"text-align:center\"> " + user.emailadresse + " </td>\n";
                buffer += "      <td style=\"text-align:center\"> " + user.password + " </td>\n";
                buffer += "      <td style=\"text-align:center\"> " + user.rolle + " </td>\n";
				buffer += "    </tr>\n";
			}
		}
	}
	//--- close table (and div) ------------------------------------------------
	buffer += "  </table>\n";
	buffer += "</div>";
	//--- put buffer-string into message and userlist --------------------------
	$('#data').html(buffer);



}


/*****************************************************************************/
/*  "Main" Callback funtion: triggered when page loaded                      */
/*****************************************************************************/
$(function () {


	//--- click on the create button --------------------------------------------
	$('#createBtn').on("click", () => {
		let vorname  : string = ($('#forenameInput').val() as string).trim();
		let nachname : string = ($('#surnameInput').val()  as string).trim();
        let username : string = ($('#usernameinput').val()  as string).trim();
        let emailadresse : string = ($('#emailadresseinput').val()  as string).trim();
        let passwort : string = ($('#passwortinput').val()  as string).trim();


		let data     : Object = {vorname: vorname, nachname: nachname , username :username , emailadresse : emailadresse , passwort : passwort};
		$.ajax({                // set up ajax request
			url         : 'http://localhost:8080/user',
			type        : 'POST',    // POST-request for CREATE
			data        : JSON.stringify(data),
			contentType : 'application/json',  // using json in request
			dataType    : 'json',              // expecting json in response
			success     : (data)  => { render(data.message, data.userList)    },
			error       : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
		});
	});

	//--- click on the read button ----------------------------------------------
	$('#readBtn').on("click", () => {
		let id: string = $('#userIDInput').val() as string;
		$.ajax({                // set up ajax request
			url      : 'http://localhost:8080/user/' + id,
			type     : 'GET',    // GET-request for READ
			dataType : 'json',   // expecting json
			success  : (data)  => { render(data.message, data.userList)    },
			error    : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
		});
	});

	//--- click on the update button --------------------------------------------
	$('#updateBtn').on("click", () => {
		let vorname  : string = ($('#forenameInput').val() as string).trim();
		let nachname : string = ($('#surnameInput').val()  as string).trim();
		let id       : string =  $('#userIDInput').val()   as string;
		let data     : Object = {vorname: vorname, nachname: nachname};
		$.ajax({                // set up ajax request
			url         : 'http://localhost:8080/user/' + id,
			type        : 'PUT',    // PUT-request for UPDATE
			data        : JSON.stringify(data),
			contentType : 'application/json',  // using json in request
			dataType    : 'json',              // expecting json in response
			success     : (data) => { render(data.message, data.userList) },
			error       : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
		});
	});


	//--- click on the delete button --------------------------------------------
	$('#deleteBtn').on("click", () => {
		let id: string = $('#userIDInput').val() as string;
		$.ajax({
			url      : 'http://localhost:8080/user/' + id,
			type     : 'DELETE',  // DELETE-request for DELETE
			dataType : 'json',    // expecting json
			success  : (data)  => { render(data.message, data.userList)    },
			error    : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
		});
	});

	//--- click on the read list button ----------------------------------------
	$('#readListBtn').on("click", () => {

        let sortart: string = $('#sortselect').val() as string;
		$.ajax({
			url      : 'http://localhost:8080/users/sortart/' + sortart,
			type     : 'GET',     // GET-request for DELETE. Okay.. how did that happen?
			dataType : 'json',    // expecting json
			success  : (data)  => { render(data.message, data.userList)    },
			error    : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
		});
	});

	//--- click on the delete list button --------------------------------------------
	$('#deleteListBtn').on("click", () => {
		$.ajax({
			url      : 'http://localhost:8080/users',
			type     : 'DELETE',  // DELETE-request for DELETE
			dataType : 'json',    // expecting json
			success  : (data) => { render(data.message, data.userList)   },
			error    : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
		});
	});

	$('#searchInput').on('input', (event) => {

		let oldQuery : string = $(event.target).val() as string;
		setTimeout(() => {
			let newQuery : string = $(event.target).val() as string;
			if(newQuery === oldQuery){  // User stopped typing.
                $.ajax({
                    url      : 'http://localhost:8080/users/' + newQuery ,
                    type     : 'GET',
                    dataType : 'json',    // expecting json
                    success  : (data) => { render(data.message, data.userList)   },
                    error    : (jqXHR) => { render(jqXHR.responseJSON.message, []) }
                });
			}

		}, 100);
	});
});

} // end of namespace AJAX
