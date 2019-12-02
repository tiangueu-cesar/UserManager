import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from "path";

class App {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = 5000;
        this.app.get("/", (req, res)=>{res.sendFile(path.join(__dirname, 'public')+"/index.html")});
        this.app.use("/assets", express.static(path.join(__dirname, "public")));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

class UserController {
    public path = '/';
    public router = express.Router();

    constructor(private userRepository : UserRepository) {
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
    }

    getAllUsers = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.getUsers());
    }
}


class User {
    id: number;
    vorname: string;
    nachname: string;
    email: string;
    passwort: string;
    rolle: string;

    constructor(vorname: string) { this.vorname = vorname; }
    }

class UserRepository {
    private users: Users[] = [];

    private lastId: number = 0;

    public getUsers(): Users[] {
        return this.users;
    }


    private getNextId() : number {
        return this.lastId ++;
    }

    constructor() {
        this.initMockData();
    }

    public initMockData() {
        this.users.push({
            id: this.getNextId(),
            vorname:'test',
            nachname: 'einnachname',
            email: 'test@mail.de',
            passwort: 'supersicher',
            rolle: 'Admin',
        });
    }
}
/*
addUser

deleteUserById
editUserById
getAllUsersSorted
*/

export default App;
