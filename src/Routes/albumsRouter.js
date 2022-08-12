const express = require("express");
const albumController = require("./../Controllers/albumsController");

const router = express.Router();

router.post("/album", albumController.createAlbum);
router.get("/albums/:user", albumController.showAlbums);
router.get("/album/:id", albumController.getAlbumById);
//router.post("/employees/:name", employeeController.getEmployeeByName);
router.put("/album/:id", albumController.updateAlbum);
router.delete("/album/:id", albumController.deleteAlbum);

module.exports = router;
