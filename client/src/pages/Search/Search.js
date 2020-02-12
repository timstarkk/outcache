import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import { Results } from "../../components/Results/Results"
// import Wrapper from "../../components/Wrapper";
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import API from "../../utils/API";
import SearchForm from "../../components/search/SearchForm";
import ResultCard from "../../components/search/ResultCard"
import { Input } from "../../components/Form";
import './style.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: 'auto'
    }

};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

// const itemName = "tent"

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
        description: ""
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

        console.log(this.state.itemId)


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
                console.log(res.data)
                const rentalIdInfo = {
                    rentalId: res.data.item.rented.slice(-1)[0]._id,
                    userId: this.props.auth.user.id,
                }
                console.log(rentalIdInfo.userId)
                console.log(res.data.item.rented.slice(-1)[0]);
                console.log(res.data.item.rented.slice(-1)[0]._id);
                API.saveRentalIdInUser(rentalIdInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                console.log("added")
                this.setState({ modalIsOpen: false });
            })
            .catch(err => console.log(err));
    };

    constructor() {
        super()
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.heartedItem = this.heartedItem.bind(this);
    }

    openModal = modalInfo => {
        console.log(modalInfo)
        this.setState({
            itemName: modalInfo.name,
            itemId: modalInfo.id,
            img: modalInfo.img,
            price: modalInfo.price,
            zipCode: modalInfo.zipcode,
            description: modalInfo.description,
            userId: this.props.auth.user.id
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
            this.setState({ zipCode: this.props.match.params.zip })
        } else {
            this.loadItems();
        }
        console.log(this.state.results)
        this.getUser(this.props.auth.user.id)
    };

    getUser = id => {
        API.getUser(id)
            .then(res => {
                console.log(res.data)
                if (res.data !== []) {
                    this.setState({
                        userInfo: res.data,
                        rentals: res.data[0].rentals,
                        rentalIds: res.data[0].rentalId,
                        hearted: res.data[0].hearted
                    })
                    console.log(this.state.hearted)
                    //   console.log(this.state.rentalIds)
                    // console.log(this.state.rentals)
                }
            })
    }

    loadItems = () => {
        console.log('loading items')
        API.requestItems()
            .then(res => {
                // this.setState({ results: res.data });
                this.setState({ results: [] });
                console.log(res.data);
                for (const item in res.data) {
                    const { itemName, category, price, img, description, zipcode } = res.data[item]
                    const resultsArray = this.state.results
                    const _id = res.data[item]._id;
                    // console.log(key);

                    const result = {
                        _id,
                        itemName,
                        category,
                        price,
                        img,
                        description,
                        zipcode
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
                console.log(res.data)
                this.setState({ results: res.data })
                this.createResultCard(res);
            })
            .catch(err => console.log(err));
    };


    // When the form is submitted, search the Google Books API for the value of `this.state.search`
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.searchTerm && this.state.zipCode) {
            this.makeSearch(this.state.searchTerm, this.state.zipCode);
        } else if (this.state.searchTerm && !this.state.zipCode) {
            this.makeSearch(this.state.searchTerm, '0');
        } else if (!this.state.searchTerm && this.state.zipCode) {
            this.makeSearch('camping', this.state.zipCode);
        } else {
            this.loadItems();
        }

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

    clickRouter = (modalInfo, route) => {
        console.log(route)
        if (route === "addHeart") {
            console.log(route)
            console.log("sent to hearted route")
            this.heartedItem(modalInfo)
        } else if (route === "openModal") {
            console.log("sent to open modal")
            this.openModal(modalInfo)
        } else {
            console.log("removeHeart")
            this.removeHeart(modalInfo)
        }
    }

    removeHeart = modalInfo => {
        console.log(modalInfo)
        const removeHeartInfo = {
            itemId: modalInfo.id,
            userId: this.props.auth.user.id
        }

        API.removeHeart(removeHeartInfo)
            .then(res => {
                console.log(res.data)
                this.getUser(this.props.auth.user.id)
            })

    }

    heartedItem = modalInfo => {
        console.log(modalInfo)
        console.log(this.props.auth.user.id)
        const heartInfo = {
            itemId: modalInfo.id,
            userId: this.props.auth.user.id
        }
        API.saveHeart(heartInfo)
            .then(res => {
                console.log(res.data)
                this.getUser(this.props.auth.user.id)
            })
            .catch(err => console.log(err))


        console.log("hearted")
    }

    render() {



        return (
            <div className="" id="searchContainer" style={{}}>
                <div className="row container" id="resultsBoxContainer" style={{ height: "100%", "margin-bottom": "0px" }}>
                    <div className="col s12" id="resultsBox">
                        {/* will pass the search terms/parameters into Results*/}
                        <div className="container">
                            <div>
                                {/* <input className="col s9" type="text" placeholder="Search..."></input> */}
                                <SearchForm
                                    value={this.state.searchTerm}
                                    name="searchTerm"
                                    handleInputChange={this.handleInputChange}
                                    handleFormSubmit={this.handleFormSubmit} />
                            </div>
                        </div>

                        {/* <div className="container">
                            <div>
                                <input className="col s9" type="text" placeholder="Search..."></input>
                                <SearchForm
                                    value={this.state.zipCode}
                                    name="zipCode"
                                    handleInputChange={this.handleInputChange}
                                    handleFormSubmit={this.handleFormSubmit} />
                            </div>
                        </div> */}

                        <div className="row">
                            <p className="col offset-s1 s12">Showing results 1-{this.state.results.length} of ({this.state.results.length}):</p>
                        </div>
                        <div className="row">
                            {this.state.results.map((result, index) => (
                                < div >
                                    <ResultCard
                                        key={result.key + index}
                                        id={result._id}
                                        name={result.itemName}
                                        category={result.category}
                                        price={result.price}
                                        img={result.img}
                                        clickRouter={this.clickRouter}
                                        hearted={this.state.hearted}
                                    // heartClick={this.heartedItem}
                                    />
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

                    {/* <h2>hello {this.props.auth.user.name}</h2>
                    <p>Rent {this.state.itemName}</p> */}
                    <div className="closeButton" onClick={this.closeModal}></div>
                    <div className="productDetails row">
                        <div className="col s12 m12 l6" id="imageContainerContainer" style={{}}>
                            <div className="detailsImageContainer">
                                <img src={`${this.state.img}`} />
                            </div>
                        </div>
                        <div className="col s12 m12 l6 productDetailsBox" style={{ padding: "20px 20px 0px 20px", height: "100%" }}>
                            <div className="row" style={{ margin: "0px" }}>
                                <h4 style={{ "margin-top": "0px" }}>{this.state.itemName}</h4>
                            </div>
                            <div className="row" style={{ margin: "0px" }}>
                                <p>${this.state.price} / day</p>
                            </div>
                            <div className="row" style={{ margin: "0px" }}>
                                <p className="descriptionText" style={{ margin: "0px" }}>Description: </p>
                                <p style={{ marginTop: "0px" }}>{this.state.description}</p>
                            </div>
                            <div className="row" style={{}}>
                                <div className="col s12">
                                    <div className="formContainer" style={{}}>
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
                                            {this.props.auth.user.id != undefined &&
                                                <button className="btn rentalButton" onClick={this.handleRentalSubmit}>Request Rental</button>
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>
            </div >

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

