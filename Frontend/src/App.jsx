import { useState } from "react";
import "./styles/App.css";
import ReclamationTable from "./components/ReclamationTable";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Header */}
      <Header />
      {/* Table */}
      <div className="container">
        {/* Search */}
        <Search/>
        <ReclamationTable />
      </div>
    </>
  );
}

export default App;
