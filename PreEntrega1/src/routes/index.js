const apiProducts = require('../components/products')

module.exports = app =>{
    apiProducts(app)
    app.get('/', (req,res)=>{
        res.send("OK")
    })
}