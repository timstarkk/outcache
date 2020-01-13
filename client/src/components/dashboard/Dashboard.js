import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import { List, ListItem } from "../List";

class Dashboard extends Component {
  state = {
    id: this.props.auth.user.id,
    items: []
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.setState({
      id: this.props.auth.user.id
    })
    console.log(this.state.id)
    this.findByUserId(this.state.id)
  
  }


    findByUserId = id => {
      console.log(id)
      API.findByUserId(id)
        .then(res => {
          console.log(res.data)
          if (res.data.length > 0) {
            this.setState({
              items: res.data,
              target: "_blank"
            });
          } else {
            this.setState({
              noResults: true
            });
          }
        })
        .catch(err => console.log(err));
    }

  render() {
    const { user } = this.props.auth;
   
    return (
      
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
          <div>
          <List>
              {this.state.items.map(item => (
              
                <ListItem key={item._id}>
                  
                  <div className="date-div">
                    <a                  >
                      {item.itemName}
                    </a>
                    <p>Category {item.category} </p>
                    <p>Price: {item.price} </p>
                    
                    <img align="left" 
                      src={item.img}
                      style={{paddingRight:10, width: '300px' }}
                      alt="new"
                      />
                    <p>
                      {item.description}
                    </p>
                  </div>
                  <div className="item-btn-div">
                    {/* <BookBtn
                      key={book._id + "btn"}
                      btntype="info"
                      id={book._id}
                      disabled={book.link === "/"}
                      onClick={() => this.deleteBook(book._id)}
                    >
                      Delete
                  </BookBtn> */}
                  </div>
                </ListItem>
              ))}
            </List>
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