const { client, conectionMQTT } = require("./index")
const express = require("express");
const { json } = require("express");

const topic = process.argv[2] ? process.argv[2] : "#";
var brokerMsj = {}

var init = async () => {
    await conectionMQTT()

    client.subscribe(topic, (err, granted) => { // se suscribe a todos los topicos
        if (err)
            console.log(err);
        else
            console.log("[MQTT] subscribe: ", granted)
    })
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
        if (brokerMsj[topic] == undefined) {
            brokerMsj[topic] = []
        }
        brokerMsj[topic].push(payload.toString());
    })
}
init();

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/broker", (req, res) => {
    console.log("[GET] ", req.query);
    if (req.query.topic)
        res.json(brokerMsj[req.query.topic]);
    else
        res.json(brokerMsj);
});

app.listen(3040, () => { console.log("INICIADO EL PUBLISHER DE MQTT") })