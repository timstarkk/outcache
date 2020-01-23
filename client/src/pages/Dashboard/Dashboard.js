import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import email from "../../email/ses_sendemail";
// import { List, ListItem } from "../../components/List";
import ResultCard from "../../components/search/ResultCard"
import RentedOutCard from "../../components/Dashboard/RentedOutCard"
import RentalCard from "../../components/Dashboard/RentalCard";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '80%'
  }

};


Modal.setAppElement('#root')

class Dashboard extends Component {
  state = {
    id: this.props.auth.user.id,
    items: [],
    rentedItems: [],
    rentalItemsArray: [],
    display: 0,
    rentalIds: [],
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
    description: "",
    rented: "",
    index: "",
    hearted: {}
  }

  openModal = (modalInfo, index) => {
    console.log(modalInfo)
    this.setState({
      itemName: modalInfo.itemName,
      itemId: modalInfo.id,
      img: modalInfo.img,
      price: modalInfo.price,
      zipCode: modalInfo.zipcode,
      description: modalInfo.description,
      rented: modalInfo.rented,
      index: index,
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

  componentDidMount() {
    const id = this.props.auth.user.id
    this.getUser(id)
    this.findByUserId(id)
    this.setState({
      id: this.props.auth.user.id
    })
  }

  constructor(props) {
    super(props);
    this.approveRental = this.approveRental.bind(this);
    this.findByUserId = this.findByUserId.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  display = value => {
    this.setState({
      display: value
    })
    // console.log(this.state.display)
  }

  approveRental = (index, subIndex) => {
    const { rentedItems } = this.state;
    const rentalInfo = {
      renterId: rentedItems[index].rented[subIndex].renterId,
      itemId: rentedItems[index]._id,
      rentedIndex: subIndex,
      rentalId: rentedItems[index].rented[subIndex]._id
    }
    // API.getUser(rentalInfo.renterId)
    //   .then(res => {
    //     console.log(res.data[0].name);
    //     console.log(res.data[0].email);
    //     console.log(email);
    //     console.log({
    //       firstName: `${res.data[0].name}`,
    //       emailAddress: `${res.data[0].email}`
    //     })
    //     email({
    //       firstName: `${res.data[0].name}`,
    //       emailAddress: `${res.data[0].email}`
    //     })
    //   })
      .catch(err => console.log(err));
    API.approveRental(rentalInfo)
      .then(res => {
      })
      .catch(err => console.log(err));

    const id = this.props.auth.user.id
    this.findByUserId(id)

    this.closeModal()
  }

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
          console.log(this.state.rentalIds)
          // console.log(this.state.rentals)
          this.findByRentals(this.state.rentals)
        }
      })
  }

  findByUserId = id => {
    // console.log(id)
    const rentedItems = []
    API.findByUserId(id)
      .then(res => {
        console.log(res.data)
        if (res.data.length > 0) {
          this.setState({
            items: res.data,
            target: "_blank"
          });
          for (let item of this.state.items) {
            // console.log(item)
            if (item.rented.length > 0) {
              rentedItems.push(item)
            }
            this.setState({
              rentedItems: rentedItems
            })
            console.log(this.state.rentedItems)
          }
        }
      })
      .catch(err => console.log(err));
  }

  findByRentals = rentals => {
    // console.log('rentals call function')
    const rentalItemsArray = []
    // console.log(rentals) 
    const something = async _ => {
      // console.log('start')
      const promises = await rentals.map(async item => {
        const getItem = await API.findByRentals(item)
          .then(res => {
            console.log(res.data[0])
            // console.log(res.data)
            // console.log(res.data[0].rented)
            rentalItemsArray.push(res.data[0])
            // console.log(rentalItemsArray)
          })
      })
      const returnitems = await Promise.all(promises)
      // console.log("end")
      this.setState({
        rentalItemsArray: rentalItemsArray
      })
      // console.log(this.state.rentalItemsArray)
    }
    something()
  }

  clickRouter = id => {
    console.log("this")
  }

  render() {
    const { user } = this.props.auth;
    const display = this.state.display

    return (
      <div className="" id="searchContainer">
        <div className="row">
          <div className="col s12" id="resultsBox">
            {/* <div className="container">
              <div>
                <SearchForm
                  value={this.state.searchTerm}
                  name="searchTerm"
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit} />
              </div>
            </div> */}

            <div className="col s12">
              <div className="row">
                <h4 className="center">{`Welcome, ${user.name}`}</h4>
              </div>
              <div classname="row">
                <div className="col offset-s2 s2">
                  <a onClick={() => this.display(0)} className="btn btn-primary dashboardButton">All Items</a>
                </div>
                <div className="col offset-s1 s2">
                  <a onClick={() => this.display(1)} className="btn btn-primary dashboardButton">Requested Items</a>
                </div>
                <div className="col offset-s1 s2">
                  <a onClick={() => this.display(2)} className="btn btn-primary dashboardButton">Your Rentals</a>
                </div>
              </div>
              {/* <!-- Grey navigation panel --> */}
            </div>


            <div className="row">
              <p className="col s7">
                {(this.state.display === 0) &&
                  <>
                    <p className="col s7">Showing results 1-{this.state.items.length} of {this.state.items.length}:</p></>
                }
                {display === 1 &&
                  <>
                    <p className="col s7">Showing results 1-{this.state.rentedItems.length} of {this.state.rentedItems.length}:</p></>
                }
                {display === 2 &&
                  <>
                    <p className="col s7">Showing results 1-{this.state.rentalItemsArray.length} of {this.state.rentalItemsArray.length}:</p></>
                }
              </p>
            </div>

            <div className="row">
              {display === 0 &&
                this.state.items.map((result, index) => (
                  <div>
                    <ResultCard
                      key={result._id + index}
                      id={result._id}
                      name={result.itemName}
                      category={result.category}
                      price={result.price}
                      img={result.img}
                      onClick={() => this.openModal(result, index)}
                      clickRouter={() => this.openModal(result, index)}
                    />
                  </div>
                ))
              }
              {display === 1 &&
                // console.log(this.state.rentedItems),
                this.state.rentedItems.map((result, index) => (
                  <div>
                    <ResultCard
                      key={result._id + index}
                      id={result._id}
                      name={result.itemName}
                      category={result.category}
                      price={result.price}
                      img={result.img}
                      clickRouter={() => this.openModal(result, index)}
                    />
                  </div>
                ))
              }
              {display === 2 &&
                //  console.log(this.state.rentalItemsArray),
                this.state.rentalItemsArray.map((result, index) => (
                  //  console.log(result.rented),
                  //  console.log(this.state.rentalIds[index]),
                  //  console.log(index)
                  <div>
                    <RentalCard
                      key={result._id + index}
                      id={result._id}
                      name={result.itemName}
                      category={result.category}
                      price={result.price}
                      img={result.img}
                      rentalId={this.state.rentalIds[index]}
                      rentals={result.rented}
                      onClick={() => this.openModal(result, index)}
                    />
                  </div>
                ))
              }
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
          <RentedOutCard
            key={this.state.id + this.state.index}
            id={this.state.id}
            name={this.state.itemName}
            category={this.state.category}
            price={this.state.price}
            img={this.state.img}
            rented={this.state.rented}
            index={this.state.index}
            description={this.state.description}
            onApproveRental={this.approveRental}
          // onClick={() => this.openModal(result)}
          />
        </Modal>

      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);