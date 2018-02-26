import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

declare let process: any;
declare let __dirname: string;
declare let __filename: string;

export class Server {
    public app: express.Application;
    public server: any;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.config();
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
    }
}
