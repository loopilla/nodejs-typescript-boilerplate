import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

app.get("/", (req, res, next) => {
    res.send({ message: "App running!"});
});

const server = app.listen(app.get("port"), () => {
    console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

export = server;