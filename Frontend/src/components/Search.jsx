import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <div className="search-icon">
      <FontAwesomeIcon className="icon" icon={faSearch} />
      <input className="search-input" type="text" placeholder="Buscar" />
    </div>
  );
};

export default Search;
