
import mongoose from "mongoose";

const experienciaSchema = new mongoose.Schema({
  titulo: String,
  empresa: String,
  descripcion: String,
  fechaInicio: String,
  fechaFin: String
});

const Experiencia = mongoose.model("Experiencia", experienciaSchema);

export default Experiencia;



