import React from "react";
import { Link, useLocation } from "react-router-dom";

const navMap = {
  '/search': 'theSearchNavbar',
  '/register': 'theRegisterNavbar',
  '/login': 'theLoginNavbar',
  '/dashboard': 'theDashboardNavbar',
  '/': 'theNavbar',
};

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="navbar-fixed">
      <nav className={`z-depth-0 ${navMap[pathname]}`}>
        <div className="nav-wrapper navbarFlex">
          <Link
            to="/"
            className="col s5 brand-logo center white-text"
            id="navbarLink"
          >
            OutCache

            </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
                </Link>
            </li>
            <li>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  border: "1px solid grey"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
                </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}

export default Navbar;