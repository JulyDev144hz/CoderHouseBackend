const MailManager = require("../../../utils/mailManager");
const SmsManager = require("../../../utils/smsManager");
class SendMail {
  async sendMail(payload) {
    return await MailManager.sendEmail(payload)
  }

  async sendSMS(payload) {
    return await SmsManager.sendSMS(payload);
  }
}

module.exports = new SendMail();