const { Router } = require("express");
const express = require("express")
const app = express()

var users = {}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var routers = Router();

routers.get("/demo/greeting", (req, res) => {
    let id = Object.keys(users).findIndex(val => val == req.query.name);
    var saludo = "";
    switch(users[req.query.name]){
        case "ES":
            saludo = "Hola";
            break;
        case "FR":
            saludo = "Salut"
            break;
        default:
            saludo = "Hello";
    }
    res.json({ id: id, content: `${saludo}, ${req.query.name}!` })
})

routers.post("/demo/register", (req, res) => {
    console.log("[POST] : ",req.query.name, req.query.Lang)
    users[req.query.name] = req.query.Lang;
    console.log(users);
    res.json({ status: "ok" });
})

app.use(routers);

app.listen(3000, () => {
    console.log("INICIADO......")
})