const RedisAdapter = require('../adapters/dbRedis.js')

export default class Client {
    id;
    name;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async save() {
        try {
            return RedisAdapter.insert('Client', this);
        } catch (Exception) {
            throw Exception
        }
    }

    static async remove(id) {
        try {
            let key = 'Client' + id;
            return await RedisAdapter.remove(key);
        } catch (Exception) {
            throw Exception
        }
    }

    static async find(id) {
        try {
            let key = 'Client' + id
            let cl = await RedisAdapter.find(key);
            cl = JSON.parse(cl);
            return cl;
        } catch (Exception) {
            throw Exception
        }
    }

    async update() {
        try{
           return await RedisAdapter.update('Client', this);
        }catch(Exception){
            throw Exception;
        }
    }
    static async listAll(){
        try{
            let list =await RedisAdapter.getall('Client');
            console.log("CLientes"+JSON.stringify(list))
            return list
        }catch(Exception){
            throw Exception;
        }
    }
}
