const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const role = require("./models/role.model")
const db = require("./models")
const authRouter = require("./routers/auth.router")
const storeRouter = require("./routers/store.router")


const FRONTEND_CONNECTION = process.env.FRONTEND_CONNECTION;
const PORT = process.env.PORT;

const corsOptions = {
  origin:"https://zone-checker.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionSuccessStatus:200,
};
const stores = require("./stores");

//console.log(stores);

// Dev mode
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop & sync database!");
// });

const initRole = () => {
  role.create({ id: 1, roleName: "user" });
  role.create({ id: 2, roleName: "admin" });
};



app.use(cors(corsOptions));
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test endpoint
app.get("/", (req, res) => {
  res.send("<h1>Hello, world!!!</h1><p>This is Store Delivery API.</p>");
});

//router
app.use("/api/auth",authRouter)
app.use("/api/store",storeRouter)

// get all stores  from json file
app.get("/api/jsonstores", (req, res) => {
  res.json(stores);
});


app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
