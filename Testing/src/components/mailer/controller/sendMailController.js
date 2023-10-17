const sendMailService = require("../services/sendMailService");

class SendMail {

  async sendMail(req, res, next) {
    try {
      const response = await sendMailService.sendMail(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }

  }

  async sendSMS(req, res, next) {
    try {
      const response = await sendMailService.sendSMS(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new SendMail();