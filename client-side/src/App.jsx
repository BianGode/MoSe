// TESTTTTTTTTTTTTTT
import { useEffect, useState, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./assets/styles/App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [theme, setTheme] = useState("original");
  const [logo, setLogo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);

  const location = useLocation();

  function searchReqClientSide() {
    // axios.get('../../search')
  }

  // function handleSidebarClick() {
  //   const sidebar = document.getElementById("sideBar");
  //   const sidebarOpen = document.getElementById("sidebar-open-icon");
  //   const sidebarClose = document.getElementById("sidebar-close-icon");
  //   const sidebarLinks = document.getElementById("sideBarLinks");

  //   // sidebar slideshow
  //   if (
  //     sidebarOpen.style.display === "flex"
  //     // sidebarOpen.style.display === "flex" &&
  //     // sidebarLinks.style.display === "none"
  //   ) {
  //     sidebarOpen.style.display = "none";

  //     sidebar.style.animation = "sidebarSlideOpen 0.5s ease";

  //     setTimeout(() => {
  //       sidebar.style.display = "flex";

  //       sidebarLinks.style.display = "flex";
  //     sidebarClose.style.display = "flex";
  //     }, 500);

  //   } else {
  //     setTimeout(() => {
  //       sidebar.style.display = "none";
  //     }, 500);
  //     sidebar.style.animation = "sidebarSlideClose 0.5s ease";
  //     sidebarLinks.style.display = "none";
  //     sidebarOpen.style.display = "flex";
  //     sidebarClose.style.display = "none";
  //   }
  // }

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("active")) {
      toggleShowSidebar();
    }
  }, [location.pathname]);

  //searchBar component
  const HeaderSearch = () => {
    const [search, setSearch] = useState("");
    const searchInputRef = useRef(null);
    const searchHeaderRef = useRef(null);

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    const searchOpen = () => {
      const searchInput = searchInputRef.current;
      if (searchInput && !searchInput.classList.contains("active")) {
        searchInput.style.animation = "searchInputOpen 0.5s ease";
        setTimeout(() => {
          searchInput.classList.add("active");
        }, 500);
      }
    };

    const searchClose = () => {
      const searchInput = searchInputRef.current;
      if (searchInput.classList.contains("active")) {
        searchInput.style.animation = "searchInputClose 0.5s ease";
        setTimeout(() => {
          searchInput.classList.remove("active");
        }, 500);
      }
    };

    const handleClickOutside = (e) => {
      if (
        searchHeaderRef.current &&
        !searchHeaderRef.current.contains(e.target)
      ) {
        searchClose();
      }
    };

    function checkInput(event) {
      if (event.keyCode !== 13) {
        setSearch(event.target.value);
      }
    }

    if (location.pathname !== "/") {
      return (
        <div id="search-header" className="search-header" ref={searchHeaderRef}>
          <FontAwesomeIcon
            className="search-icon"
            id="search-icon"
            icon={faSearch}
            // onClick={() => searchReqClientSide()}
            onClick={() => searchOpen()}
          />
          <input
            id="search-input"
            // className="active"
            type="text"
            value={search}
            onKeyDown={(e) => checkInput(e)}
            onChange={(e) => setSearch(e.target.value)}
            ref={searchInputRef}
            placeholder="Search..."
          />
        </div>
      );
    } else {
      return null;
    }
  };

  // method to change theme
  function changeTheme(color) {
    setTheme(color);
    console.log(color);
  }
  // add animation for the search bar slide

  // const searchOpen = () => {
  //   const searchInput = document.getElementById("search-input");
  //   const searchHeader = document.getElementById("search-header");
  //   const searchIcon = document.getElementById("search-icon");
  //   if (!searchInput.classList.contains("active")) {
  //     searchInput.style.animation = "searchInputOpen 0.5s ease";
  //     setTimeout(() => {
  //       searchInput.classList.add("active");
  //     }, 500);
  //   }
  // };

  // detect click and then determine whether isclicked inside searchInput or outside
  // const onClickOutside = () => {
  //   console.log("first");
  //   const searchInput = document.getElementById("search-input");
  //   if (searchInput.classList.contains("active")) {
  //     console.log("second,  contains active true");
  //     document.addEventListener("click", (e) => {
  //       console.log("third,  beginning click");
  //       if (!searchInput.contains(e.target)) {
  //         console.log("fourth, searchInput does not contain clicked element");
  //         searchInput.classList.remove("active");
  //         setTimeout(() => {
  //           searchInput.style.animation = "searchInputClose 0.5s ease";
  //           console.log("fifth, during timeout");
  //         }, 500);
  //       }
  //     });
  //   }
  //   console.log("sixth, after everything");

  // };
  const toggleShowSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // onClickOutside()
  return (
    // NOTE: I know that the css classnames have bad naming-conventions but I'm gonna do better on my next project
    <div className={theme}>
      <div className="selectTheme">
        <div
          className="box original"
          onClick={() => changeTheme("original")}
        ></div>
        <div className="box black" onClick={() => changeTheme("black")}></div>
        <div className="box white" onClick={() => changeTheme("white")}></div>
      </div>

      <header className="desktop">
        <img src={logo} alt="logo" />
        <div className="headerLinks">
          <Link to="/about">About</Link>
          <Link to="/">Home</Link>
        </div>
        {
          // if the homepage active then not show the search component in the header
          // else do show
        }
        <HeaderSearch />
      </header>
      <header className="mobile">
        <FontAwesomeIcon
          icon={faBars}
          id="sidebar-open-icon"
          onClick={() => toggleShowSidebar()}
          size="lg"
          // style={{ display: "flex" }}
        />
        <div
          id="sideBar"
          className={sidebarActive ? "sidebar active" : "sidebar"}
        >
          <FontAwesomeIcon
            icon={faClose}
            id="sidebar-close-icon"
            onClick={() => toggleShowSidebar()}
            size="lg"
          />
          <div id="sideBarLinks">
            <div className="sidebar-link-singlewrap">
              <Link to="/">Home</Link>
              {location.pathname === "/" ? (
                <p className="upside-down-p">Home</p>
              ) : null}
            </div>
            <div className="sidebar-link-singlewrap">
              <Link to="/about">About</Link>
              {location.pathname === "/about" ? (
                <p className="upside-down-p">About</p>
              ) : null}
            </div>

            <HeaderSearch />
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
