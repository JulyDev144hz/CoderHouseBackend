const {Router} = require('express')
const cartController = require('./cartsController/cartsController')
module.exports = (app) =>{
    let router = new Router()
    app.use('/api/carts', router)
    router.get('/',cartController.get)
    router.post('/',cartController.post)
    router.get('/:cid',cartController.getId)
    router.post('/:cid/product/:pid',cartController.postProductId)
}
