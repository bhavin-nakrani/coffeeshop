const db = require("../models");
const util = require('util');
const CustomerOrder = db.CustomerOrder;
const CustomerOrderItem = db.CustomerOrderItem;
const Op = db.Sequelize.Op;
const Status = db.Status;
const Customer = db.Customer;

// Create and Save a new customerOrder
exports.create = async (req, res) => {
    
    let totalPrice = 0;
    let CustomerId = null;
    
    const orderRecords = JSON.parse(JSON.stringify(req.body));
    await orderRecords.forEach(obj => {
        totalPrice += obj['price'];
        CustomerId = obj['CustomerId'];
    });
    
    // Validate request
    if (CustomerId == null) {
      res.status(400).send({
        message: "Customer Id can not be empty!"
      });
      return;
    }
   
    // Get default status or related status object
    const statusId = (req.body.StatusId) ? req.body.StatusId : 1;
    //const StatusObj = await Status.findOne({where: {id: statusId}});

    // Create a customerOrder
    const customerOrder = {
        total_price: totalPrice,
        CustomerId: CustomerId,
        StatusId: statusId, // By default its Pending
    };
  
    // Save CustomerOrder in the database
    const OrderObj = await CustomerOrder.create(customerOrder)
      .then(data => {
        return data;
        //res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the CustomerOrder."
        });
      });

      await orderRecords.forEach( async (obj) => {
        let orderItem = {};
        console.log(util.inspect(obj));
        const itemPrice = obj['price'];
        const productId = obj['ProductId'];

        orderItem = {
            total_price: itemPrice,
            ProductId: productId,
            CustomerOrderId: OrderObj.id
        }
        
        await CustomerOrderItem.create(orderItem)
            .then(data => {
                return data;
            })
            .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the CustomerOrder Item."
                });
              });
        });

        return res.send({message: "Success"});
      
  };
  
  // Retrieve all CustomerOrders from the database.
  exports.findAll = (req, res) => {
    const CustomerId = req.query.CustomerId;
    var condition = CustomerId ? { CustomerId: CustomerId } : null;
  
    CustomerOrder.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving CustomerOrders."
        });
      });
  };