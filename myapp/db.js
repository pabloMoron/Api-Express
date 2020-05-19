var redis = require('redis');
var cliConst=require('./public/javascripts/varClient');
const host = '127.0.0.1';
const port = 6379;

const redisClient = redis.createClient(port, host, redis);
redisClient.on('connect', function() {
    console.log("Redis Connected")
    redisClient.set('cliIdCounter','1');
});
redisClient.on('error', function(err) {
    console.log(err)
});

function insertClient(client) {
    /*
     * obtengo el ultimo valor del contador de id
     * armo la key con ese id
     * inserto en el hash de redis, el id y el nombre
     * incremento el valor del contador
     * regreso el id del objeto guardado (Promesa)
     */
     return new Promise((resolve)=>{
        redisClient.get('cliIdCounter',(error,value)=>{
            console.log("CLIENTCOUNTER "+value)            
            key= "client"+value;
            redisClient.hmset(key,"id",value.toString(),"name",client['name']);
            redisClient.incr('cliIdCounter');
            resolve(value);
        });
    });
    /*
    esto no sirve
    redisClient.get('cliIdCounter',function(error,reply){
    var id =reply;
    var name = client['name'];
    var key = "client"+id;
    redisClient.hmset(key,"id",id.toString(),"name",name);
    redisClient.incr('cliIdCounter');
    return id;
    });*/
}

function getClient(id){
/**
 * armo la key con el id del parametro
 * consulto el valor de 'name' -> ¿Como seria con hgetall//varios atributos?
 * si existe armo el cliente y devuelvo la promesa
 * si no existe, devuelvo un string pelado que no existe
 *  */    
return new Promise((resolve,reject)=>{
redisClient.hget('client'+id,"name",(error,value)=>{
if(value){
    name=value;
    cli=cliConst(id,name);
    resolve(cli);
}else{
    resolve("No existe");
}
})
}); 
/*
mas basura
    var key='client'+id;
var name;
redisClient.hget(key,'id',function(error, value){
    async.name = value;
});
console.log(name);
return(cliConst(id,name));
*/
}

function deleteClient(id){
    return new Promise((resolve)=>{
        var key = 'client'+id;
        redisClient.del(key,(error,value)=>{
            (value!=0) ? resolve(value)
            :
            resolve("No existe el cliente");
        });

    });
}

module.exports = {redisClient,getClient,insertClient,deleteClient};