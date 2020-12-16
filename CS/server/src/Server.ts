/*****************************************************************************
 ***  Import some module from node.js (see: expressjs.com/en/4x/api.html)    *
 *****************************************************************************/
import * as express         from "express";   // import EXPRESS
import {Request, Response}  from "express";   // import from EXPRESS


class User {
  // attributes
	id       : number;
  vorname  : string;
  nachname : string;
  time     : string;
  emailadresse :string;
  password    :string;
  rolle :string;
  // e.g. 2017-10-29 17:33:08
  // methods
  constructor(id:number, vname:string, nname:string , emailadresse :string, password    :string ,rolle :string ) {
  	this.id       = id;
    this.vorname  = vname;
    this.nachname = nname;
    this.emailadresse= emailadresse;
    this.password =password;
    this.rolle=rolle;
    this.time     = new Date().toLocaleString('de-DE');
  }
}

//--- array of all users ------------------------------------------------------
let userList : User[] = [];

/*****************************************************************************
 ***  Create server with handler function and start it                       *
 *****************************************************************************/
let router = express();
router.listen(8080, "localhost", function () {
  console.log(`
    -------------------------------------------------------------
    Client-Server usermanager
    Dokumentation mit: im Terminal von webStorm
    "apidoc -o apidoc -e node_modules
    starte lokal apidoc/index.html
  
	  - AJAX:      http://localhost:8080/clientAJAX.html
    -------------------------------------------------------------
  `);
});

/*****************************************************************************
 ***  Static routers                                                         *
 *****************************************************************************/

let baseDir : string = __dirname + '/../..';  // get rid of /server/src

router.use(express.static('public'));
router.use("/",             express.static(baseDir + "/client/views"));
router.use("/css",          express.static(baseDir + "/client/css"));
router.use("/src",          express.static(baseDir + "/client/src"));
router.use("/jquery",       express.static(baseDir + "/client/node_modules/jquery/dist"));
router.use("/popper.js",    express.static(baseDir + "/client/node_modules/popper.js/dist"));
router.use("/bootstrap",    express.static(baseDir + "/client/node_modules/bootstrap/dist"));
router.use("/font-awesome", express.static(baseDir + "/client/node_modules/font-awesome"));
  router.use( express.json() );  // parsing json


router.post   ("/user", function (req: Request, res: Response) {
  let vorname  : string = (req.body.vorname  ? req.body.vorname:  "").trim();
  let nachname : string = (req.body.nachname ? req.body.nachname: "").trim();
  let username  : string = (req.body.username  ? req.body.username:  "").trim();
  let emailadresse : string = (req.body.emailadresse ? req.body.emailadresse: "").trim();
  let passwort : string = (req.body.passwort ? req.body.passwort: "").trim();
  let message  : string = "";
  //--- process parameters ----------------------------------------------------
  if ((vorname !== "") && (nachname !== "")) {
    userList.push(new User(userList.length, vorname, nachname , emailadresse, passwort, username)); // add a new User



    message = vorname + " " + nachname + " successfully added";

    res.status(201); // set http status to "Created"
  } else {
    res.status(400); // set http status to "Bad Request"
    message = "vorname or nachname not provided";
  }
  //--- prepare and send response ---------------------------------------------
  res.json( {message: message, userList: userList} );
});


router.get    ("/user/:id",   function (req: Request, res: Response) {
  let id       : number = req.params.id;
  let message  : string = "";
  let user     : User;
  //--- process parameters ----------------------------------------------------
  if (!isNaN(id) && id >= 0 && id < userList.length && userList[id] != null ) {
    message = "Selected item is " + userList[id].vorname + " " + userList[id].nachname;
    user = userList[id];
    res.status(200); // set http status to "OK"
  } else if (isNaN(id)) {
    message = "Id '" + id + "' not a number";
    res.status(400); // set http status to "Bad Request"
  } else if (id < 0 || id >= userList.length) {
    message = "Id " + id + " out of index range";
    res.status(404); // set http status to "Not Found"
  } else {
    message = "User with Id " + id + " already deleted";
    res.status(410); // set http status to "Not Found"
  }
  //--- prepare and send response ---------------------------------------------
  res.json( {message: message, userList: userList, user: user } );
});

router.get    ("/users/:query ",   function (req: Request, res: Response) {
    let query       : string = req.params.query;
    let message     : string = "";
    let foundUsers  : User[] = [];

    if(query === undefined) {
      res.status(400);
      message = "No query specified!";

    }else if(query.trim() === ""){
      res.status(400);
      message = "Displaying all users.";
      foundUsers = userList;
      //Little shortcut for empty query

    }else{
      foundUsers = userList.filter((user) => {
        return user.vorname.indexOf(query) >= 0 || user.nachname.indexOf(query) >= 0 || (user.vorname + ' ' + user.nachname).indexOf(query) >= 0;
      });

      if(foundUsers.length === 0){
        res.status(404);
        message = "No Users matching query ";
      }else{
        res.status(200);
        message = "Found " + foundUsers.length + " Users matching \"" + query + "\":";
      }
    }

    res.json( {message: message, userList: foundUsers});
});


