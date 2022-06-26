const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, "public/upload/admin");
  },
  filename: (req, file, next) => {
    next(null, "image_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", AdminController.Index);
router.get("/show/:id", AdminController.Show);
router.post("/create", AdminController.AddNewAdmin);
router.put("/update/:id", AdminController.UpdateAccount);
// router.post("/password-changes/:id", AdminController.UpdatePassword);


module.exports = router;