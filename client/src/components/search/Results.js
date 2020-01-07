import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Results extends Component {

    componentDidMount() {
    };

    render() {
        return (
            <wrapper>

                <h5>Search Results:</h5>
                <div className="col s3" style={{ border: "2px solid green", height: "300px" }}>
                    {/* <Result /> */}
                </div>
            </wrapper>

        )
    }
}


export default Results;