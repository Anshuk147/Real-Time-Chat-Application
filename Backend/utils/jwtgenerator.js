const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

const jwttokenGenerator = function(user){
    const token = jwt.sign({userid:user._id},process.env.JWT_SECRET,{expiresIn:"3h"})
    return token;
}


module.exports = jwttokenGenerator;