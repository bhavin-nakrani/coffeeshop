const db = require("../models");
const CustomerOrder = db.CustomerOrder;
const Op = db.Sequelize.Op;
const Status = db.Status;
const Customer = db.Customer;

// Create and Save a new customerOrder
exports.create = async (req, res) => {
    // Validate request
    /*if (!req.body.total_price) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }*/
    console.log(JSON.stringify(req.body));
    return false;
    // Get default status or related status object
    const statusId = (req.body.StatusId) ? req.body.StatusId : 1;
    //const StatusObj = await Status.findOne({where: {id: statusId}});

    // Prepare Customer object
    //const customerObj = await Customer.findOne({where: {id: req.body.CustomerId}});

    // Create a customerOrder
    const customerOrder = {
        total_price: req.body.total_price,
        CustomerId: req.body.CustomerId,
        StatusId: statusId, // By default its Pending
    };
  
    // Save CustomerOrder in the database
    await CustomerOrder.create(customerOrder)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the CustomerOrder."
        });
      });
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