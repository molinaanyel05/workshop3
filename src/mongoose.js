const mongoose = require("mongoose");
require("dotenv").config();

const Album = require("./Models/albumModel");

//usar usuario y contraseña creados y agregar el nombre de la BD despues de ".net/"
const url = process.env.MONGO_DB;

const connectdb = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB!!!");
  } catch (error) {}
};
module.exports = connectdb;
