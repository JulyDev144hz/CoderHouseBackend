const userModel = require("../../../models/mongo/user");
const { createHash, isValidPassword } = require('../middleware')
class Auth {
  async login(email, password){
    try {
      const resp = userModel.find({email : email})
      console.log(resp)
      return resp
      
    } catch (error) {
      console.log(error)
    }
  }

  async register(user){
    try {
      const resp = userModel.create(user)
      return resp
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = new Auth();
