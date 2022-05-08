const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://127.0.0.1:1883', { host:"127.0.0.1",port:"1883",username: "publisher1" })

const topic1 = "/nodejs/mqtt"
const topic2 = "topic2"

client.on('connect', function () {
    console.log('someone connected!');
    client.subscribe([topic1], function (err) {
        if (!err) {
            client.publish(topic1, 'Hello mqtt ' + Date.now())
        } else {
            console.error(err);
        }
    })
})
console.log('aqui');

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    //client.end()
})