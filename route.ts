import * as express from "express";

namespace Route {
    export class Info {
        public info(request: express.Request, response: express.Response, next: express.NextFunction) {
            response.send({ message: "App running!"});
        }
    }
}

export = Route;
