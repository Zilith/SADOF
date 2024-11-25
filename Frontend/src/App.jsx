import "./styles/App.css";
import ReclamationTable from "./components/ReclamationTable";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
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
