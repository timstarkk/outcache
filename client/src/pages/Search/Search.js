import React, { Component } from "react";
// import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PropTypes from "prop-types";
import SearchForm from "../../components/search/SearchForm";
import ResultCard from "../../components/search/ResultCard"
// import { browserHistory } from 'react-router';
import API from "../../utils/API";

class Search extends Component {
    state = {
        searchTerm: "",
        results: []
    }

    componentDidMount = () => {
        this.loadItems();
    };

    loadItems = () => {
        console.log('loading items')
        API.requestItems()
            .then(res => {
                // this.setState({ results: res.data });
                console.log(res.data);
                for (const item in res.data) {
                    const { itemName, category, price, img } = res.data[item]
                    const resultsArray = this.state.results
                    const key = res.data[item]._id;
                    console.log(key);

                    const result = {
                        key,
                        itemName,
                        category,
                        price,
                        img
                    }

                    resultsArray.push(result)

                    this.setState({
                        results: resultsArray
                    })
                }
            })
            .catch(err => console.log(err));
    };

    makeSearch = query => {
        console.log('makeSearch')
        console.log(query)
        // items.findByTerm(query)
        //     .then(res => this.setState({ books: res.data.items }))
        //     .catch(err => console.log(err));

        API.findByTerm(query)
            .then(res => {
                this.setState({results: res.data})
                this.createResultCard(res);
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        // console.log('handle input change');
        // console.log(event);
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, search the Google Books API for the value of `this.state.search`
    handleFormSubmit = event => {
        event.preventDefault();
        this.makeSearch(this.state.searchTerm);
        console.log('handle form submit');
    };

    createResultCard = x => {
        const currentResults = this.state.results;

        // console.log(this.state.results)
        for (const item in currentResults) {
            const { itemName, category, price } = currentResults[item];
            const key = currentResults[item]._id;

            const newResult = {
                key,
                itemName,
                category,
                price,
            }

            return newResult
        }
    };

    render() {
        return (
            <div className="" id="searchContainer">
                <div className="row">
                    <div className="col s12" id="resultsBox">
                        {/* will pass the search terms/parameters into Results*/}
                        <div className="container">
                            <div className="row">
                                {/* <input className="col s9" type="text" placeholder="Search..."></input> */}
                                <SearchForm
                                    value={this.state.searchTerm}
                                    handleInputChange={this.handleInputChange}
                                    handleFormSubmit={this.handleFormSubmit} />
                            </div>
                        </div>

                        <div className="row" style={{ border: "2px solid black" }}>
                            {this.state.results.map((result) => {
                                // <ResultCard results={this.state.results} />

                                // <ResultCard name={itemName} category={category} price={price} />
                                const { key, itemName, category, price, img } = result;
                                return <ResultCard key={key} id={key} name={itemName} category={category} price={price} img={img} />
                            })}


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Search;