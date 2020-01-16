import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "../Form";
import LocationSearchInput from "../search-autocomplete/search-autocomplete";

class Landing extends Component {
  state = {
    searchTerm: "",
    zipCode: ""
  }

  handleInputChange = event => {
    // console.log('handle input change');
    // console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
        [name]: value
    });
  };


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
                {/* <LocationSearchInput/> */}
                <Input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.handleInputChange} placeholder="What would you like?"/>
                <Input type="text" name="zipCode" value={this.state.zipCode} onChange={this.handleInputChange} placeholder="Where (Zip Code)?"/>
                <label>
                  <input type="checkbox" className="filled-in" style={{ color: "white" }} />
                  <span style={{ color: "black" }} >I agree to be cool</span>
                </label>
                {this.state.searchTerm ? (
                  <Link
                    to={`/search/${this.state.searchTerm}/${this.state.zipCode}`}
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Search
                  </Link>
                ) : (
                  <Link
                  to={`/search/?/${this.state.zipCode}`}
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </Link>
                )}
              </form>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Landing;