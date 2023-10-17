const { Router } = require("express");
const sendMailController = require("./controller/sendMailController");
module.exports = (app) =>{
    const router = new Router();
    app.use('/mailer', router);
    router.post('/mail', sendMailController.sendMail);
    router.post('/sms', sendMailController.sendSMS);
}