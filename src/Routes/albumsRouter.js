const express = require("express");
const albumController = require("./../Controllers/albumsController");

const router = express.Router();

router.get("/album/:id", albumController.showAlbums);
router.post("/album", albumController.createAlbum);
//router.post("/employees/:name", employeeController.getEmployeeByName);
router.put("/album-update/:id", albumController.updateAlbum);
router.delete("/album-delete/:id", albumController.deleteAlbum);

module.exports = router;
