const express = require("express");
const router = express.Router();

const AdminRoute = require("./admin/routes/index");
const UserRoute = require("./User/Route/index");
const CategoryRoute = require("./category/routes/index");
const ProductRoute = require("./product/Route/index");
const RoleRoute = require("./Role/Route/index");
const AuthRoute = require("./Auth/Route//index");

router.use("/admin", AdminRoute); 
router.use("/users", UserRoute);
router.use("/categories", CategoryRoute);
router.use("/products", ProductRoute);
router.use("/role", RoleRoute);
router.use("/login", AuthRoute);

module.exports = router;