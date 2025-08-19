import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(()=>{
    document.body.style.backgroundColor = darkMode ? "#282828" : "white";
    document.body.style.color = darkMode ? "white" : "black";
  },[darkMode]);
  return (
    <>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: 'black'}}>
        <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">Web-App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav w-100">
                <li className="nav-item">
                  <NavLink className="nav-link text-white" aria-current="page" to='/home'>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" aria-current="page" to='/about'>About</NavLink>
                </li>
                <li className="nav-item ms-auto d-flex">
                  <button onClick={() => setDarkMode(!darkMode)} className="p-0"style={{ border: "none", background: "transparent" }}>
                  {darkMode ? <Sun size={30} color="yellow" /> : <Moon size={30} color="pink" />}
                  </button>
                </li>
              </ul>
            </div>
        </div>
    </nav>
    </>
  )
};
export default NavBar
