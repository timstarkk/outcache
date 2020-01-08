import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Results from "./Results";

class SearchPage extends Component {

    componentDidMount() {
        console.log('you went to the search page');
    };

    render() {
        return (
            <div className="" id="searchContainer">
                <div className="row">
                    <div className="col s12" id="resultsBox">
                        {/* will pass the search terms/parameters into Results*/}
                        <div className="container">
                            <form className="row">
                                <input className="col s9" type="text" placeholder="Search..."></input>
                                <button className="col s3" type="submit">Submit</button>
                            </form>
                        </div>

                        <Results />
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchPage;