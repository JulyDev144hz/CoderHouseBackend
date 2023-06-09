const express = require('express')
const PORT = 8080
const routes = require('./routes')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,res ,cb) =>{
        cb(null, 'uploads/')
    },
    filename :(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
class Server{
    constructor(){
        this.app = express()
        this.settings()
        this.routes()
    }

    settings(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.upload = multer({
            storage
        })
    }

    
    routes(){
        routes(this.app, this.upload);
    }

    listen(){
        this.app.listen(PORT, ()=>{
            console.log(`http://localhost:${PORT}`)
        })
    }
}

module.exports = new Server();