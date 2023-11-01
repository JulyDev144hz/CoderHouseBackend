function isAuth(req, res, next) {
  try {
    if (req.session?.user) {
      return next();
    }
    throw new Error("No esta autenticado!");
  } catch (error) {
    res.redirect("/auth/login");
  }
}
function isNotAuth(req, res, next) {
  try {
    if (req.session?.user) {
      return res.redirect("/auth/dashboard");
    }
    throw new Error("esta autenticado!");
  } catch (error) {
    next();
  }
}
function isAdmin(req, res, next) {
  try {
    if (req.session.user.role == "admin" || "premium") {
      return next()
    }
    throw new Error("No eres admin");
  } catch (error) {
    res.redirect("/auth/dashboard");
  }
}

function isNotAdmin(req, res, next) {
  try {
    if (req.session.user.role == "admin") {
      return res.redirect('/auth/dashboard')
    }
    throw new Error("eres admin");
  } catch (error) {
    return next()
  }
}
module.exports = {
  isAuth,
  isNotAuth,
  isAdmin,
  isNotAdmin
};
