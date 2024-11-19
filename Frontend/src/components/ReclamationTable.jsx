import { useEffect, useState } from "react";
import { useCsv } from "../Context/CsvContext";

const ReclamationTable = () => {
  const { csvData } = useCsv();
  const [predictions, setPredictions] = useState([]);

  const selectedColums = [
    { key: "ID", label: "ID" },
    { key: "Crahs", label: "Tipo Reclamación" },
    { key: "AccidentArea", label: "Localización" },
    { key: "MonthClaimed", label: "Fecha Reclamación" },
    { key: "Sex", label: "Sexo" },
    { key: "MaritalStatus", label: "Estado Civil" },
    { key: "Age", label: "Edad" },
    { key: "FraudFound_P", label: "Alerta Fraude" },
  ];

  // Function to process data and send it to the backend
  const fetchPredictions = async () => {
    try {
      const response = await fetch("http://localhost:4000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(csvData),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor.");
      }

      const data = await response.json();
      setPredictions(data.prediction); // Update the predictions state
    } catch (error) {
      console.error("Error al realizar la predicción: ", error);
    }
  };

  // Call the fetchPredictions function when the csvData changes
  useEffect(() => {
    if (csvData.length > 0) {
      fetchPredictions();
    }
  }, [csvData]);

  // const proccessDates = (row) => {
  //   const day = row['DayOfWeekClaimed'] || '';
  //   const month = row['MonthClaimed'] || '';
  //   const week = row['WeekOfMonthClaimed'] || '';
  //   return `${day} ${month} ${week}`;
  // };

  return (
    <>
      <div className="table-container">
        {csvData.length > 0 ? (
          <table>
            <thead>
              <tr>
                {selectedColums.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* map on reclamationData */}
              {csvData.map((row, index) => (
                <tr key={index}>
                  {selectedColums.map((col) => {
                    if (col.key === "Crahs") {
                      return <td key={col.key}>Accidente</td>;
                    }
                    if (col.key === "ID") {
                      return <td key={col.key}>{index}</td>;
                    }
                    if (col.key === "FraudFound_P") {
                      return (
                        <td key={col.key}>
                          {predictions[index] !== undefined
                            ? predictions[index] > 0.5
                              ? "Fraude"
                              : "No Fraude"
                            : "Cargando..."}
                        </td>
                      );
                    }
                    return <td key={col.key}>{row[col.key]}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p> No hay datos cargados.</p>
        )}
      </div>
    </>
  );
};

export default ReclamationTable;
