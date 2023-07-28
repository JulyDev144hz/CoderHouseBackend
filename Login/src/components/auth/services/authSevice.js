const userModel = require("../../../models/mongo/user");
class Auth {
  async login(email, password){
    try {
      const resp = userModel.find({email : email,password : password})
      // console.log(resp)
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
