import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";

class About extends Component {

    render() {
        
        
        return (
              <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                  <div className="col s12 m8 offset-m2 z-depth-2 anyCard">
                      <h3>About</h3>
 
                  </div>
                  </div>
                  </div>
        );
      }
};


export default About;