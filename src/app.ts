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

export default App;