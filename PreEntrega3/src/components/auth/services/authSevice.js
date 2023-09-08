const userModel = require("../../../dao/mongo/user");
const { createHash, isValidPassword } = require("../middleware/bcrypt");
const passport = require('passport')
const local = require('passport-local')

class Auth {
  async login(email, password) {
    try {
      const resp = await userModel.findOne({ email: email });
      

      if (!resp)
        return { status: 401, response: "El usuario no existe en la DB!" };
      if (!isValidPassword(password, resp))
        return { status: 403, response: "La password no es valida" };
      return { status: 200, response: resp };
    } catch (error) {
      console.log(error);
    }
  }
  async recovery(email, password) {
    try {
      let resp = await userModel.findOne({ email: email });

      password = createHash(password);

      await userModel.updateOne({_id: resp._id}, { password: password });
      return { status: 200, response: resp };
    } catch (error) {
      console.log(error);
    }
  }

  async register(user) {

    try {
      user.password = createHash(user.password);

      const resp = userModel.create(user);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Auth();
