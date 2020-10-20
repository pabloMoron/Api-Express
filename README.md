# Api-Express

- `git clone https://github.com/pabloMoron/Api-Express.git`
- `cd myapp/`
- `SET DEBUG=myapp:* & npm start`

# Docker
- `sudo docker run --name dbredis -p 6379:6379 redis`

- `docker start dbredis`
- `docker stop dbredis`

- `docker exec -ti dbredis redis-cli`

# comandos redis

- `get ClientIdCount` // Las keys son case sensitive

- `flushall` // Borra todas las keys

- `keys *` // Lista todas las keys

- `get Client1` // Obtiene el client1

- `incr ClientIdCount` // Aaumenta en 1

- `incr ClientIdCount` // Decrementa en 1

# Request
GET
- `curl localhost:3000/clients/1 -i`

POST
- `curl -d "name=Pablo Moron1" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/clients -i`

DELETE
- `curl -X "DELETE" http://localhost:3000/clients/1 -i`
