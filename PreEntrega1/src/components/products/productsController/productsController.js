const {ProductManager} = require('../ProductManager.js')
const path = require('path')
const PM = new ProductManager(path.join(__dirname, '../users.json'));

class Products{
    get(req,res){
        let products = PM.getProducts();
        let limit = parseInt(req.query.limit)
        products = limit ? products.slice(0,limit) : products
        res.json(products)
    }
    post(req,res){
        res.send('Todo OK desde post Users')
    }
}


module.exports = new Products()