router.put    ("/user/:id",   function (req: Request, res: Response) {
  let vorname  : string = (req.body.vorname  ? req.body.vorname  : "").trim();
  let nachname : string = (req.body.nachname ? req.body.nachname : "").trim();
  let id       : number = req.params.id;
  let message  : string = "";
  //--- process parameters ----------------------------------------------------
  if (!isNaN(id) && id >= 0 && id < userList.length && userList[id] != null) {
    if ( vorname !== "") { userList[id].vorname  =  vorname }
    if (nachname !== "") { userList[id].nachname = nachname }
    message = "Updated item is " + userList[id].vorname + " " + userList[id].nachname;
    res.status(200); // set http status to "Ok"
  } else if (isNaN(id)) {
    message = "Id '" + id + "' not a number";
    res.status(400); // set http status to "Bad Request"
  } else if (id >= userList.length) {
    message = "Id " + id + " out of index range";
    res.status(404); // set http status to "Not Found"
  } else {
    message = "User with Id " + id + " already deleted";
    res.status(410); // set http status to "Not Found"
  }
  //--- prepare and send response ---------------------------------------------
  res.json( { message: message, userList: userList } );
});


router.delete ("/user/:id",   function (req: Request, res: Response) {
  let id       : number = req.params.id;
  let message  : string = "";

  //--- process parameters ----------------------------------------------------
  if (!isNaN(id) && id >= 0 && id < userList.length && userList[id] != null) {
    message = userList[id].vorname + " " + userList[id].nachname + " has been deleted";
    userList[id] = null; // Overwrite the user information to null

    res.status(200); // set http status to "OK"
  } else if (isNaN(id)) {
    message = "Id '" + id + "' not a number";
    res.status(400); // set http status to "Bad Request"
  } else if (id < 0 || id >= userList.length) {
    message = "Id " + id + " out of index range";
    res.status(404); // set http status to "Not Found"
  } else {
    message = "User with Id " + id + " already deleted";
    res.status(410); // set http status to "Not Found"
  }
  //--- prepare and send response ---------------------------------------------
  res.json( {message: message, userList: userList} );
});


router.all ("/user", function (req: Request, res: Response) {
  res.status(400);
  res.json({message: "Parameter ID not provided", "userList": userList});
});

function sortiere(sortart : string){
  if(sortart =="vorname"){
      var sortedArray: User[] = userList.sort((n1,n2) => {
          if (n1.vorname > n2.vorname ) {

              return 1;
          }

          if (n1.vorname < n2.vorname) {
              return -1;
          }

          return 0;
      });

  }else if(sortart == "nachname"){
      var sortedArray: User[] = userList.sort((n1,n2) => {
          if (n1.nachname > n2.nachname ) {

              return 1;
          }

          if (n1.nachname < n2.nachname) {
              return -1;
          }

          return 0;
      });

  }else if(sortart == "rolle"){
      var sortedArray: User[] = userList.sort((n1,n2) => {
          if (n1.rolle > n2.rolle ) {

              return 1;
          }

          if (n1.rolle < n2.rolle) {
              return -1;
          }

          return 0;
      });

  }else if(sortart== "id"){
      var sortedArray: User[] = userList.sort((n1,n2) => {
          if (n1.id > n2.id ) {

              return 1;
          }

          if (n1.id < n2.id) {
              return -1;
          }

          return 0;
      });

  }
}

router.get    ("/users/sortart/:sortart", function (req: Request, res: Response) {
  let sortart : string = req.params.sortart;

  sortiere(sortart);
  let message    : string;
  let id         : number = userList.length;
  let noElements : number = 0;
  //--- construct message ----------------------------------------------------
  while (id--) { // iterate through list, starting at the end and decrementing
    if ( userList[id] != null) noElements++; // count not deleted elements
  } // remark: loop stops with id = -1
  message = "There are " + noElements + " users in list" + sortart;
  res.status(200); // set http status to "Ok"
  //--- prepare and send response ---------------------------------------------
  res.json( {message: message, userList: userList} );    // return message
});




router.delete ("/users", function (req: Request, res: Response) {
  let message    : string;
  let id         : number = userList.length;
  let noElements : number = 0;
  //--- construct message ----------------------------------------------------
  while (id--) { // iterate through list, starting at the end and decrementing
    if ( userList[id] != null) noElements++; // count not deleted elements
  } // remark: loop stops with id = -1
  message = noElements + " users have been deleted" ;
  userList = []; // Attention: References to userList are not deleted
  res.status(200); // set http status to "Ok"
  //--- prepare and send response ---------------------------------------------
  res.json( {message: message, userList: userList} );    // return message
});
