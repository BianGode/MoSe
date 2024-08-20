import { useState } from "react";
import {
  Outlet,
  Route,
  Router,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import "./assets/styles/App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// import * as logoGreen from './assets/logos/logoGreen.jpg'
// import * as logoBlack from './assets/logos/logoBlack.jpg'
// import * as logoWhite from './assets/logos/logoWhite.jpg'

function App() {
  const [theme, setTheme] = useState("");
  const [logo, setLogo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarActive, setSidebarActive] = useState(false);

  function searchReqClientSide() {
    // axios.get('../../search')
  }

  function checkInput(event) {
    if (event.keyCode !== 13) {
      setSearch(e.target.value);
    }
  }
  
  function handleSidebarClick() {
    const sidebar = document.querySelector('.sideBar')
  }

  return (
    <div>
      <div className="selectTheme">
        <div className="box original active"></div>
        <div className="box black"></div>
        <div className="box white"></div>
      </div>
      {document.body.offsetWidth > 800 ? (
        <header>
          <img src={logo} alt="logo" />
          {
            // if the homepage active then not show the search icon in the header
            // else do show
          }
          <div className="headerLinks">
            <Link to="/about">About</Link>
            <Link to="/home">Home</Link>
          </div>
          <div className="searchHeader">
            <img src="faSearch" alt="" onClick={() => searchReqClientSide()} />
            <input
              type="text"
              value={search}
              onKeyDown={(e) => checkInput(e)}
            />
          </div>
        </header>
      ) : (
        <>
          <FontAwesomeIcon icon={faBars} onClick={() => handleSidebarClick()} />
          <div className="sideBar">
            <div className="sideBarLinks">
              <Link to="/about">About</Link>
              <Link to="/home">Home</Link>
            </div>
          </div>
        </>
      )}
      <Outlet />
      <footer></footer>
    </div>
  );
}

export default App;
