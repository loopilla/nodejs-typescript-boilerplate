import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";

import * as infoRoute from "./route";

import { Server } from "./server";

declare let process: any;
declare let __dirname: string;
declare let __filename: string;

export class Applicaiton {
    public app: express.Application;
    public server: any;
    private port: number;

    constructor() {
        this.app = express();
        this.config();
        this.server = http.createServer(this.app);
        this.start();
    }

    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.routes();
    }

    start() {
        this.server.listen(this.app.get("port"));
        this.server.on("error", this.onError);
        this.server.on("listening", this.onListening);
    }

    private onError = (error: any) => {
        if (error.syscall !== "listen") {
            throw error;
          }

          const bind = typeof this.port === "string" ? "Pipe " + this.port : "Port " + this.port;

          // handle specific listen errors with friendly messages
          switch (error.code) {
            case "EACCES":
              console.error(bind + " requires elevated privileges");
              process.exit(1);
              break;
            case "EADDRINUSE":
              console.error(bind + " is already in use");
              process.exit(1);
              break;
            default:
              throw error;
          }
    }

    private onListening = () => {
        const addr = this.server.address();
        const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        console.log(("  App is running at http://localhost:%d in %s mode"), bind, this.app.get("env"));
        console.log("  Press CTRL-C to stop\n");
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        const info: infoRoute.Info = new infoRoute.Info();

        router.get("/", info.info.bind(info.info));

        this.app.use(router);
    }
}

const app = new Applicaiton();
module.exports = app;
