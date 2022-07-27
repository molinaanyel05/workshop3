const express = require("express");
const photoController = require("./../Controllers/photosController");

const router = express.Router();

//router.get("/employees", employeeController.getAllEmployees);
router.post("/photo", photoController.createPhoto);
//router.post("/employees/:name", photoController.getEmployeeByName);
router.put("/photos-update/:id", photoController.updatePhoto);
router.delete("/photos-delete/:id", photoController.deletePhoto);

module.exports = router;
