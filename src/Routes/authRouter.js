const { Router } = require("express");
const { check } = require("express-validator");
const { googleSignin } = require("../controllers/authController");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/google",
  [check("id_token", "id_token is required").not().isEmpty(), validateFields],
  googleSignin
);

module.exports = router;
