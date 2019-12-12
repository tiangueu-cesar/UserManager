import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from "path";
import {url} from "inspector";

class App {
    public app: express.Application;
    public port: number;
    public controller: UserController;
    public repo: UserRepository;

    constructor() {
        this.repo = new UserRepository();
        this.controller = new UserController(this.repo);
        this.app = express();
        this.port = 5000;
        this.app.get("/", (req, res)=>{res.sendFile(path.join(__dirname, 'public')+"/index.html")});
        this.app.use(bodyParser.json());
        this.app.use("/assets", express.static(path.join(__dirname, "public")));
        this.app.use('/api', this.controller.router);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

class UserController {
    public path = '/users';
    public router = express.Router();

    constructor(private userRepository: UserRepository) {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.addUser);
        this.router.get(this.path+"/delete", this.deleteUser);
        this.router.get(this.path+"/sortName", this.sortName);
        this.router.get(this.path+"/edit", this.editUser);
    }

    getAllUsers = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.getUsers());
    };

    sortName = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.sortName());
    };

    addUser = (request: express.Request, response: express.Response) => {
        const user: User = request.body;
        response.send(this.userRepository.addUser(user));
    };

    deleteUser = (request: express.Request, response: express.Response) => {
        const id = Number(request.query.ID);
        response.send(this.userRepository.deleteUser(id));
    }

    editUser = (request: express.Request, response: express.Response) => {
        const id = Number(request.query.ID);
        response.send(this.userRepository.editUser(id));
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
    private users: User[] = [];

    private lastId: number = 0;

    public getUsers(): User[] {
        return this.users;
    }

    public sortName(): User[] {
        return this.users.sort((a, b) => (a.nachname > b.nachname) ? 1 : (a.nachname === b.nachname) ? ((a.id > b.id) ? 1 : -1) : -1);
    }

    public addUser(user: User): User {
        user.id = this.getNextId();
        this.users.push(user);
        return user;
    }

    public deleteUser(id: number): boolean {
        let index : number;
        index = this.users.findIndex(item => item.id==id);
        this.users.splice(index,1);
        return true;
    }

    public editUser(id: number): User {
        let user : User;
        user = this.users.find(item => item.id==id);
        return user;
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
