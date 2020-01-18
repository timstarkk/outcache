import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import ResultCard from "../../components/search/ResultCard"
import RentedOutCard from "../../components/Dashboard/RentedOutCard"
import RentalCard from "../../components/Dashboard/RentalCard";

class Dashboard extends Component {  
  state = {
    id: this.props.auth.user.id,
    items: [],
    rentedItems: [],
    rentalItemsArray: [],
    display: 0,
    rentalIds: []
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
    const  {rentedItems } = this.state;
    const rentalInfo = {
      renterId: rentedItems[index].rented[subIndex].renterId,
      itemId: rentedItems[index]._id,
      rentedIndex: subIndex,
      rentalId: rentedItems[index].rented[subIndex]._id
    }
    API.approveRental(rentalInfo)
      .then(res => {
      })  
      .catch(err => console.log(err));
    
    const id = this.props.auth.user.id
    this.findByUserId(id)
  } 

  getUser = id => {
    API.getUser(id)
    .then(res => {
      console.log(res.data)
      if (res.data !== []) {
        this.setState({
          userInfo: res.data,
          rentals: res.data[0].rentals,
          rentalIds: res.data[0].rentalId
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

  render() {
    const { user } = this.props.auth;
    const display = this.state.display    

    return (
      // <!-- Navbar goes here -->

      // <!-- Page Layout here -->
      <div class="row">
  
        <div className="col s2 grey lighten-2">
          <div className="row">
            <a onClick={() => this.display(0)}>Your Items</a>
          </div>
          <div className="row">
            <a onClick={() => this.display(1)}>Items Rented Out</a>
          </div>
          <div className="row">
            <a onClick={() => this.display(2)}>Items You Have Rented</a>
          </div>
          {/* <!-- Grey navigation panel --> */}
        </div>
  
        <div class="col s9">
           <div className="row">  
              {(this.state.display === 0) &&
                <><h2>this display is 0</h2>
                <p className="col s7">Showing results 1-{this.state.items.length} of {this.state.items.length}:</p></>
              }
              {display === 1 &&
                <><h2>this display is 1</h2>
                <p className="col s7">Showing results 1-{this.state.rentedItems.length} of {this.state.rentedItems.length}:</p></>
              }
              {display===2 && 
                <><h2>this is display 2</h2>
                <p className="col s7">Showing results 1-{this.state.rentalItemsArray.length} of {this.state.rentalItemsArray.length}:</p></>
              }
            </div>
          

           <div className="row">
             { display === 0 && 
               this.state.items.map((result, index) => (
                   <div>
                       <ResultCard
                           key={result._id + index}
                           id={result._id}
                           name={result.itemName}
                           category={result.category}
                           price={result.price}
                           img={result.img}
                           // onClick={() => this.openModal(result)}
                       />
                   </div>
               ))
              }
              { display === 1 && 
              // console.log(this.state.rentedItems),
                this.state.rentedItems.map((result, index) => (
                  <div>
                      <RentedOutCard
                          key={result._id + index}
                          id={result._id}
                          name={result.itemName}
                          category={result.category}
                          price={result.price}
                          img={result.img}
                          rented={result.rented}
                          index={index}
                          onApproveRental={this.approveRental}
                      />
                      </div>
                    ))
              }
               { display === 2 && 
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

                          //  startDate={result.rented[index].startDate}
                           // onClick={() => this.openModal(result)}
                       />
                   </div>
               ))
              }  
           </div>
        </div>
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