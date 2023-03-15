const bycrpt = require("bcryptjs")

const validateUserInput =(email,password) =>{

    return(
        email && password
    )

}

const comparePassword =  (password , hashedPassword) =>{

    return  bycrpt.compareSync(password,hashedPassword)

}

module.exports ={
    validateUserInput,
    comparePassword
}