import React from "react";

function SearchForm(props) {
    return (
        <form className="" style={{ height: "100%" }}>
            <div className="form-group row" style={{ height: "100%" }}>
                <input
                    onChange={props.handleInputChange}
                    value={props.value}
                    name={props.name}
                    type="text"
                    className="form-control browser-default col offset-s2 s6 offset-m2 m7"
                    id="searchBar"
                />
                <button onClick={props.handleFormSubmit} className="btn btn-primary browser-default col s2 m1" id="searchButton">
                    <i class="material-icons icon-color" style={{ fontSize: "1.8rem" }}>search</i>
                </button>
            </div>
        </form >
    );
}

export default SearchForm;