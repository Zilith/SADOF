const express = require('express');
const tf = require('@tensorflow/tfjs-node');  // Para usar TensorFlow en Node.js
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Cargar el modelo previamente guardado (asegúrate de proporcionar la ruta correcta)
let model;
async function loadModel() {
  model = await tf.loadLayersModel('../model/modelo_entrenado.keras');
  console.log('Modelo cargado correctamente.');
}

loadModel();

// Ruta para realizar predicciones
app.post('/predict', async (req, res) => {
  const inputData = req.body;  // Los datos de entrada enviados desde el frontend

  // Preprocesar los datos antes de pasarlos al modelo (si es necesario)
  const inputTensor = tf.tensor(inputData);  // Convierte los datos en un tensor

  try {
    // Realizar la predicción
    const prediction = await model.predict(inputTensor).array();
    
    // Devuelve la predicción al frontend
    res.json({ prediction });
  } catch (error) {
    res.status(500).send('Error en la predicción');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});