const CustomError = require("../../Helpers/error/CustomError")

const customErrorHandler = (err,req,res,next)=> {
   
    if (err.code == 11000) {
        err = new CustomError("Duplicate Field Value Enter " , 404)
    }

    if (err.name === 'SyntaxError') {

        err = new CustomError('Unexpected Sytax ', 400)
    }
    if (err.name === 'ValidationError') {

        err = new CustomError(err.message, 400)
    }

    if (err.name === "CastError") {

        err = new CustomError("Please provide a valid id  ", 400)
    }
    if (err.name === "TokenExpiredError") {

        err = new CustomError("Jwt expired  ", 401)
    }
    if (err.name === "JsonWebTokenError") {
        err = new CustomError("Jwt malformed  ", 401)

    }

    console.log("Custom Error Handler => ", err.name, err.message, err.statusCode)
  
    return res.status(err.statusCode||500)
    .json({
        success: false  ,
        error : err.message || "Server Error"
    })

}


module.exports = customErrorHandler
