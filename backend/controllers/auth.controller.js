const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// หลักการ one way encryption คือ นำ encrypt ของสิ่งที่กรอกมาเทียบกัน

// Resgister a new user
exports.register = async (req, res) => {
  const { userName, email, password, lat, lng } = req.body;
  if (!userName || !email || !password || !lat || !lng) {
    res.status(400).send({
      message: "Please provide all required fields!",
    });
    return;
  }
  //   Prepare user data
  const newUser = {
    userName: userName,
    email: email,
    password: bcrypt.hashSync(password, 5),
    lat: lat,
    lng: lng,
  };
  //   Save user in the DB
  await User.create(newUser)
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({ where: { roleName: { [Op.or]: req.body.roles } } }).then(
          (roles) => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          }
        );
      } else {
        // Set default role to user
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while registering a new user!",
      });
    });
};

// Sign in User
exports.login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).send({ message: "Please provide all required fields!" });
    return;
  }
  await User.findOne({ where: { userName: userName } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        // http code 401 = unAutherized
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }
      // expiresIn 86400 = 1d
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      const authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLES_" + roles[i].roleName.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          userName: user.userName,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurพed while registering a new user!",
      });
    });
};

exports.updateUserToAdmin = async (req) => {
  const userId = req.userId; // Extract userId from token

  try {
    // Find user by ID
    const user = await db.User.findByPk(userId);
    if (!user) {
      console.log(`User with id=${userId} not found.`);
      return;
    }
    // Find the "admin" role
    const adminRole = await db.Role.findOne({ where: { roleName: "admin" } });
    if (!adminRole) {
      console.log("Admin role not found.");
      return;
    }
    // Assign the "admin" role to the user
    await user.addRole(adminRole);
    console.log(`User with id=${userId} is now an admin.`);
  } catch (error) {
    console.log("Error updating user to admin:", error.message);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // เรียกดูผู้ใช้ทั้งหมดจากฐานข้อมูล
    res.status(200).send(users); // ส่งข้อมูลผู้ใช้กลับ
  } catch (error) {
    // จัดการกับข้อผิดพลาดที่เกิดขึ้น
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users.",
    });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id; // ดึง userId จาก URL parameter
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({
        message: "Not found User with ID: " + userId,
      });
    }
    const roles = await user.getRoles();
    // Extract role names
    const roleNames = roles.map(
      (role) => "ROLES_" + role.roleName.toUpperCase()
    );
    // ส่งข้อมูลผู้ใช้พร้อมกับ roles และ token ที่ได้จาก middleware
    res.send({
      id: user.id,
      userName: user.userName,
      email: user.email,
      roles: roleNames, // Return the list of role names
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something error occurred while getting user",
    });
  }
};
