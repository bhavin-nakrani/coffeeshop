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

  await orderRecords.forEach(async (obj) => {
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

  return res.send({ message: "Success" });

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

exports.notify = async (req, res) => {
  console.log("Notifying to Customer");

  var condition = { StatusId: 1 };
  let CustomerOrderData = await CustomerOrder.findOne({ where: condition })
    .then(data => {
      return data;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while sending notification."
      });
    });

  //console.log(util.inspect(CustomerOrderData));

  if (!isEmpty(CustomerOrderData)) {
    let customerId = CustomerOrderData.CustomerId;

    console.log("Customer ID ====" + customerId);

    const CustomerObj = await Customer.findOne({ where: { id: customerId } }).then(obj => { return obj; });
    const orderData = {
      StatusId: 2,
    };
    console.log("Find Query = " + CustomerObj.email_address);

    const CustomerOrderObj = await CustomerOrder.update(orderData, { where: { id: CustomerOrderData.id } });

    // Here we can add Email, SNS or other third party email sending service.
    console.log("Send Email to: " + CustomerObj.email_address);
  }

};


function isEmpty(object) {
  return Object.keys(object).length === 0
}