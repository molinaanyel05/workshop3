const mongoose = require("mongoose");


const Album = require("./Models/albumModel");

//usar usuario y contraseña creados y agregar el nombre de la BD despues de ".net/"
const url ="mongodb+srv://user:haD3MC6290UQBDhz@cluster0.0oslmrk.mongodb.net/proyecto2";

const connectdb = async()=>{
  try {
    await mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  

  console.log("Connected to DB!!!");
  } catch (error) {
    
  }
}
module.exports= connectdb;

