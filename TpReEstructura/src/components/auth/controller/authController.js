const authService = require("../services/authSevice");
class Auth {
  async loginView(req, res, next) {res.render("login", {});}
  async registerView(req, res, next) {res.render("register", {});}
  async recoveryView(req, res, next) {res.render("recovery", {});}
  async dashboardView(req, res, next) {res.render("dashboard", {user :req.session.user});}

 
  async login(req, res, next) {
    let { email, password } = req.body;
    
    const response = await authService.login(email, password)
    
    if(response.status != 200) return res.status(response.status).json(response)
    let urlRender
    urlRender = 'login'
    if(response.response){
      req.session.user = {
        nombre: response.response.nombre,
        apellido: response.response.apellido,
        email: response.response.email,
        role: response.response.role
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
  async recovery(req,res,next){
    let {email,password} = req.body
    let response = await authService.recovery(email, password)
    if(response.response){
      req.session.user = {
        nombre: response.response.nombre,
        apellido: response.response.apellido,
        email: response.response.email,
        role: response.response.role
      }
      return res.redirect('/auth/dashboard')
    }
    res.redirect('/auth/recovery')
  }

  async delete(req, res, next) {
    let { id } = req.params;
    let response = await authService.delete(id);
    res.json(response);
  }
}

module.exports = new Auth();
