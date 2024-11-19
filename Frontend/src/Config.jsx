import Header from "./components/Header";
import "./styles/App.css";
import { useCsv } from "./Context/CsvContext";
import Papa from "papaparse";

const Config = () => {
  const { setCsvData } = useCsv();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
        alert("Archivo CSV cargado correctamente");
      },
      error: (error) => {
        console.error("Error al leer el archivo: ", error);
      },
    });
  };

  return (
    <>
      {/* Header */}
      <Header />
      {/* Configuratios */}
      <div className="container">
        <label htmlFor="">Fuente de Datos</label>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        {/* Search */}
      </div>
    </>
  );
};

export default Config;
