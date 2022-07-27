const express = require("express");
const albumController = require("./../Controllers/albumsController");

const router = express.Router();

router.get("/albums/:id", albumController.showAlbums);
router.post("/create-album", albumController.createAlbum);
//router.post("/employees/:name", employeeController.getEmployeeByName);
router.put("/albums/:id", albumController.updateAlbum);
router.delete("/albums-delete/:id", albumController.deleteAlbum);

module.exports = router;
