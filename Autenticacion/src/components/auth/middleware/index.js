const bcrypt = require('bcrypt')
function isAuth(req,res,next){
    try {
        if(req.session?.user){
            return next();
        }
        throw new Error('No esta autenticado!')
    } catch (error) {
        res.redirect('/auth/login')
    }
}
function isNotAuth(req,res,next){
    try {
        if(req.session?.user){
            return res.redirect('/auth/dashboard')
        }
        throw new Error('esta autenticado!')
    } catch (error) {
        next();
    }
}
function isValidPassword(password, user){
    bcrypt.compareSync(password, user.password)
}
function createHash(password, user){
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports = {
    isAuth, isNotAuth, isValidPassword, createHash
}