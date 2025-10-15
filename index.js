import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Experiencia from "./models/experience.js"; // 👈 ruta corregida

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta base
app.get("/", (req, res) => {
  res.send("API de experiencias profesionales activa 🚀");
});

// --- CRUD ---

// CREATE
app.post("/experiencias", async (req, res) => {
  try {
    const nuevaExp = new Experiencia(req.body);
    await nuevaExp.save();
    res.status(201).json(nuevaExp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
app.get("/experiencias", async (req, res) => {
  try {
    const experiencias = await Experiencia.find();
    res.json(experiencias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/experiencias/:id", async (req, res) => {
  try {
    const actualizada = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/experiencias/:id", async (req, res) => {
  try {
    await Experiencia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Experiencia eliminada con éxito" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Conexión a MongoDB ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(port, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));
