const authService = require("../services/authSevice");
class Auth {
  async loginView(req, res, next) {res.render("login", {});}
  async registerView(req, res, next) {res.render("register", {});}
  async dashboardView(req, res, next) {res.render("dashboard", {user :req.session.user});}

 
  async login(req, res, next) {
    let { email, password } = req.body;
    const existUser = await authService.login(email, password)
    let urlRender
    urlRender = 'login'
    if(existUser.length){
      req.session.user = {
        nombre: existUser[0].nombre,
        apellido: existUser[0].apellido,
        email: existUser[0].email,
        role: existUser[0].role
      }
      urlRender = 'dashboard'
    }


    res.redirect(`/auth/${urlRender}`)    
  }
  async logout(req,res,next){
    delete req.session.user
    res.redirect('/auth/login')
  }

  async register(req, res, next) {
    let { nombre, apellido, email, password, role } = req.body;
    

    const response = await authService.register({nombre, apellido, email, password, role});
    req.session.user = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      role: role
    }
    res.redirect('/auth/dashboard')
  }

  async delete(req, res, next) {
    let { id } = req.params;
    let response = await authService.delete(id);
    res.json(response);
  }
}

module.exports = new Auth();
