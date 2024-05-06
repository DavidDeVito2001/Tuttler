const mongoose = require("mongoose");

const ComentarioSchema = new mongoose.Schema({
  usuario: String,
  comentario: String,
  fecha: Date
})

const GradeSchema = new mongoose.Schema({
  score: Number,
  fecha: Date
})


const lugarSchema = new mongoose.Schema(
  {
    long: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    
    id: Number,
    nombre: String,
    categoria: String,
    cocina: String,
    ambientacion: String,
    telefono: String,
    mail: String,
    horario: String,
    calle_nombre:String,
    calle_altura: String,
    calle_cruce: String,
    barrio: String,
    comuna: String,
    codigo_postal: String,
    codigo_postal_argentino: String,
    comentarios: [ComentarioSchema],
    puntaje: [GradeSchema]
  },
  {
    timestamps: true,
  }
);

const Lugar = mongoose.model("Lugar", lugarSchema);
module.exports = Lugar;
