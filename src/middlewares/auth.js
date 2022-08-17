const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
require("dotenv").config({ path: ".env" });
module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    //Get token

    const token = authHeader.split(" ")[1];
    try {
      //Validate JWT
      const user = jwt.verify(token, process.env.SECRETPRIVATEKEY);

      let userInfo = await User.findById(mongoose.Types.ObjectId(user.uid));
      req.user = {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        status: userInfo.status,
        id: userInfo.id,
      };
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Invalid Token" });
    }
  }
  next();
};
