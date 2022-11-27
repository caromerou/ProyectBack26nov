//Creacción base de datos (Esquema)
const mongoose = require("mongoose");  
const Schema = mongoose.Schema;  //Creación esquema para db

const EmpleadosSchema = new Schema({          //Nombre del esquema con sus parametros
    nombre:{type: String, required: true, max:60},
    apellido_p:{type: String, required: true, max:40},
    apellido_m:{type: String, required: true, max:40},
    telefono:{type: String, required: true, max:15},
    mail:{type: String, required: false, max:70},
    direccion:{type: String, required: false, max:150}
});

module.exports = mongoose.model("empleados", EmpleadosSchema);  
 