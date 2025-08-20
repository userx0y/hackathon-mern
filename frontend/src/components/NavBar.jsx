import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    document.body.style.backgroundColor = darkMode ? "#282828" : "white";
    document.body.style.color = darkMode ? "white" : "black";
  },[darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: 'black'}}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">YearBook</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/home'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/dashboard'>Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to='/about'>About</NavLink>
            </li>
            <li className="nav-item ms-auto d-flex align-items-center gap-2">
              <button onClick={() => setDarkMode(!darkMode)} className="p-0" style={{ border: "none", background: "transparent" }}>
                {darkMode ? <Sun size={30} color="yellow" /> : <Moon size={30} color="pink" />}
              </button>
              <button onClick={handleLogout} className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                <LogOut size={20} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};
export default NavBar;
