const {Router} = require('express')
const productsController = require('./productsController/productsController')
module.exports = app =>{
    let router = new Router()
    app.use('/api/products', router)
    router.get('/',productsController.get)
    router.post('/',productsController.post)
}
