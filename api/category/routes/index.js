const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'public/upload/categories')
    },
    filename: (req, file, next) => {
        next(null, 'image_'+Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get("/", CategoryController.list);
router.get("/show/:id", CategoryController.show);
router.post("/create", upload.single("image"), CategoryController.create);
router.put("/update/:id", CategoryController.update);
router.delete("/remove/:id", CategoryController.remove);

module.exports = router;