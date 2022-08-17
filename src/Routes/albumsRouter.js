const express = require("express");
const { check } = require("express-validator");
const {validateFields} = require("../middlewares/validate-fields");
const albumController = require("./../Controllers/albumsController");

const router = express.Router();

router.post("/album", 
[
    check("name").not().isEmpty().withMessage("Name is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    validateFields
],
 albumController.createAlbum
);

router.get("/albums/:user", 
[
    check("user").not().isEmpty().withMessage("user is required"),
], 
albumController.showAlbums);

router.get("/album/:id", albumController.getAlbumById);

router.get("/album/:user/:title", 
[
    check("user").not().isEmpty().withMessage("user is required"),
    check("title").not().isEmpty().withMessage("title is required"),
], albumController.getAlbumByName);

router.put("/album/:id", albumController.updateAlbum);
router.delete("/album/:id", albumController.deleteAlbum);

module.exports = router;
