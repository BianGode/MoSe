import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/Home.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="homeWrapper">
      <div className="search-wrap-home">
        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className="search-results"></div>
      </div>
    </div>
  );
}

export default Home;
