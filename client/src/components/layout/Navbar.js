import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
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
          </div>
        </nav>
      </div >
    );
  }
}

export default Navbar;