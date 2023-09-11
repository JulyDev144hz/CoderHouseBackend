const passport = require('passport')
const local = require('passport-local')
const {userModel} = require('../../../dao/mongo/user')
const {createHash, isValidPassword} = require('./bcrypt')
const { CartService } = require('../../../repositories')

const localStrategy = local.Strategy

const initializePassport = ()=>{
    passport.use('register', new localStrategy({
        passReqToCallback:true,usernameField:'email'
    },async (req,username,password,done)=>{
        const {nombre,apellido,email, role} = req.body
        try {
            let user = await userModel.findOne({email:username})
            if(user){
                console.log('ya existe un usuario con ese mail')
                return done(null,false)
            }
            const newUser = {
                nombre:nombre,
                apellido:apellido,
                email:email,
                role:role,
                password:createHash(password)
            }
            let result = await userModel.create(newUser)
            return done(null,result)
        } catch (error) {
            return done('Error: '+error)
        }
    }))

    passport.use('login', new localStrategy({
        usernameField:'email'
    }, async (username,password,done)=>{

        

        try {
            const user = await userModel.findOne({email:username})
            if(!user){
                console.log("User no existe")
                return done(null,false)
            }
            if(!isValidPassword(password,user)) return done(null,false)

            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))
}

module.exports = initializePassport;