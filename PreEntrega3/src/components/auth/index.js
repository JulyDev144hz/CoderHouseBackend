const { Router } = require("express");
const authController = require("./controller/authController");
const { isAuth, isNotAuth } = require("./middleware");
const passport = require("passport");

module.exports = (app) => {
  const router = new Router();
  app.use("/auth", router);
  //   router.get("/session", authController.session);
  router.get("/login", isNotAuth, authController.loginView);
  router.get("/register", isNotAuth, authController.registerView);
  router.get("/recovery", isNotAuth, authController.recoveryView);
  router.get('/logout', authController.logout)

  // con passport
  router.post('/register', passport.authenticate('register',{failureRedirect:'/failregister'}),
  async (req,res)=>{
    res.redirect('/auth/dashboard')
    // res.send({status:"success", message:"User registered"})
  })
  router.get('/failregister', async(req,res)=>{
    console.log("Failed Strategy")
    res.send({error:"Failed"})
  })
  router.post('/login', passport.authenticate('login', {failureRedirect:"/faillogin"}),
  async (req,res)=>{
    if(!req.user) return res.status(400).send({status:"error", error:"Invalid credentials"})
   
    req.session.user = {
      nombre : req.user.nombre,
      apellido : req.user.apellido,
      email:req.user.email,
      role:req.user.role,
      photo:req.user.photo,
    }
    res.redirect('/auth/dashboard')

    // res.send({status:"success",payload:req.user})
  }
  )
  router.get('/faillogin',(req,res)=>{
    res.send({error:'Failed Login'})
  })

  // sin passport
  // router.post("/login", authController.login);
  // router.post("/register", authController.register);

  router.post("/recovery", authController.recovery);
  router.get("/dashboard", isAuth, authController.dashboardView);
  
  router.get('/github', passport.authenticate('github',{scope:['user:email']}), async (req,res)=>{})
  router.get('/login/github', passport.authenticate('github',{failureRedirect:'/login'}), async(req,res)=>{
    req.session.user = req.user
    res.redirect('/auth/dashboard')
  })

  app.get("/api/sessions/current", (req,res)=>{
    res.json(req.session)
  })

  //   router.get("/:id", authController.getCookies);
};
