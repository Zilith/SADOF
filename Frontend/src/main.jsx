import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Config from "./Config";
import { CsvProvider } from "./Context/CsvContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CsvProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="config" element={<Config />}></Route>
        </Routes>
      </Router>
    </CsvProvider>
  </StrictMode>
);
