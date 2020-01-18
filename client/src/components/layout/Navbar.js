import React, {useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector, useReducer} from "react-redux";
import { logoutUser } from "../../actions/authActions";
import 'materialize-css/dist/css/materialize.min.css';
import M, { AutoInit } from  'materialize-css/dist/js/materialize.min.js';
import useWindowSize from './windowSize';


const navMap = {
  '/search': 'theSearchNavbar',
  '/register': 'theRegisterNavbar',
  '/login': 'theLoginNavbar',
  '/dashboard': 'theDashboardNavbar',
  '/modal': 'theModalNavbar',
  '/form': 'theNavbar',
  '/': 'theNavbar',
};

const logoMap = {
  '/': 'grey',
  '/search': 'grey',
  '/form': 'grey',
  '/register': 'grey',
  '/login': 'grey',
  '/dashboard': 'grey',
  '/modal': 'grey'
}

const buttonMap = {
  '/': 'homeNavButton',
  '/search': 'searchNavButton',
  '/form': 'homeNavButton',
  '/register': 'homeNavButton',
  '/login': 'homeNavButton',
  '/dashboard': 'homeNavButton',
  '/modal': 'modalNavButton'
}

const Navbar = (logoutUser) => {
  useEffect(() => {
    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {edge:'right'});
  });

  //     let sidenav = document.querySelector('#slide-out');
  //   M.Sidenav.init(sidenav, {edge:'right'});

  const location = useLocation();
  const auth = useSelector(state => state.auth);
  const { pathname } = location;

  const [slider, setSlider] = useState(false);
  const size = useWindowSize();

  if (auth.isAuthenticated) {
    return (
      <div className="navbar-fixed">
        <nav className={`z-depth-0 ${navMap[pathname]}`}>
          <div className="nav-wrapper navbarFlex">
            <Link
              to="/"
              className={`col s5 brand-logo center ${logoMap[pathname]}-text text-darken-3`}
              id={`${navMap[pathname]}`}
            >
              OutCache

              </Link>
            <a href="#" data-target="slide-out" onClick={() => setSlider(s => !s)} className="right sidenav-trigger"><i className="material-icons" style={{fontSize: "40px",color: "#424242"}}>menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link
                  to={`/search`}
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton text-darken-3`}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                    to={`/dashboard`}
                    style={{
                      margin: "0px 15px"
                    }}
                    className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
                    >
                    Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={`/form`}
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton text-darken-3`}
                >
                  Add Item
                </Link>
              </li>
              <li>
                <Link
                  onClick={logoutUser.logoutUser}
                  to="/"
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton text-darken-3`}
                >
                  Log Out
                  </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div
        className="sidenav-overlay"
        onClick={() => setSlider(s => !s)}
        style={{
          display: slider && size.width < 980 ? "block" : "none",
          opacity: "1"
        }}
        />
        <ul id="slide-out" className="sidenav" 
        style={{
          height: "auto",
          display: slider || size.width > 980 ? "block" : "none",
        }}>
              <li>
                <Link
                  to={`/search`}
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton text-darken-3`}
                  onClick={() => setSlider(s => !s)}
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                    to={`/dashboard`}
                    style={{
                      margin: "0px 15px"
                    }}
                    className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
                    onClick={() => setSlider(s => !s)}
                    >
                    Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={`/form`}
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton text-darken-3`}
                  onClick={() => setSlider(s => !s)}
                >
                  Add Item
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {logoutUser.logoutUser(); setSlider(s => !s);}}
                  to="/"
                  style={{
                    margin: "0px 15px"
                  }}
                  className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton text-darken-3`}
                >
                  Log Out
                  </Link>
              </li>
            </ul>
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
            <a href="#" data-target="slide-out" onClick={() => setSlider(s => !s)} className="right sidenav-trigger"><i className="material-icons" style={{fontSize: "40px",color: "#424242"}}>menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link
                to={`/search`}
                style={{
                  margin: "0px 15px"
                }}
                className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
              >
                Search
              </Link>
            </li>
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
      <div
        className="sidenav-overlay"
        onClick={() => setSlider(s => !s)}
        style={{
          display: slider && size.width < 980 ? "block" : "none",
          opacity: "1"
        }}
        />
        <ul id="slide-out" className="sidenav" 
        style={{
          height: "auto",
          display: slider || size.width < 980 ? "block" : "none"
        }}>
            <li>
              <Link
                to={`/search`}
                style={{
                  margin: "0px 15px"
                }}
                className={`btn btn-large btn-flat ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
                onClick={() => setSlider(s => !s)}
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={{
                  margin: "0px 15px"
                }}
                className={`btn btn-large waves-effect waves-light ${logoMap[pathname]}-text ${buttonMap[pathname]} navButton`}
                onClick={() => setSlider(s => !s)}
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
                onClick={() => setSlider(s => !s)}
              >
                Log In
                </Link>
            </li>
          </ul>
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