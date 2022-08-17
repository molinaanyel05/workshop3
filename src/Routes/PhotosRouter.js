const express = require("express");

const auth = require("../middlewares/auth");
const { validateFields } = require("../middlewares/validate-fields");
const photoController = require("./../Controllers/photosController");
const { check } = require("express-validator");
const router = express.Router();

router.get("/photo", auth, photoController.getPhotoByAlbumUser);
router.get("/photo/:id", auth, photoController.getPhotoByID);
router.post(
  "/photo",
  auth,
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    check("photo")
      .not()
      .isEmpty()
      .withMessage("URL is required")
      .isURL()
      .withMessage("Photo URL is not valid"),
    validateFields,
  ],
  photoController.createPhoto
);
//router.post("/employees/:name", photoController.getEmployeeByName);
router.put(
  "/photo/:id",
  auth,
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    check("photo")
      .not()
      .isEmpty()
      .withMessage("URL is required")
      .isURL()
      .withMessage("Photo URL is not valid"),
    validateFields,
  ],
  photoController.updatePhoto
);
router.delete("/photo/:id", auth, photoController.deletePhoto);

module.exports = router;
