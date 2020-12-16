namespace BOOTSTRAP {

// Constant Value for magic Number 13
const ENTER_KEY: number = 13;

/**********************************************************************************************************************
 * Class "User": represents all data of a user in the userList - class is exported  (needs ES6)                       *
 **********************************************************************************************************************/
class User {
	id       : number;
	vorname  : string;
	nachname : string;
	time     : string;
}

/**********************************************************************************************************************
 * Class "UserList" as Handler and Renderer for all Users.                                                            *
 * - methods for CREATE, UPDATE, DELETE                                                                               *
 * - methods for rendering userList and result                                                                        *
 * UserList is exported                                                                                               *
 **********************************************************************************************************************/
class UserList {
	// all needed DOM-Elements
	private vornameInput  : JQuery = $("#vornameInput");
	private nachnameInput : JQuery = $("#nachnameInput");
	private userTable     : JQuery = $("#userList");
	private vornameEdit   : JQuery = $("#editVorname");
	private nachnameEdit  : JQuery = $("#editNachname");
	private saveBtn       : JQuery = $("#editSaveBtn");
	private editWindow    : JQuery = $("#editWindow");
	private resultWindow  : JQuery = $("#resultWindow");

	/**
	 * Creates new User with Attributes from Inputfields
	 * Only if vorname and nachname are not empty, the User is pushed to userList
	 */
	public createUser(event): void {
		event.preventDefault(); // bit tricky: prevent form from reloading page
		let vorname  : string = (this.vornameInput.val()  as string).trim();
		let nachname : string = (this.nachnameInput.val() as string).trim();
		if (vorname != "" && nachname != "") {
			let data: Object = {vorname: vorname, nachname: nachname};
			$.ajax({
				url         : 'http://localhost:8080/user',
				type        : 'POST',    // POST-request for CREATE
				data        : JSON.stringify(data),
				contentType : 'application/json',  // using json in request
				dataType    : 'json',              // expecting json in response
				error: (jqXHR) => {
					this.renderResult(jqXHR.responseJSON.message, jqXHR.status);
				},
				success: (data) => {
					this.renderResult(data.message, 0);
					this.renderList(data.userList)
				},
			});
			this.vornameInput.val("");  // clear input-field
			this.nachnameInput.val(""); // clear input-field
		}
	}

	/**
	 * Changes the value of a User if the Inputfields are not empty and hides the Modal.
	 * @param {number} id the specific userID
	 */
	public updateUser(id: number): void {
		let vorname  : string = (this.vornameEdit.val()  as string).trim();
		let nachname : string = (this.nachnameEdit.val() as string).trim();
		if (vorname != "" && nachname != "") {
			let data: Object = {vorname: vorname, nachname: nachname};
			$.ajax({                // set up ajax request
				url         : 'http://localhost:8080/user/' + id,
				type        : 'PUT',    // PUT-request for UPDATE
				data        : JSON.stringify(data),
				contentType : 'application/json',  // using json in request
				dataType    : 'json',              // expecting json in response
				error       : (jqXHR) => {
					this.renderResult(jqXHR.responseJSON.message, jqXHR.status)
				},
				success     : (data) => {
					this.renderResult(data.message, 0);
					this.renderList(data.userList)
				},
			});
			this.editWindow.modal("hide");  // hide modal window
		}
	}

	/**
	 * Changes an Array-field to null, so the User is deleted
	 * @param {number} id the specific userID
	 */
	public deleteUser(id: number): void {
		$.ajax({
			url      : 'http://localhost:8080/user/' + id,
			type     : 'DELETE',  // DELETE-request for DELETE
			dataType : 'json',    // expecting json
			error    : (jqXHR) => {
				this.renderResult(jqXHR.responseJSON.message, jqXHR.status)
			},
			success  : (data) => {
				this.renderResult(data.message, 0);
				this.renderList(data.userList)
			},
		});
	}

	/**
	 * Read List of users - needed only during boostrap
	 */
	public readUserlist(): void {
		$.ajax({
			url      : 'http://localhost:8080/users',
			type     : 'GET',     // GET-request for DELETE
			dataType : 'json',    // expecting json
			error    : (jqXHR) => {
				this.renderResult(jqXHR.responseJSON.message, jqXHR.status)
			},
			success  : (data) => {
				this.renderResult(data.message, 0);
				this.renderList(data.userList)
			},
		});
	}

	/**
	 * Renders a specific User to HTML-Element (Tablerow).
	 * Click-Handler are directly integrated (Not pretty, but rare...)
	 * Example output:
	 * <div class="row bg-white">
	 *   <div class='col-12 text-left'>< small>2018-4-17 20:04:46</small> </div>")
	 *   <div class="col-5  text-left">Max</div>
	 *   <div class="col-5  text-left">Mustermann</div>
	 *   <div class="col-1  justify-content-center fa fa-pencil"></div>
	 *   <div class="col-1  justify-content-center fa fa-trash" ></div>
	 * </div>
	 * @param   {User}    user    the specific User
	 * @param   {boolean} evenRow  is User an even or an odd one
	 * @returns {JQuery}  a table-row representation of user
	 */
	private renderUser(user: User, evenRow: boolean): JQuery {
		//--- alternate background-color
		let div: JQuery = evenRow ? $("<div class='row bg-white'>") : $("<div class='row bg-light'>");
		//--- append first elements
		div.append($("<div class='col-12 text-left'> <small>" + user.time     + "</small> </div>"));
		div.append($("<div class='col-5  text-left'>"         + user.vorname  +          "</div>"));
		div.append($("<div class='col-5  text-left'>"         + user.nachname +          "</div>"));
		//--- append edit/delete icons, together with its handlers
		div.append($("<div class='col-1  justify-content-center fa fa-pencil text-center'>").on("click", () => {
			this.renderEdit(user);
		}));
		div.append($("<div class='col-1  justify-content-center fa fa-trash  text-center'>").on("click", () => {
			this.deleteUser(user.id);
		}));
		//--- return complete table row (to renderList)
		return div;
	}

	/**
	 * Renders the List of Users as Bootstrap-Table
	 * Example output
	 * <div class="row bg-info ">
	 *   <div class="col-5 justify-content-center">Vorname</div>
	 *   <div class="col-5 justify-content-center">Nachname</div>
	 *   <div class="col-2"></div>
	 * </div>
	 * ... users as described in renderUser
	 */
	public renderList(userList: User[]): void {
		//--- clear table content (to fill it afterwards)
		this.userTable.empty();
		//--- set table header and for each user a table-row
		if (userList.length > 0) { // there are users in list -> print header
			this.userTable.append($(`
					<div class="row bg-info">
						<div class="col-5 justify-content-center">Vorname</div>
						<div class="col-5 justify-content-center">Nachname</div>
						<div class="col-2"></div>
					</div>
				`));
		}
		let evenRow = true;  // row-number is even
		for (let user of userList) {
			if (user != null) { // deleted user (=null) are not displayed
				this.userTable.append(this.renderUser(user, evenRow));
				evenRow = !evenRow;
			}
		}
	}

	/**
	 * Show the modal editWindow with values of a specific User.
	 * @param {string} user the specific user
	 */
	public renderEdit(user: User): void {
		//--- set values of form fields
		this.editWindow.find("h5.modal-title").text(user.vorname + " " + user.nachname);
		this.vornameEdit.val(user.vorname);
		this.nachnameEdit.val(user.nachname);
		//--- Edit-Window is used for various users -> remove all handlers
		this.saveBtn.off("click");
		this.vornameEdit.off("keyup");
		this.nachnameEdit.off("keyup");
		//--- ... and set handlers for current user
		this.saveBtn.on("click", () => { this.updateUser(user.id); });
		this.vornameEdit.on("keyup", (event: JQuery.Event) => {
			if (event.which === ENTER_KEY) { this.updateUser(user.id); }
		});
		this.nachnameEdit.on("keyup", (event: JQuery.Event) => {
			if (event.which === ENTER_KEY) { this.updateUser(user.id); }
		});
		//--- open modal window
		this.editWindow.modal();
	}

	/**
	 * Show the resultWindow
	 * @param {string} text the message provides by the server
	 * @param {string} status the error status
	 */
	public renderResult(text: string, status: number): void {
		this.resultWindow.html(text);
		if (status > 0) {  // an error has occured -> set color of result window to orange
			this.resultWindow.removeClass("bg-success");
			this.resultWindow.addClass("bg-danger");
		} else { // no error has occured -> set color of result window to green
			this.resultWindow.removeClass("bg-danger");
			this.resultWindow.addClass("bg-success");
		}
	}

}

/**********************************************************************************************************************
 * Main Event Listener, that waits until DOM is loaded                                                                *
 * - handle click on collapsable items in myContent -> hide all that are shown                                        *
 * - instantiate UserList array                                                                                       *
 * - define handler for clicking add-button or <cr> respectively                                                      *
 **********************************************************************************************************************/
$(function () {

	//-- instantiate UserList array --------------------------------------------------------------------------------------
	let userList: UserList = new UserList();

	//-- initially read UserList (in case of other client already included users) ----------------------------------------
	userList.readUserlist();

	//-- handle click on collapsable items in myContent -> hide all that are shown ---------------------------------------
	// see: https://getbootstrap.com/docs/4.0/components/collapse -> JavaScript
	let contentArea: JQuery = $('#contentArea'); // consider only elements in contentArea
	contentArea.on('show.bs.collapse', () => {  // handles event "show.bs.collapse"
		contentArea.find('.collapse.show').collapse('hide'); // find shown and hide them
	});

	//--- define handler for clicking add-button or <cr> respectively ----------------------------------------------------
	$("#createBtn").on("click", () => {
		userList.createUser(event);
	});
	$("#vornameInput, #nachnameInput").on("keyup", (event: JQuery.Event) => {
		if (event.which === ENTER_KEY) {
			userList.createUser(event);
		} // only if "enter"-key (=13) is pressed
	});

});


} // end of namespace BOOTSTRAP
