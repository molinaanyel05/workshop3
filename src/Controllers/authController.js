const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

exports.googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    res.json({
      usuario,
      token,
    });
    // let usuario = await Usuario.findOne({ correo });

    // if (!usuario) {
    //   // Tengo que crearlo
    //   const data = {
    //     nombre,
    //     correo,
    //     password: ":P",
    //     img,
    //     google: true,
    //   };

    //   usuario = new Usuario(data);
    //   await usuario.save();
    // }

    // // Si el usuario en DB
    // if (!usuario.estado) {
    //   return res.status(401).json({
    //     msg: "Hable con el administrador, usuario bloqueado",
    //   });
    // }

    // // Generar el JWT
    // const token = await generarJWT(usuario.id);

    // res.json({
    //   usuario,
    //   token,
    // });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};
