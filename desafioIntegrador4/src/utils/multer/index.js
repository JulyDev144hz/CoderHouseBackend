const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const fileType = file.filename;
        cb(null, `uploads/${fileType}/${req.user._id}`)
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    },
})

const upload = multer({storage:storage,limits:{files:5}})

module.exports = upload