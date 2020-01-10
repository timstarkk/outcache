import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper" id="cardboxParent">
        <div className="row" id="cardParent">
          <div className="col s12 center-align z-depth-2" id="landingCard">
            {/* <h4>
              <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p> */}
            <div className="col s12">
              <p id="cardHeader">Rent everything you need to get outdoors.</p>
              <form id="landingForm">
                <input type="text" id="searchTerm" placeholder="What would you like?"></input>
                <input type="text" id="searchLocation" placeholder="Where are you (ZIP Code)?"></input>
                <label>
                  <input type="checkbox" className="filled-in" style={{ color: "white" }} />
                  <span style={{ color: "black" }} >I agree to be cool</span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Landing;