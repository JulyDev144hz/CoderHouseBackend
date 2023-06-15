const apiProducts = require('../components/products')
const apiCarts = require('../components/carts')

const axios = require('axios').default
module.exports = (app) =>{
    apiProducts(app)
    apiCarts(app)
    app.get('/',async (req,res)=>{
        res.render("home",{'title':'Home'})
    })
    app.get('/realtimeproducts', (req,res)=>{
        res.render("realtimeproducts",{'title':'RealTime'})
    })
}