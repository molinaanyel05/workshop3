const express = require("express");
const photoController = require("./../Controllers/photosController");

const router = express.Router();

//router.get("/employees", employeeController.getAllEmployees);
router.post("/create-photo", photoController.createPhoto);
//router.post("/employees/:name", photoController.getEmployeeByName);
router.put("/photos/:id", photoController.updatePhoto);
router.delete("/photo-delete/:id", photoController.deletePhoto);

module.exports = router;
