const userModel = require("../../../dao/mongo/user");
const { createHash, isValidPassword } = require("../middleware/bcrypt");
const passport = require("passport");
const local = require("passport-local");
const PasswordResetModel = require("../../../dao/mongo/passwordReset");
const { generateJWT, verify, decode} = require("../../../utils/JWT/jwt");
const { config } = require("../../../config/index");
const MailManager = require("../../../utils/mailManager");

class Auth {
  async login(email, password) {
    try {
      const resp = await userModel.findOne({ email: email });

      if (!resp)
        return { status: 401, response: "El usuario no existe en la DB!" };
      if (!isValidPassword(password, resp))
        return { status: 403, response: "La password no es valida" };
        await userModel.findOneAndUpdate({"email":email}, {"last_connection":Date.now()})
      return { status: 200, response: resp };
    } catch (error) {
      console.log(error);
    }
  }
  async logout(email){
    try {
      const resp = await userModel.findOneAndUpdate({"email":email}, {"last_connection":Date.now()})
      return resp
    } catch (error) {
      console.log(error)
      return error
    }
  }
  async resetpassword(token) {
    if(!await verify(token)) throw new Error("Token no valido")
    let payload = await decode(token);
    let passwordResetInfo = await PasswordResetModel.findById(payload.id)
    if (!passwordResetInfo || passwordResetInfo?.expires < new Date()) throw new Error('El enlace ya caduco')

    return {status:true, email: passwordResetInfo.email}

  }
  async setpassword(token, newPassword) {
    try {
      let resetInfo = await this.resetpassword(token)
      const user = await userModel.findOne({email:resetInfo.email})
      if (await isValidPassword(newPassword,user)) return "No puedes colocar la misma password"
      await userModel.findByIdAndUpdate(user._id,{password:createHash(newPassword)},{new:true})
      return {mesasage:"Se ha actualizado tu password con exito"}

    } catch (error) {
      throw new Error(error.message)
    }

  }

  async recovery(email) {
    try {
      const user = await userModel.findOne({ "email": email });
      if (!user) throw new Error("El email no existe.");

      const expires = new Date();
      expires.setHours(expires.getHours() + 1);

      const passwordResetInsertedawait = await PasswordResetModel.create({
        email: user.email,
        expires: expires,
        createdAt: expires,
      });
      const token = await generateJWT({ id: passwordResetInsertedawait._id });

      const htmlResetEmail = `
      <h1>Hola ${user.nombre}</h1>
      <p>
        Haz click para reestablecer la password <a href="${config.dns_frontend}/auth/resetpassword?token=${token}">ENLACE</a>
      </p>
    `;

      await MailManager.sendEmail({
        from: config.nodemailer_user,
        to: user.email,
        subject: "Reestablecer Password",
        html: htmlResetEmail,
      });
      return { code: 200, message: "Te hemos enviado un correo" };
    } catch (error) {
      console.log(error)
      return {"error":"Error al buscar usuario con ese mail"}
    }
  }

  // async recovery(email, password) {
  //   try {
  //     let resp = await userModel.findOne({ email: email });

  //     password = createHash(password);

  //     await userModel.updateOne({_id: resp._id}, { password: password });
  //     return { status: 200, response: resp };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
