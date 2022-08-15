const { Router } = require("express");
const { check } = require("express-validator");
const {
  googleSignin,
  authenticatedUser,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("/auth", auth, authenticatedUser);
router.post(
  "/auth/google",
  [check("id_token", "id_token is required").not().isEmpty(), validateFields],
  googleSignin
);

module.exports = router;
