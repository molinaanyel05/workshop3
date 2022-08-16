const express = require("express");
const auth = require("../middlewares/auth");
const photoController = require("./../Controllers/photosController");

const router = express.Router();

router.get("/photo", photoController.getPhotoByAlbumUser);
router.get("/photo", auth, photoController.getPhotoByID);
router.post("/photo", auth, photoController.createPhoto);
//router.post("/employees/:name", photoController.getEmployeeByName);
router.put("/photo/:id", photoController.updatePhoto);
router.delete("/photo/:id", auth, photoController.deletePhoto);

module.exports = router;
