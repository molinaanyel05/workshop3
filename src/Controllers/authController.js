const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const User = require("../models/userModel");

exports.googleSignin = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { email, name, picture } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: ":P",
        picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el user en DB
    if (!user.status == 2) {
      return res.status(401).json({
        msg: "Please reach out to your Administrator, your credentials has been blocked",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        id: user.id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

exports.authenticatedUser = async (req, res, next) => {
  return res.json({ user: req.user });
};
