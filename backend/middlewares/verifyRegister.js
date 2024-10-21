const User = require("../models/user.model")

//check userName or email is duplicated?

checkDuplicatedUserOrEmail = async (req, res, next) => {
    await User.findOne({ where: { userName: req.body.userName } }).then(
      (user) => {
        if (user) {
          return res.status(400).send({ message: "Username already exists!" });
        }
        User.findOne({ where: { email: req.body.email } }).then((user) => {
          if (user) {
            return res.status(400).send({ message: "Email already used!" });
          }
          next();
        });
      }
    );
  };
  
  const verifyRegister = {
    checkDuplicatedUserOrEmail,
  };
  
  module.exports = verifyRegister;