const jwt = require("jsonwebtoken");
verifyToken = async (req, res, next) => {

    let token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send({
              auth: false,
              message: "No token provided.",
            });
          }
      jwt.verify(token,'hello',(err,auth)=>{
if(err){
    return res.status(403).send({
        auth: false,
        message: "Invalid token.",
      });
}
        req.user = auth.user;
        next();
      })
   
}

module.exports = verifyToken;