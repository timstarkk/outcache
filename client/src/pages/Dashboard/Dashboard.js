import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import ResultCard from "../../components/search/ResultCard"

class Dashboard extends Component {
  state = {
    id: this.props.auth.user.id,
    items: [],
    rentedItems: [],
    rentalItemsArray: [],
    display: 0
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  
  display = value => {
    this.setState({
      display: value
    })
    console.log(this.state.display)
  }

  componentDidMount() {
    const id = this.props.auth.user.id
    API.getUser(id)
    .then(res => {
      console.log(res.data)
      if (res.data !== []) {
        
        this.setState({
          userInfo: res.data,
          rentals: res.data[0].rentals
        })
        
        console.log(this.state.rentals)
        this.findByRentals(this.state.rentals)
      }
    })
   
    this.setState({
      id: this.props.auth.user.id
    })
    console.log(this.state.id)
    this.findByUserId(this.state.id)
  }


    findByUserId = id => {
      console.log(id)
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
              console.log(item)
              if (item.rented.length > 0) {
                rentedItems.push(item)
              }
              this.setState({
                rentedItems: rentedItems
              })
              console.log(this.state.rentedItems)
            }
          } else {
            this.setState({
              noResults: true
            });
          }
        })
        .catch(err => console.log(err));
    }

  

    findByRentals = rentals => {
      console.log('rentals call function')
      const rentalItemsArray = []
      console.log(rentals) 
      const something = async _ => {
        console.log('start')
        const promises = await rentals.map(async item => {
          const getItem = await API.findByRentals(item)
            .then(res => {
              console.log(res.data[0])
              // console.log(res.data)
              // console.log(res.data[0].rented)
              rentalItemsArray.push(res.data[0])
              console.log(rentalItemsArray)
            })
        })
        const returnitems = await Promise.all(promises)
        console.log("end")
        this.setState({
          rentalItemsArray: rentalItemsArray
        })
        console.log(this.state.rentalItemsArray)
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
        {display===0  &&  
          <h2>this display is 0</h2>
        }
         {display===1 && 
          <h2>this display is 1</h2>
        }
         {display===2 && 
          <h2>this display is 2</h2>
        }
         
           <div className="row">  
            {(this.state.display === 0) &&
                <p className="col s7">Showing results 1-{this.state.items.length} of {this.state.items.length}:</p>
            }
            {display === 1 &&
              <p className="col s7">Showing results 1-{this.state.rentedItems.length} of {this.state.rentedItems.length}:</p>
            }
            {display===2 && 
              <p className="col s7">Showing results 1-{this.state.rentalItemsArray.length} of {this.state.rentalItemsArray.length}:</p>
            }
            </div>

           <div className="row">
               {this.state.items.map((result, index) => (
                   <div>
                       <ResultCard
                           key={result.key + index}
                           id={result.key}
                           name={result.itemName}
                           category={result.category}
                           price={result.price}
                           img={result.img}
                           // onClick={() => this.openModal(result)}
                       />
                   </div>
               ))}
           </div>
       





        <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row dashboardCard">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
          {/* <!-- Teal page content  --> */}
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