import express from "express"
import { ProductManager, Product } from "./ProductManager.js"
const PORT = 3000
const app = express()
app.use(express.urlencoded({extended:true}))

const PM = new ProductManager("./users.json");

app.get("/",(req,res)=>{
    res.send({
        message:PM.getProducts()
    })
})
app.get("/addProduct",(req,res)=>{
    let resp
    try{
        let {title, description, price, thumbnail, code, stock} = req.params
        PM.addProduct(title, description, price, thumbnail, code, stock)

        resp = {
            message:"Added"
        }
    }catch(error){
        resp = {
            message:error
        }
    }
    res.send(resp)
})


app.listen(PORT,()=>{
    console.log("listening at: http://localhost:"+PORT)
})