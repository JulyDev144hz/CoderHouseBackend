const mongoose = require("mongoose");
const { mongo } = require("./");

let connection;
(async ()=>{
  try {
    connection = await mongoose.connect(mongo.atlas);
    console.log("Conexión exitosa!");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos!");
  }
})();

module.exports = { connection };

