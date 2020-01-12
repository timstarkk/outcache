import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import Wrapper from "../../components/Wrapper";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './style.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }

  };
   
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')


class ModalElement extends Component {
  state = {
    startDate: "",
    endDate: "",
    renterId: "",
    approved: false,
    itemId: "",
    // userId: this.props.auth
    // userName: this.props.auth.user.name,

  } 

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
        // itemId: this.state.itemId
      }

      API.saveRented(rentedData)
        .then(res => {
          console.log(res.data);
          console.log("added")
        })
        .catch(err => console.log(err));
        
    //   return<Redirect to={{pathname: "/" }} />
    
    
  };
  
  constructor() {
        super();
     
        this.state = {
          modalIsOpen: false
        };
     
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
     
    openModal() {
    this.setState({modalIsOpen: true});
    }
    
    afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
      this.setState({modalIsOpen: false});
    }
    
    render() {
    return (
        <div>
        <button className="btn" onClick={this.openModal}>Rent This Item</button>
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
                {/* <input id="modal-input" className="input-field" placeholder="Enter some text" />
                <button className="btn" onClick={this.handleRentalSubmit}>Request Rental</button> */}
            </form>
        </Modal>
        <button className="btn" onClick={this.openModal}>Rent This Item</button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        > 
    
            {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello {this.state.user}</h2> */}
            {/* <button className="btn" onClick={this.closeModal}>close</button> */}
            <div>I am a modal</div>
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
                {/* <input id="modal-input" className="input-field" placeholder="Enter some text" />
                <button className="btn" onClick={this.handleRentalSubmit}>Request Rental</button> */}
            </form>
        </Modal>
        </div>
    );
    }
}

ModalElement.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ModalElement);



