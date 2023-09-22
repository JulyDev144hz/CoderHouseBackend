class CartDTO{
    constructor(cart){
        this.user = cart.user
        this.carts = cart.products ? cart.products : []
    }
}
module.exports = CartDTO