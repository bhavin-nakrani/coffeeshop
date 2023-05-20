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

## Database

### Products

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| name  | string  |
| unit_price | decimal |
| tax_id  | foreignkey-null  |
| tax_price  | decimal  |
| total_price  | decimal  |

### Tax

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| tax_percentage  | int  |
| tax_flat_price  | decimal  |

### ProductDiscount

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| product_id  | foreignkey  |
| is_free  | bool  |
| discount_price  | decimal  |
| related_products  | string  |

### CustomerOrders

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| customer_id  | foreignkey  |
| status_id  | foreignkey  |
| total_price  | decimal  |

### CustomerOrderItems

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| customer_order_id  | foreignkey  |
| product_id  | foreignkey  |
| total_price  | decimal  |

### CustomerOrders

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| full_name  | string  |
| email_address  | string  |
| address_line_1  | string  |
| address_line_2  | string  |
| phone  | string  |
| city  | string  |
| country  | string  |

### Status

| Fields  | DataTypes |
| ------------- | ------------- |
| id  | int  |
| title  | string  |
