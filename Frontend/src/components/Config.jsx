import Header from "./Header";
import '../styles/App.css'

const Config = () => {
    const [count, setCount] = useState(0);
  
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
  