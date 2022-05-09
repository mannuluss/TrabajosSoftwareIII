/**
 * Codigo dedicado a crear una publicacion en el servidor MQTT
 */

const mqtt = require('mqtt');

/**
 * Configuracion de la conexion al servidor MQTT
 */
const options = {
    // clientId: 'client123', // Se puede definir un cliente, de lo contrario el servidor define un cliente
    // username: 'username', // Usuario para conectar al servidor
    // password: 'password' // Contraseña para conectar al servidor
}

/**
 * Crear un cliente conectado al servidor MQTT
 */
const client = mqtt.connect("mqtt://127.0.0.1:1883", options);

/**
 * Señar error en la conexion al servidor
 */
client.on("error", (error) => {
    console.error(error);
});

/**
 * Señal reconectando al servidor
 */
client.on('reconnect', () => {
    console.log('Reconect');
})

/**
 * funcion que se conecta al servicio de mosquitto
 */
async function conectionMQTT() {
    return new Promise((resolve, reject) => {

        client.on('connect', (stream) => {
            console.log("conectado al MQTT....")
            return resolve(stream);
        })
    });
};

module.exports.client = client;
module.exports.conectionMQTT = conectionMQTT;