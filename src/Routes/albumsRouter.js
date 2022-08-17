const express = require("express");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const {validateFields} = require("../middlewares/validate-fields");
const albumController = require("./../Controllers/albumsController");
const router = express.Router();

router.post("/album",auth,
[
    check("name").not().isEmpty().withMessage("Name is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    validateFields
],
 albumController.createAlbum
);

router.get("/albums/:user", albumController.showAlbums);

router.get("/album/:id", albumController.getAlbumById);

router.get("/album/:user/:title", albumController.getAlbumByName);

router.put("/album/:id",auth,
[
    check("name").not().isEmpty().withMessage("Name is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    validateFields
],
albumController.updateAlbum);


router.delete("/album/:id",auth,albumController.deleteAlbum);

module.exports = router;
