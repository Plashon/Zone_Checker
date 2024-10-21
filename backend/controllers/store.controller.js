const Store = require("../models/stores.model");
const authController = require("./auth.controller");
const db = require("../models");

exports.createStore = async (req, res) => {
  const { lat, lng, radius, name, address } = req.body;
  const userId = req.userId; // Extracted from the token
  const newStore = {
    lat,
    lng,
    radius,
    name,
    address,
    userId, // Use userId from token
  };
  try {
    // Create the new store
    const store = await Store.create(newStore);
    // Send the store data response
    res.send(store);
    // After store creation, update the user's role to admin
    await authController.updateUserToAdmin(req);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Can't create new store",
    });
  }
};


exports.getAllStore = async (req, res) => {
  await Store.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred while getting Store",
      });
    });
};

exports.getByStoreId = async (req, res) => {
  const id = req.params.id;
  await Store.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not Found Store with ID : " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred while getting Store",
      });
    });
};

exports.updateStoreById = async (req, res) => {
  const id = req.params.id;
  try {
    // ตรวจสอบว่ามีข้อมูลใน req.body หรือไม่
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Request body can't be empty!",
      });
    }
    // อัปเดตข้อมูลใน Store
    const [num] = await Store.update(req.body, {
      where: { id: id },
    });

    if (num === 1) {
      res.send({ message: "Store's data was updated successfully." });
    } else {
      res.status(404).send({
        message: "Can't update Store with ID: " + id + ". Maybe Store wasn't found.",
      });
    }
  } catch (error) {
    // จัดการกับข้อผิดพลาดที่เกิดขึ้น
    res.status(500).send({
      message: error.message || "Some error occurred while updating the Store.",
    });
  }
};


//delete a Stores by Id
exports.deleteStoreById = async (req, res) => {
  const id = req.params.id;
  await Store.destroy({ where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Store was delete successfully!" });
    } else {
      res.send({ message: "Can't delete Store ID : " + id + "." });
    }
  });
};
