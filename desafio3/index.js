// nota: siempre antes de iniciar hacer por las dudas "npm i"
// se inicia con npm run start
import express from "express"
import { ProductManager } from "./ProductManager.js"
const PORT = 8080
const app = express()
app.use(express.urlencoded({extended:true}))

const PM = new ProductManager("./users.json");

app.get("/",(req,res)=>{
    res.send({
        message:{
            endPoints: ["http://localhost:8080/products", 'http://localhost:8080/products?limit=5', 'http://localhost:8080/products/2', 'http://localhost:8080/products/34123123']
        }
    })
})


app.get("/products", async(req,res)=>{
    let resp
    let limit = parseInt(req.query.limit)
    try{
        let products = await PM.getProducts()
        products = limit ? products.slice(0,limit) : products

        resp = {
            message : products
        }

    }catch(err){
        resp = {
            message: ""+err
        }
    }
    res.send(resp)
})
app.get("/products/:pid",(req,res)=>{
    let resp
    let {pid} = req.params

    try{
        resp = {
            message: PM.getProductById(pid)    
        }
    }catch(err){
        resp = {
            message: ""+err
        }
    }
    res.send(resp)
})

// lo hice porque pense que estaba en la consigna y al final no, pero lo dejo por si lo queres ver y por si lo necesito para futuras entregas
// tambien lo podrias usar para crear productos

// app.get("/addProduct",(req,res)=>{
//     let resp
//     try{
//         // http://localhost:8080/addProduct?title=mandarina&description=es una mandarina&price=20&thumbnail=Sin imagen&code=abc432&stock=20
//         let {title, description, price, thumbnail, code, stock} = req.query

//         PM.addProduct(title, description, price, thumbnail, code, stock)

//         resp = {
//             message:"Added"
//         }
//     }catch(err){
//         resp = {
//             message: ""+err
//         }
//     }
//     res.send(resp)
// })


app.listen(PORT,()=>{
    console.log("listening at: http://localhost:"+PORT)
})