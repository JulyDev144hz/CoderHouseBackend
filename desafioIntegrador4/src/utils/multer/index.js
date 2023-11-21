const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let fileType = file.fieldname;
        const destinationPath = `uploads/${fileType}/${req.user._id}`
        if (!fs.existsSync(destinationPath)){
            fs.mkdirSync(destinationPath,{recursive:true})
        }
        cb(null, destinationPath)
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    },
})

const upload = multer({storage:storage,limits:{files:5}})

module.exports = upload