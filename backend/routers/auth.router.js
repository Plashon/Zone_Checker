const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
const { authJwt,verifyRegister } = require("../middlewares");


//const { verifySignUp } = require("../middlewares");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
//get user
router.get("/:id",authController.getUserById)
router.get('/users', authController.getAllUsers);

// register
router.post(
  "/register",[verifyRegister.checkDuplicatedUserOrEmail],
  authController.register
);
// login
router.post("/login", authController.login);
// update to admin
router.put("/updateadmin",[authJwt.verifyToken],authController.updateUserToAdmin)

module.exports = router;
