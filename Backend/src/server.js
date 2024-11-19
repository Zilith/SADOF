const path = require('path');
const express = require("express");
const tf = require("@tensorflow/tfjs-node"); // Para usar TensorFlow en Node.js
const bodyParser = require("body-parser");

const modelPath = path.resolve(__dirname, '../model/modelo_tfjs/model.json');
const app = express();
const port = process.env.PORT || 4000;

// Middleware para parsear JSON
app.use(bodyParser.json());

let model;
async function loadModel() {
  model = await tf.loadLayersModel(`file://${modelPath}`);
  console.log("Modelo cargado correctamente.");
}

loadModel();

// Función para limpiar y procesar los datos
function preprocessData(data) {
  // copy the original dataset
  let df_clean = JSON.parse(JSON.stringify(data));

  // Filter binary columns
  const binaryColumns = Object.keys(df_clean[0]).filter((col) => {
    const uniqueValues = new Set(df_clean.map((row) => row[col]));
    return uniqueValues.size === 2 && col !== "FraudFound_P";
  });

  // Transform binary columns
  binaryColumns.forEach((col) => {
    const uniqueValues = [...new Set(df_clean.map((row) => row[col]))];
    df_clean.forEach((row) => {
      row[col] = uniqueValues.indexOf(row[col]);
    });
  });

  // Codificar 'BasePolicy'
  const basePolicyValues = [
    ...new Set(df_clean.map((row) => row["BasePolicy"])),
  ];
  df_clean.forEach((row) => {
    row["BasePolicy"] = basePolicyValues.indexOf(row["BasePolicy"]);
  });

  // Eliminar columnas innecesarias
  const uselessColumns = [
    "Month",
    "WeekOfMonth",
    "DayOfWeek",
    "DayOfWeekClaimed",
    "WeekOfMonthClaimed",
    "PolicyNumber",
  ];
  df_clean = df_clean.map((row) => {
    uselessColumns.forEach((col) => delete row[col]);
    return row;
  });

  // Convert specific columns to string
  const dtypeChangeString = ["RepNumber", "Deductible", "Year"];
  df_clean.forEach((row) => {
    dtypeChangeString.forEach((col) => {
      row[col] = row[col].toString();
    });
  });

  // One-hot encoding
  const onehotEncodingColumns = [
    "Make",
    "MonthClaimed",
    "MaritalStatus",
    "PolicyType",
    "VehicleCategory",
    "RepNumber",
    "Deductible",
    "Days_Policy_Accident",
    "Days_Policy_Claim",
    "PastNumberOfClaims",
    "AgeOfPolicyHolder",
    "NumberOfSuppliments",
    "AddressChange_Claim",
    "NumberOfCars",
    "Year",
    "VehiclePrice",
    "AgeOfVehicle",
  ];

  onehotEncodingColumns.forEach((col) => {
    const uniqueValues = [...new Set(df_clean.map((row) => row[col]))];
    df_clean = df_clean.flatMap((row) => {
      const encodedRow = { ...row };
      uniqueValues.forEach((value) => {
        encodedRow[`${col}_${value}`] = row[col] === value ? 1 : 0;
      });
      delete encodedRow[col];
      return [encodedRow];
    });
  });

  // Eliminar columnas one-hot redundantes
  const uselessColumns2 = [
    'Make_Ferrari', 'Make_Lexus', 'Make_Mecedes', 'Make_Porche',
    'MonthClaimed_0', 'PolicyType_Sport - Liability',
    'Days_Policy_Claim_none', 'AddressChange_Claim_under 6 months',
    'NumberOfCars_more than 8'
  ];
  df_clean.forEach(row => {
    uselessColumns2.forEach(col => delete row[col]);
  });

  // Limpiar columna 'Age'
  df_clean.forEach(row => {
    row['Age'] = Number(row['Age']);
    if (row['Age'] === 0 || row['Age'] > 74) {
      row['Age'] = NaN;
    }
  });

  // Rellenar valores nulos en 'Age' con la mediana
  const ageValues = df_clean.map(row => row['Age']).filter(age => !isNaN(age));
  const medianAge = ageValues.sort((a, b) => a - b)[Math.floor(ageValues.length / 2)];
  df_clean.forEach(row => {
    if (isNaN(row['Age'])) {
      row['Age'] = medianAge;
    }
  });

  // Separar características (X) del target (y)
  const X_new = df_clean.map(row => {
    const { FraudFound_P, ...features } = row;
    return features;
  });

  return X_new;
}

// Ruta para realizar predicciones
app.post("/predict", async (req, res) => {
  const inputData = req.body; // Los datos de entrada enviados desde el frontend

  // Preprocesar los datos antes de pasarlos al modelo (si es necesario)
  
  try {
    // Realizar la predicción
    const processedData = preprocessData(inputData);

    // Convierte los datos en un tensor
    const inputTensor = tf.tensor(inputData); 

    // Realiza la predicción
    const prediction = await model.predict(inputTensor).array();

    // Devuelve la predicción al frontend
    res.json({ prediction });
  } catch (error) {
    console.error("Error en la predicción: ", error);
    res.status(500).send("Error en la predicción o procesamiento de datos.");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
