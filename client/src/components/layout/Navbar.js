import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  state = {
    id: this.props.auth.user.id,
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="navbar-fixed">
        <nav className="z-depth-0 theNavbar">
          <div className="nav-wrapper navbarFlex">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                position: "absolute",
                left: "120px"
              }}
              className="col s5 brand-logo center white-text"
            >
              OutCache
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>              
                <button
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    border: "1px solid grey"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  onClick={this.onLogoutClick}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div >
      )
    }
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0 theNavbar">
          <div className="nav-wrapper navbarFlex">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                position: "absolute",
                left: "120px"
              }}
              className="col s5 brand-logo center white-text"
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