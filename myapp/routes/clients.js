var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var redis = require('redis');
var redisClient = require('../db');
var cliConst=require('../public/javascripts/varClient');
var resConst=require('../public/javascripts/response');

var urlencodedParser = bodyParser.urlencoded({extended:false});
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(redisClient.connection_id);
  res.write('todos los clientes');
  res.send();
});

/* get por id
curl localhost:3000/clients/2 -i
*/
router.get('/:clientId', async function(req, res, next) {
 // redisClient.insertClient(cli);
 var cli = await redisClient.getClient(req.params['clientId']);
 res.write(resConst(200,cli));
 res.send();
});

/*post
curl -d "name=Pablo Moron1" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/clients -i
*/
router.post('/',urlencodedParser,async function(req, res){
  try {
  var name = req.body.name;
  var cli  = cliConst(null,name);//2,
  var newid = await redisClient.insertClient(cli);
  res.write(resConst(201,"Cliente creado correctamente, id: "+newid));
} catch (error) {
  res.write(resConst(500,"Error code 1 (mensaje implementado por cliente)"))
}
res.send();
});

/*delete
curl -X "DELETE" http://localhost:3000/clients/1 -i
*/
router.delete('/:clientId',async function(req,res){
var id = req.params['clientId'];
try{
var deleted = await redisClient.deleteClient(id);
typeof(deleted)=="number"
?
res.write(resConst(200,"Cliente eliminado: "+deleted))
:
res.write(resConst(200,deleted));
;
} catch(e){
  console.log(e);
  res.write(resConst(500,"ERROR ##"));
}
res.send();
});
module.exports = router;
