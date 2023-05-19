# Coffee Shop
A day at a coffee shop!

## Run the System
We can easily run the whole with only a single command:
```
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```
docker-compose up -d

docker-compose -f docker-compose.yml up -d --build --force-recreate
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```
docker-compose down
```

## Rebuild image
```
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

## Project URL:
```
http://localhost:6868/
```

