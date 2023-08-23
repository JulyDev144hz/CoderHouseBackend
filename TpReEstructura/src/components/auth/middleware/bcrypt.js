const bcrypt = require('bcrypt')
function isValidPassword(password, user){
    return bcrypt.compareSync(password, user.password)
}
function createHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
module.exports = {
    isValidPassword, createHash
}