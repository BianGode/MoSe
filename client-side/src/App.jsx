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
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const location = useLocation();

  // ref test
  const searchInputRef = useRef(null);
  const searchHeaderRef = useRef(null);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("active")) {
      toggleShowSidebar();
    }
  }, [location.pathname]);


  async function searchReqClientSide() {
    console.log("before client search");
    try {
      const response = await axios.get("http://localhost:5000/search", {
        params: {
          search: search,
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  // const handleClickOutside = (e) => {
  //   if (!searchHeaderRef.current.contains(e.target) && searchActive) {
  //     console.log(document.getElementById("search-header"));
  //     console.log(searchHeaderRef.current);
  //     console.log(e.target);

  //     console.log(document.getElementById("search-header").contains(e.target));

  //     console.log("clicked outside of me");
  //     setSearchActive(false);
  //   }
  // };

  // function useOutsideAlerter(ref) {
  //   if (location.pathname !== "/" && searchActive) {
  //     useEffect(() => {
  //       /**
  //        * Alert if clicked on outside of element
  //        */
  //       function handleClickOutside(event) {
  //         if (ref.current && !ref.current.contains(event.target)) {
  //           console.log("clicked outside");
  //         }
  //       }
  //       // Bind the event listener
  //       document.addEventListener("click", handleClickOutside);
  //       return () => {
  //         // Unbind the event listener on clean up
  //         document.removeEventListener("click", handleClickOutside);
  //       };
  //     }, [ref]);
  //     return ref
  //   }
  // }
  // https://www.robinwieruch.de/react-hook-detect-click-outside-component/
  const useOutsideClick = (callback) => {
    const ref = useRef();
  
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick, true);
  
      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);
  
    return ref;
  };

  const handleHeaderClick = (event) => {
    // do something

    event.stopPropagation();
  };

  function test() {
    console.log('clicked outside');
    
  }
  const ref = useOutsideClick(test)

  //searchBar component
  const HeaderSearch = () => {
  // const testOutside = useOutsideAlerter(searchHeaderRef);

    // const searchOpen = () => {
    //   const searchInput = searchInputRef.current;
    //   if (searchInput && !searchInput.classList.contains("active")) {
    //     searchInput.style.animation = "";
    //     setTimeout(() => {
    //       searchInput.classList.add("active");
    //     }, 500);
    //   }
    // };

    // const searchClose = () => {
    //   const searchInput = searchInputRef.current;
    //   // if (searchInput.classList.contains("active")) {
    //   //   searchInput.style.animation = "searchInputClose 0.5s ease";
    //   //   setTimeout(() => {
    //   //     searchInput.classList.remove("active");
    //   //   }, 500);
    //   // }
    // };

    function checkInput(event) {
      if (event.keyCode !== 13) {
        setSearch(event.target.value);
      }
    }

    if (location.pathname !== "/") {
      return (
        <div id="search-header" className="search-header" ref={ref}>
          <FontAwesomeIcon
            className="search-icon"
            id="search-icon"
            icon={faSearch}
            onClick={() => toggleSearchInput()}
          />
          <input
            id="search-input"
            className={searchActive ? "search-input active" : "search-input"}
            type="text"
            value={search}
            onKeyDown={(e) => checkInput(e)}
            onChange={(e) => setSearch(e.target.value)}
            // ref={searchInputRef}
            // onClick={() => searchReqClientSide()}
            placeholder="Search..."
          />
          <button></button>
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

  const toggleSearchInput = () => {
    console.log("valueOf = " + searchActive);

    console.log(searchActive + " ToggleSearchInputFunction");

    setSearchActive(!searchActive);
  };

  // onClickOutside()
  return (
    // NOTE: I know that the css classnames have bad naming-conventions but I'm gonna do better on my next project
    <div onClick={() => handleHeaderClick} className={theme}>
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
      <button onClick={() => searchReqClientSide()}>button</button>
      <footer></footer>
      {/* <useOutsideAlerter/> */}
    </div>
  );
}

export default App;
