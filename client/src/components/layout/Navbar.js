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
  '/': 'theNavbar',
};

// export const logoutUser = () => dispatch => {
//   // Remove token from local storage
//   console.log('made it')
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
// };



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
              className="col s5 brand-logo center white-text"
              id="navbarLink"
            >
              OutCache

              </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link
                  onClick={logoutUser.logoutUser}
                  to="/"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    border: "1px solid grey"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
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