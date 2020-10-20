const { json } = require('express');
const redis = require('redis');
const host = '127.0.0.1';
const port = 6379;
const CODES = require('../Codes.js');


const redisClient = redis.createClient(port, host, redis);

redisClient.on('connect', function () {
    console.log("Redis Connected")
    redisClient.flushall();
    redisClient.set('ClientIdCount', '1');
});
redisClient.on('error', function (err) {
    console.log(err)
});

async function getNextId(model) {
    let key = model + "IdCount"
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, counterValue) => {
            if (err) reject(CODES.ERRORS.ERROR_AL_OBTENER_ULTIMO_ID)
            if (counterValue) {
                resolve(counterValue)
            }
            else
                resolve(null);
        })
    })
}

function increaseCounter(model) {
    let key = model + "IdCount"
    redisClient.incr(key);
}

async function insert(model, object) {
    return new Promise(async (resolve, reject) => {
        let id = await getNextId(model);
        object.id = id;
        let key = model + id;
        redisClient.set(key, JSON.stringify(object), (err, result) => {
            if (err) reject(CODES.ERRORS.ERROR_AL_INSERTAR_KEY)

            if (result) {
                increaseCounter(model);
                resolve(id)
            } else {
                resolve(false)
            }
        });
    });
}

function find(key) {
    try {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, value) => {
                if (err) reject(CODES.ERRORS.ERROR_AL_RECUPERAR_KEY)
                console.log(value)
                if (value) {
                    resolve(value)
                } else {
                    resolve(null);
                }
            })
        });
    }
    catch (exp) {
        throw exp;
    }
}

async function remove(key) {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (error, value) => {
            if (error) reject(CODES.ERRORS.ERROR_AL_BORRAR_KEY)

            console.log(value)
            value !== 0
                ? resolve(true)
                : resolve(false);
        });
    });
}

async function update(model, object) {
    let key = model + object.id
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err1, res1) => {
            if (err1) reject(CODES.ERRORS.ERROR_AL_ACTUALIZAR_KEY)
            if (res1 === null) resolve(false)

            redisClient.set(key, JSON.stringify(object), (err2, res2) => {
                if (err2) reject(CODES.ERRORS.ERROR_AL_ACTUALIZAR_KEY)

                console.log(res2)
                resolve(true)

            })
        })
    })
}

async function getall(model) {
    return new Promise((resolve, reject) => {

         redisClient.keys(model + '[1-9]*',  (err, result) => {
            if (err) reject("error")

            if (result.length > 0) {
                let models=[]

                result.forEach( (value) => {
                     redisClient.get(value,(err2, res2) => {
                        if (err2) reject("error")
                        
                        let object={
                            [value]: res2
                        }
                        console.log(JSON.stringify(object));
                        models.push(object) // No anda O.o
                    })
                })
                console.log('models'+JSON.stringify(models))
                resolve(result)
            }
        })
           
    })
}
module.exports = { insert, remove, find, update, getall };