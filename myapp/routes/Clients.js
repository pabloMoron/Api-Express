let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
import Client from "../Models/Client.js";
const CODES = require('../Codes');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let clients=await Client.listAll();
  res.json({'status':CODES.STATUS_CODES.OK, 'Response':clients});
  res.send();
});

/* get por id
curl localhost:3000/clients/2 -i
*/
router.get('/:clientId', async function (req, res) {
  let cli = await Client.find(req.params['clientId']).catch((err) =>
    res.json({ status: CODES.STATUS_CODES.INTERNAL_SERVER_ERROR, Response: { 'Error': err } })
  );
  cli !== null ? res.json({ status: CODES.STATUS_CODES.OK, Response: { 'Client': cli } })
    : res.json({ status: CODES.STATUS_CODES.NO_CONTENT, Response: {} });
});

/*post
curl -d "name=Pablo Moron1" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/clients -i
*/
router.post('/', urlencodedParser, async function (req, res) {
  try {
  var name = req.body.name;
  let cli = new Client(null, name);//2,
  let newid = await cli.save();
  res.json({ status: CODES.STATUS_CODES.CREATED, Response: { "url": "/clients/" + newid } });
  } catch (error) {
   res.json({'status':CODES.STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error':error})
  }
});

/*delete
curl -X "DELETE" http://localhost:3000/clients/1 -i
*/
router.delete('/:clientId', async function (req, res) {
  try {
    let id = req.params['clientId'];
    await Client.remove(id)
    ? res.json({ 'status': CODES.STATUS_CODES.OK, 'Response': {} })
    : res.json({'status': CODES.STATUS_CODES.NO_CONTENT,'Response': {}})
  } catch (e) {
    res.json({ 'status': CODES.STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error': e });
  }
});

router.put('/', async function (req, res){
  try{
    let client = new Client(req.body.id, req.body.name);
    console.log(client)
    await client.update()
    ?res.json({'status':CODES.STATUS_CODES.OK, 'Response':'/client/'+client.id})
    :res.json({'status':CODES.STATUS_CODES.NO_CONTENT, 'Response':{}})
  }catch(e){
    res.json({'status':CODES.STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error':e})
  }
});

module.exports = router;
