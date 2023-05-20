module.exports = app => {
    const customerOrders = require("../controllers/customerOrders.controller.js");
  
    var router = require("express").Router();
  
    // Create a new CustomerOrder
    router.post("/", customerOrders.create);
  
    // Retrieve all CustomerOrders
    router.get("/", customerOrders.findAll);
  
  
    app.use('/api/customerOrders', router);
  };