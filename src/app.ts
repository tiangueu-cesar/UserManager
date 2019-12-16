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
        this.router.get(this.path+"/sortVName", this.sortVName);
        this.router.get(this.path+"/sortName", this.sortName);
        this.router.get(this.path+"/sortRolle", this.sortRolle);
        this.router.get(this.path+"/sortID", this.sortID);
        this.router.get(this.path+"/edit", this.editUser);
        this.router.get(this.path+"/vnameFilter", this.vnameFilter);
        this.router.get(this.path+"/nameFilter", this.nameFilter);
        this.router.get(this.path+"/rolleFilter", this.rolleFilter);
        this.router.post(this.path+"/edit", this.editUserById);
        this.router.get(this.path+"/testUsers", this.addTestUsers);
    }

    getAllUsers = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.getUsers());
    };

    sortName = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.sortName());
    };

    sortVName = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.sortVName());
    };

    sortID = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.sortID());
    };

    sortRolle = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.sortRolle());
    };

    addUser = (request: express.Request, response: express.Response) => {
        const user: User = request.body;
        response.send(this.userRepository.addUser(user));
    };

    addTestUsers = (request: express.Request, response: express.Response) => {
        response.send(this.userRepository.addTestUsers());
    };

    editUserById = (request: express.Request, response: express.Response) => {
        const user: User = request.body;
        response.send(this.userRepository.editUserById(user));
    };

    deleteUser = (request: express.Request, response: express.Response) => {
        const id = Number(request.query.ID);
        response.send(this.userRepository.deleteUser(id));
    };

    vnameFilter = (request: express.Request, response: express.Response) => {
        const wordpart = request.query.wordpart;
        response.send(this.userRepository.vnameFilter(wordpart));
    };

    nameFilter = (request: express.Request, response: express.Response) => {
        const wordpart = request.query.wordpart;
        response.send(this.userRepository.nameFilter(wordpart));
    };

    rolleFilter = (request: express.Request, response: express.Response) => {
        const wordpart = request.query.wordpart;
        response.send(this.userRepository.rolleFilter(wordpart));
    };

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
        return this.users.sort((a, b) => (a.nachname > b.nachname) ?
            1 : (a.nachname === b.nachname) ?
                ((a.id > b.id) ? 1 : -1) : -1);
    }

    public sortVName(): User[] {
        return this.users.sort((a, b) => (a.vorname > b.vorname) ?
            1 : (a.vorname === b.vorname) ?
                ((a.id > b.id) ? 1 : -1) : -1);
    }

    public sortRolle(): User[] {
        return this.users.sort((a, b) => (a.rolle > b.rolle) ?
            1 : (a.rolle === b.rolle) ?
                ((a.id > b.id) ? 1 : -1) : -1);
    }

    public sortID(): User[] {
        return this.users.sort((a, b) => (a.id > b.id) ? 1 : -1);
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

    public vnameFilter(wordpart: string): User[] {
        return this.users.filter(item => item.vorname.includes(wordpart));
    }

    public nameFilter(wordpart: string): User[] {
          return this.users.filter(item => item.nachname.includes(wordpart));
    }

    public rolleFilter(wordpart: string): User[] {
        return this.users.filter(item => item.rolle.includes(wordpart));
    }

    public addTestUsers(): User[] {

        this.users.push({
            id: this.getNextId(),
            vorname:'David',
            nachname: 'Hasselhoff',
            email: 'freedom@mail.de',
            passwort: 'bier',
            rolle: 'Superuser',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'Hello',
            nachname: 'Spencer',
            email: 'test@mail.de',
            passwort: 'supersicher',
            rolle: 'Admin',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'Donald',
            nachname: 'Duck',
            email: 'entenhausen@mail.de',
            passwort: 'daisy',
            rolle: 'User',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'Milan',
            nachname: 'Sens',
            email: 'Linux@mail.de',
            passwort: 'zugegeben',
            rolle: 'Superuser',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'Christian',
            nachname: 'Peter',
            email: 'hallo@mail.de',
            passwort: 'quatsch',
            rolle: 'Admin',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'Garfield',
            nachname: 'Katze',
            email: 'john@mail.de',
            passwort: 'lasagne',
            rolle: 'Admin',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'John',
            nachname: 'Doe',
            email: 'test@mail.de',
            passwort: 'passwort',
            rolle: 'User',
        });

        this.users.push({
            id: this.getNextId(),
            vorname:'test',
            nachname: 'einnachname',
            email: 'test@mail.de',
            passwort: 'supersicher',
            rolle: 'Admin',
        });

        return this.users;
    }

    public editUser(id: number): User {
        let user : User;
        user = this.users.find(item => item.id==id);
        return user;
    }

    public editUserById(user: User): User {
        let userToChange : User;
        this.users.find(item => item.id==user.id).nachname = user.nachname;
        this.users.find(item => item.id==user.id).vorname = user.vorname;
        this.users.find(item => item.id==user.id).email = user.email;
        this.users.find(item => item.id==user.id).passwort = user.passwort;
        this.users.find(item => item.id==user.id).rolle = user.rolle;
        return user;
    }

    private getNextId() : number {
        return this.lastId ++;
    }

}
/*
addUser

deleteUserById
editUserById
getAllUsersSorted
*/

export default App;
