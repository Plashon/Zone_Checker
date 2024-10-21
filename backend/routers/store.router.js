const express = require("express")
const router = express.Router();
const storeController = require("../controllers/store.controller")
const {authJwt} = require("../middlewares")



// get store
router.get("/",storeController.getAllStore)
router.get("/:id",storeController.getByStoreId)
//create 
router.post("/",[authJwt.verifyToken],storeController.createStore)
//update store by id
router.put("/:id",[authJwt.verifyToken,authJwt.isStoreAdmin],storeController.updateStoreById)
//delete Store by id
router.delete("/:id",[authJwt.verifyToken,authJwt.isStoreAdmin],storeController.deleteStoreById)


module.exports = router;