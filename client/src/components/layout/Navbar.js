import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector, useReducer } from "react-redux";
import { logoutUser } from "../../actions/authActions";


const navMap = {
  '/search': 'theSearchNavbar',
  '/register': 'theRegisterNavbar',
  '/login': 'theLoginNavbar',
  '/dashboard': 'theDashboardNavbar',
  '/modal': 'theModalNavbar',
  '/': 'theNavbar',
};

const logoMap = {
  '/': 'white',
  '/search': 'black',
  '/register': 'white',
  '/login': 'white',
  '/dashboard': 'white',
  '/modal': 'white'
}

const buttonMap = {
  '/': 'homeNavButton',
  '/search': 'searchNavButton',
  '/register': 'homeNavButton',
  '/login': 'homeNavButton',
  '/dashboard': 'homeNavButton',
  '/modal': 'modalNavButton'
}

const Navbar = (logoutUser) => {

  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const { pathname } = location;

  if (auth.isAuthenticated) {
    return (
      <div className="navbar-fixed">
        <nav className={`z-depth-0 ${navMap[pathname]}`}>
          <div className="nav-wrapper navbarFlex">

            <Link
              to="/"
              className={`col s5 brand-logo center ${logoMap[pathname]}-text`}
              id={`${navMap[pathname]}`}
            >
              OutCache

              </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link
                  onClick={logoutUser.logoutUser}
                  to="/"
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
                >
                  Log Out
                  </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div >
    )
  }
  return (
    <div className="navbar-fixed">
      <nav className={`z-depth-0 ${navMap[pathname]}`}>
        <div className="nav-wrapper navbarFlex">
          <Link
            to="/"
            className={`col s5 brand-logo center ${logoMap[pathname]}-text`}
            id={`${navMap[pathname]}`}
          >
            OutCache

            </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link
                to="/register"
                style={{
                  margin: "0px 15px"
                }}
                className={`btn btn-large waves-effect waves-light ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
                id="registerButton"
              >
                Register
                </Link>
            </li>
            <li>
              <Link
                to="/login"
                style={{
                  margin: "0px 15px"
                }}
                className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
              >
                Log In
                </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  )
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);