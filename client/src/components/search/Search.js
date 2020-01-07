import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Parameters from "./Parameters";
import Results from "./Results";

class SearchPage extends Component {

    componentDidMount() {
        console.log('you went to the search page');
    };

    render() {
        return (
            <div className="" id="searchContainer">
                <div className="row">
                    <div className="col s2" id="parametersBox">
                        <Parameters />
                    </div>
                    <div className="col s10" id="resultsBox">
                        {/* will pass the search terms/parameters into Results*/}
                        <Results />
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchPage;