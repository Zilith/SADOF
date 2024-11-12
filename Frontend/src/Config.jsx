import Header from "./components/Header";
import './styles/App.css'

const Config = () => {
  
    return (
      <>
        {/* Header */}
        <Header />
        {/* Configuratios */}
        <div className="container">
            <label htmlFor="">Fuente de Datos</label>
            <input type="text" />
          {/* Search */}
        </div>
      </>
    );
  }
  
  export default Config;
  