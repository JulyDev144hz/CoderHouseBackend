const apiProducts = require('../components/products')
const apiCarts = require('../components/carts')
module.exports = (app, upload) =>{
    apiProducts(app, upload)
    apiCarts(app)
    app.get('/', (req,res)=>{
        res.send("OK")
    })
}