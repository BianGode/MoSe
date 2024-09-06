// TESTTTTTTTTTTTTTT
import { useState } from "react";
import {
  Outlet,
  Route,
  Router,
  Routes,
  useNavigate,
  Link,
  useLocation,
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

  const location = useLocation();

  console.log(location.pathname);

  function searchReqClientSide() {
    // axios.get('../../search')
  }

  function checkInput(event) {
    if (event.keyCode !== 13) {
      setSearch(e.target.value);
    }
  }

  function handleSidebarClick() {
    const sidebar = document.getElementById("sideBar");
    const sidebarOpen = document.getElementById("sidebar-open-icon");
    const sidebarClose = document.getElementById("sidebar-close-icon");
    const sidebarLinks = document.getElementById("sideBarLinks");

    // sidebar slideshow
    if (
      sidebarOpen.style.display === "flex"
      // sidebarOpen.style.display === "flex" &&
      // sidebarLinks.style.display === "none"
    ) {
      sidebarOpen.style.display = "none";
      sidebar.style.animation = "sidebarSlideOpen 0.5s ease";
      sidebar.style.display = "flex";
      sidebarLinks.style.display = "flex";
      // setTimeout(() => {
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
    // NOTE: I know that the css classnames have bad naming-conventions but I'm gonna do better on my next project
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
          <Link to="/">Home</Link>
        </div>
        <div className="searchHeader">
          <img src="faSearch" alt="" onClick={() => searchReqClientSide()} />
          <input type="text" value={search} onKeyDown={(e) => checkInput(e)} />
        </div>
      </header>
      <header className="mobile">
        <FontAwesomeIcon
          icon={faBars}
          id="sidebar-open-icon"
          onClick={() => handleSidebarClick()}
          size="lg"
          style={{ display: "flex" }}
        />
        <div id="sideBar">
          <FontAwesomeIcon
            icon={faClose}
            id="sidebar-close-icon"
            onClick={() => handleSidebarClick()}
            size="lg"
          />
          <div id="sideBarLinks">
            <div className="sidebar-link-singlewrap">
              <Link to="/about">About</Link>
              { 
                <p>About</p>
                }
            </div>
            <div className="sidebar-link-singlewrap">
              <Link to="/">Home</Link>
              <p>Home</p>
            </div>
          </div>
        </div>
      </header>
      <div className="outlet-wrapper">
        <Outlet />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
