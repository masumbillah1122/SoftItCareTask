const express = require("express");
const router = express.Router();
const AuthController = require("../AuthController");

router.post("/", AuthController.login);
router.post("/", AuthController.forgotPassword);
router.get("/", AuthController.auth);
module.exports = router;
