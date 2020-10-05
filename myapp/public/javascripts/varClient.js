var dbMethods = require ('./dbMethods');
function createClient(id, name, contracts){
    var cliente={
        id:id,
        name:name,
        contracts:contracts,
    };
    return cliente;
};

async function saveClient (adapter){
    var key = 'client';
    return await dbMethods.save(adapter,key,this);
}

async function removeClient(){
    //...
    return await dbMethods.remove();
}

async function getClient(){
    //...
    return await dbMethods.get();
}

module.exports={createClient, saveClient, removeClient, getClient};