var redis = require('redis');
var cliConst = require('./public/javascripts/varClient');
const host = '127.0.0.1';
const port = 6379;

const redisClient = redis.createClient(port, host, redis);
redisClient.on('connect', function () {
    console.log("Redis Connected")
    redisClient.set('cliIdCounter', '1');
});
redisClient.on('error', function (err) {
    console.log(err)
});

function insert(key, object) {

    /*
     * obtengo el ultimo valor del contador de id
     * armo la key con ese id
     * inserto en el hash de redis, el id y el nombre
     * incremento el valor del contador
     * regreso el id del objeto guardado (Promesa)
     */
    switch (Object.getOwnPropertyNames(object)) {
        case '': {

        } break;
    }
    return new Promise((resolve) => {
        redisClient.get('clientIdCounter', (error, value) => {
            console.log("CLIENTCOUNTER " + value)
            key = "client" + value;
            redisClient.hmset(key, "id", value.toString(), "name", client['name']);
            redisClient.incr('cliIdCounter');
            resolve(value);
        });
    });
}

function getClient(id) {
    /**
     * armo la key con el id del parametro
     * consulto el valor de 'name' -> ¿Como seria con hgetall//varios atributos?
     * si existe armo el cliente y devuelvo la promesa
     * si no existe, devuelvo un string pelado que no existe
     *  */
    return new Promise((resolve, reject) => {
        redisClient.hget('client' + id, "name", (error, value) => {
            if (value) {
                name = value;
                cli = cliConst(id, name);
                resolve(cli);
            } else {
                resolve("No existe");
            }
        })
    });
}

function deleteClient(id) {
    return new Promise((resolve) => {
        var key = 'client' + id;
        redisClient.del(key, (error, value) => {
            (value != 0) ? resolve(value)
                :
                resolve("No existe el cliente");
        });

    });
}

module.exports = { redisClient, getClient, insertClient, deleteClient };