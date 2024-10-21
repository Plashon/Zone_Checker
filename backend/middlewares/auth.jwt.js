const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Store = db.Store;

//verify token
verifyToken= (req,res,next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send({message: "No tokens are provided"})
        return;
    }
    jwt.verify(token,config.secret,(err,decode)=>{
        if(err){
            return res.status(401).send({message:"Unauthorized!"})
        }
        req.userId = decode.id;
        next();
    })
}

// check user is admin role
isStoreAdmin = (req, res, next) => {
    // Find the user by the ID from the request (from token)
    User.findByPk(req.userId).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
  
      // Check if the user has the admin role
      user.getRoles().then((roles) => {
        let isAdmin = false;
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].roleName === "admin") {
            isAdmin = true;
            break;
          }
        }
  
        // If user is not an admin, deny access
        if (!isAdmin) {
          return res.status(401).send({ message: "Administrator role required!" });
        }
  
        // Check if the user is admin of the specific store
        const storeId = req.params.id;  // Assuming storeId is passed in the URL
        Store.findOne({ where: { id: storeId, userId: user.id } })
          .then((store) => {
            if (!store) {
              return res.status(403).send({
                message: "You are not the admin of this store!",
              });
            }
  
            // If the user is admin of the store, proceed
            next();
          })
          .catch((error) => {
            res.status(500).send({
              message: "Error while checking store admin rights",
              error: error.message,
            });
          });
      });
    });
  };
  

const authJwt = {
    verifyToken,
    isStoreAdmin,
  };
  
  module.exports = authJwt;