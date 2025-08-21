import { NavLink } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";
import "./Navbar.css"; // 👈 add this line

function Navbar() {
  const { isAuth } = useContext<IAuthContext>(AuthContext);

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <header className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <h2 className="logo">🎓 QuizApp</h2>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>
        {isAuth && (
          <>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
            <NavLink to="/questionset/list" className="nav-link">
              Question Set
            </NavLink>
          </>
        )}
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {isAuth ? (
          <button className="logout-btn" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
            <NavLink to="/login" className="nav-link login-btn">
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
