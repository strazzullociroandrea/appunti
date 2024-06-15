const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const conf = JSON.parse(fs.readFileSync("conf.json"));
//const session = require("express-session");

try{
    (() => {
        /*app.use(
            session({
                secret: conf.secret, // Chiave segreta utilizzata per firmare il cookie delle sessioni
                resave: false,
                saveUninitialized: false,
            }),
        );*/
        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        app.use("/", express.static(path.join(__dirname, "public")));
        const server = http.createServer(app);
        server.listen(conf.port, () => {
          console.log("---> server running on port " + conf.port);
        });
    })();
}catch(e){
    console.log("Errore nell'avvio del server");
    console.log(e);
}
