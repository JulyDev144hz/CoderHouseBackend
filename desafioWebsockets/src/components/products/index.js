const {Router} = require('express')
const upload = require('../../utils/multer')
const productsController = require('./productsController/productsController')
module.exports = (app) =>{
    let router = new Router()
    app.use('/api/products', router)
    router.get('/',productsController.get)
    router.get('/:pid',productsController.getId)
    router.post('/', upload.array('thumbnails'),productsController.post)
    router.put('/:pid', upload.array('thumbnails'),productsController.put)
    router.delete('/:pid', productsController.delete)
}
