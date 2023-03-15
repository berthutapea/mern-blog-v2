const CustomError = require("../error/CustomError")

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({

    destination : function(req,file,cb ){
        const rootDir = path.dirname(require.main.filename) 
        
        if(file.fieldname === "photo"){
            cb(null , path.join( rootDir,"/public/userPhotos"))
        }
        else {
            cb(null , path.join( rootDir,"/public/storyImages"))
        }

    } ,

    filename :function(req,file,cb ) {

       
        if(file.fieldname ==="photo"){
            const extentions =file.mimetype.split("/")[1]
           
            req.savedUserPhoto ="photo_user_" +req.user.id + "."+ extentions

            cb(null ,req.savedUserPhoto)
        }

        else {
            req.savedStoryImage ="image_" +new Date().toISOString().replace(/:/g, '-') + file.originalname 

            cb(null ,req.savedStoryImage)
        }

    }

})


const fileFilter =(req,file,cb ) => {

    allowedMimeTypes = ["image/jpeg","image/jpg","image/png","image/gif"]

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return (new CustomError("Please provide a valid image file ",400),null )
    }
    
    cb(null , true ) ;
    
}

const imageUpload = multer({storage ,fileFilter  })


module.exports = imageUpload ; 
