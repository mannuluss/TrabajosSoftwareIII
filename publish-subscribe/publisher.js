const { client, conectionMQTT } = require("./index")
const express = require("express");

conectionMQTT();

const topic = process.argv[2] ? process.argv[2] : "#";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/publish", (req, res) => {
  var currentTopic = req.query.topic ? req.query.topic : topic;
  console.log("[POST] ", currentTopic, req.body);
  client.publish(currentTopic, JSON.stringify(req.body), (err, packet) => {
    if (err)
      res.send(err);
    else
      res.send("send ok")
  });
})

app.listen(3030, () => { console.log(`INICIADO EL PUBLISHER DE MQTT en TOPIC {${topic}}`) })
//client.publish('topic', 'message')