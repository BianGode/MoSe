import { useState } from "react";
import { Outlet, Route, Router, Routes, useNavigate } from "react-router-dom";
import "./assets/styles/App.css";
import axios from "axios";
// import * as logoGreen from './assets/logos/logoGreen.jpg'
// import * as logoBlack from './assets/logos/logoBlack.jpg'
// import * as logoWhite from './assets/logos/logoWhite.jpg'

function App() {
  const [theme, setTheme] = useState("");
  const [logo, setLogo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  function searchReqClientSide() {
    // axios.get('../../search')
  }

  function checkInput(event) {
    if (event.keyCode !== 13) {
      setSearch(e.target.value);
    }
  }
  return (
    <div>
      <div className="selectTheme">
        <div className="box original active"></div>
        <div className="box black"></div>
        <div className="box white"></div>
      </div>
      <header>
        <img src={logo} alt="logo" />
        {
          // if the homepage active then not show the search icon in the header
          // else do show
        }
        <div className="searchHeader">
          <img src="faSearch" alt="" onClick={() => searchReqClientSide()} />
          <input type="text" value={search} onKeyDown={(e) => checkInput(e)} />
        </div>
      </header>
      <Outlet />
      <footer></footer>
    </div>
  );
}

export default App;
