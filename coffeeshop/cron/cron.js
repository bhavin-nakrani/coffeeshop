module.exports = cron => {
    const customerOrders = require("../controllers/customerOrders.controller.js");

    cron.schedule("*/10 * * * * *", customerOrders.notify);
    // Creating a cron job which runs on every 10 second
    //cron.schedule("*/10 * * * * *", function() {
        //console.log("CRON: running a task every 10 second");
        
    //});
};