const express = require("express");
const photoController = require("./../Controllers/photosController");

const router = express.Router();

router.get("/photo", photoController.getPhotoByAlbumUser);
router.post("/photo", photoController.createPhoto);
//router.post("/employees/:name", photoController.getEmployeeByName);
router.put("/photo/:id", photoController.updatePhoto);
router.delete("/photo/:id", photoController.deletePhoto);

module.exports = router;
