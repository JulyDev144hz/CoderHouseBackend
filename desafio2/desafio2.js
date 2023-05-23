const fs = require("fs")

class Product{
    static countIds = 0
    constructor(title,description,price,thumbnail,code,stock){
        this.id = ++this.constructor.countIds

        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}
class ProductManager{
    constructor(){
        this.path = "./users.json"

        if (!fs.existsSync(this.path)){
            fs.writeFileSync(this.path,JSON.stringify({users : []}))
        }
    }

    addProduct(title,description,price,thumbnail,code,stock){
        let p = new Product(title,description,price,thumbnail,code,stock)
        let users = JSON.parse(fs.readFileSync(this.path)).users
        
        fs.writeFileSync(this.path, JSON.stringify({users: [...users, p]}))
    }
}

let PM = new ProductManager()

// PM.addProduct("jose", "josesito",2,"No tiene imagen", "a7e5f", 2)
PM.addProduct("jose2", "josesito",2,"No tiene imagen", "a7e5f", 2)

