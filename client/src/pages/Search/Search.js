import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Results } from "../../components/Results/Results"
import Wrapper from "../../components/Wrapper";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import API from "../../utils/API";
import SearchForm from "../../components/search/SearchForm";
import ResultCard from "../../components/search/ResultCard"
import { FormBtn, Input } from "../../components/Form";
import './style.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%'
    }

};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const itemName = "tent"

class Search extends Component {
    state = {
        startDate: "",
        endDate: "",
        renterId: "",
        approved: false,
        itemId: "",
        searchTerm: "",
        zipCode: "",
        results: [],
        modalIsOpen: false,
        itemName: "",
        category: "",
        price: 0,
        img: "",
        modalIsOpen: false,
    }


    // userId: this.props.auth
    // userName: this.props.auth.user.name,

    mapStateToProps = state => ({
        auth: state.auth
    });

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleRentalSubmit = event => {
        event.preventDefault();

        let rentedData = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            renterId: this.props.auth.user.id,
            approved: false,
            itemId: this.state.itemId
        }

        console.log(rentedData)

        API.saveRented(rentedData)
            .then(res => {
                console.log(res.data);
                console.log("added")
            })
            .catch(err => console.log(err));

    };

    constructor() {
        super();

        // this.setState({
        //     modalIsOpen: false
        // }) 

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal = modalInfo => {
        console.log(modalInfo)
        this.setState({
            itemName: modalInfo.itemName,
            itemId: modalInfo.key,

        })
        console.log("modalButton!!")
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    componentDidMount = () => {
        console.log(this.props.match.params)
        if (this.props.match.params.term || this.props.match.params.zip) {
            this.makeSearch(this.props.match.params.term, this.props.match.params.zip);
            this.setState({ searchTerm: this.props.match.params.term })
            this.setState({ zipCode: this.props.match.params.zip})
        } else {
            this.loadItems();
        }
        console.log(this.state.results)
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
                    // console.log(key);

                    const result = {
                        key,
                        itemName,
                        category,
                        price,
                        img
                    }
                    console.log(result)

                    resultsArray.push(result)

                    this.setState({
                        results: resultsArray
                    })
                }
            })
            .catch(err => console.log(err));
    };

    makeSearch = (term, zip) => {
        console.log('makeSearch')
        console.log(`${term} & ${zip}`);
        // items.findByTerm(query)
        //     .then(res => this.setState({ books: res.data.items }))
        //     .catch(err => console.log(err));

        API.findByTerm(term, zip)
            .then(res => {
                this.setState({ results: res.data })
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

                        <div className="row">
                            <Link
                                to={`/form`}
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                Add Item
                            </Link>
                        </div>

                        <div className="row">
                            <p className="col s7">Showing results 1-{this.state.results.length} of ({this.state.results.length}):</p>
                        </div>
                        <div className="row">
                            {this.state.results.map((result, index) => (
                                <div>
                                    <ResultCard
                                        key={result.key + index}
                                        id={result.key}
                                        name={result.itemName}
                                        category={result.category}
                                        price={result.price}
                                        img={result.img}
                                        // onClick={() => this.handleModalItem(result)}
                                        onClick={() => this.openModal(result)}
                                    />
                                    {/* <FormBtn
                                        key={result.key}
                                        onClick={() => this.openModal(result)}
                                        // onClick={this.openModal}
                                        // onClick={this.handleModalItem}
                                        className="btn btn-info"
                                    >
                                        Rent
                                    </FormBtn> */}
                                    {/* <FormBtn 
                                    OnClick={() => this.openModal}
                                    OnClick={() => this.handleModalItem(result)}
                                    className="btn btn-info"
                                >
                                    Rent this item
                                <FormBtn /> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello {this.state.user}</h2> */}
                    {/* <button className="btn" onClick={this.closeModal}>close</button> */}
                    {/* <div>this is a title //${itemName}</div> */}
                    <h2>hello {this.props.auth.user.name}</h2>
                    <p>Rent {this.state.itemName}</p>
                    <form>

                        <Input
                            value={this.state.startDate}
                            onChange={this.handleInputChange}
                            name="startDate"
                            label="Start Date"
                            placeholder="When day would you like to rent this item"
                            type="date"
                        />
                        <Input
                            value={this.state.endDate}
                            onChange={this.handleInputChange}
                            name="endDate"
                            label="End Date"
                            placeholder="When day would you like to rent this item"
                            type="date"
                        />
                        {/* <input id="modal-input" className="input-field" placeholder="Enter some text" /> */}
                        <button className="btn" onClick={this.handleRentalSubmit}>Request Rental</button>
                    </form>
                </Modal>
            </div>

        )
    }
}

Search.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Search);

