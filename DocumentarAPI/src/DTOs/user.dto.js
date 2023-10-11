 class UserDTO{
    constructor(user){
        this.nombre = user.name
        this.apellido = user.apellido
        this.email = user.email
        this.password = user.password
        this.edad = user.edad
        this.cart = user.cart
        this.isActive = user.isActive
        this.photo = user.photo ? user.photo : `https://robohash.org/${Math.random()*1000}`
        this.role = user.role ? user.role : 'operation'
    }
}
module.exports = UserDTO