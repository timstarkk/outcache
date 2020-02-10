import React from "react";

function SearchForm(props) {
    return (
        <form className="">
            <label htmlFor="search">Search:</label>
            <div className="form-group row">
                <input
                    onChange={props.handleInputChange}
                    value={props.value}
                    name={props.name}
                    type="text"
                    className="form-control col offset-s1 s10 m9"
                    id="search"
                />
                <button onClick={props.handleFormSubmit} className="btn btn-primary col offset-s1 s10 offset-m1 m2" id="searchButton">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchForm;