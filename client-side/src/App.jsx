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
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

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
    const sidebar = document.querySelector(".sideBar");
    const sidebarOpen = document.querySelector(".sidebar-open-icon");
    const sidebarClose = document.querySelector(".sidebar-close-icon");
    const sidebarLinks = document.querySelector(".sideBarLinks")

    // sidebar slideshow
    if (sidebarOpen.style.display == "flex" && sidebarLinks.style.display == "none") {
      sidebar.style.animation = "sidebarSlideOpen 0.5s ease";
      sidebar.style.display = "flex";
      sidebarLinks.style.display = "block"
      // setTimeout(() => {
        sidebarOpen.style.display = "none";
        sidebarClose.style.display = "flex";
      // }, 500);
    } else {
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 500);
      sidebar.style.animation = "sidebarSlideClose 0.5s ease";
      sidebarLinks.style.display = "none";
      sidebarOpen.style.display = "flex";
      sidebarClose.style.display = "none";
    }
  }

  return (
    <div>
      <div className="selectTheme">
        <div className="box original active"></div>
        <div className="box black"></div>
        <div className="box white"></div>
      </div>
      <header className="desktop">
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
          <input type="text" value={search} onKeyDown={(e) => checkInput(e)} />
        </div>
      </header>
      <header className="mobile">
        <FontAwesomeIcon
          icon={faBars}
          className="sidebar-open-icon"
          onClick={() => handleSidebarClick()}
        />
        <div className="sideBar">
          <FontAwesomeIcon
            icon={faClose}
            className="sidebar-close-icon"
            onClick={() => handleSidebarClick()}
          />
          <div className="sideBarLinks">
            <Link to="/about">About</Link>
            <Link to="/home">Home</Link>
          </div>
        </div>
      </header>

      <Outlet />
      <footer></footer>
    </div>
  );
}

export default App;
