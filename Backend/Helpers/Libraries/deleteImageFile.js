const path = require("path")
const fs = require("fs")

const deleteImageFile =(req ,deleteImage) => {

    const rootDir = path.dirname(require.main.filename) 

    filePath = path.join( rootDir,`/public/storyImages/${deleteImage}`)
    
    fs.unlink(filePath, (res) => console.log(res,"file delete "));
    
}


module.exports = deleteImageFile