# Coffee Shop
A day at a coffee shop!

## Run the System
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

## Rebuild image
```bash
docker-compose up --build
```

## Adminer 
```
http://localhost:8082
```
Details:
```
server: mysqldb  (Name of docker service from yml file)
username: root
password: from env file
database: coffeeshop_db
```

Project URL:
```
http://localhost:6868/
```

