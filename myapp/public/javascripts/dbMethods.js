var redisClient = require('../../dbRedis');

async function save(adapter, object){
    var result;
switch (adapter){
    case "redis":{
        try{
            await redisClient.insert(object);
        } catch(error)
        {
            return(error);
        }

        break;
    }
    case "mongo":{
        try{
            //logica para mongo
        } catch(error){
            return error;
        }
    }
    break;
}
return result;
}

function remove (key, adapter) {
    var result;
    switch (adapter){
        case "redis":{
            //redisClient.
    
        }
        break;
        case "mongo":{
    
        }
        break;
    }
    
}

function get (key, adapter) {
    var result;
    switch (adapter){
        case "redis":{
            //redisClient.
    
        }
        break;
        case "mongo":{
    
        }
        break;
    }
    module.exports={save, remove, get}
}
