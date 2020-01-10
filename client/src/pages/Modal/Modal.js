import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import Wrapper from "../../components/Wrapper";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './style.css';

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
    this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
    this.setState({modalIsOpen: false});
    }
    
    render() {
    return (
        <div>
        <button className="btn" onClick={this.openModal}>Open Modal</button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
    
            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button className="btn" onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
                <input id="modal-input" className="input-field" placeholder="Enter some text" />
                <button className="btn" >tab navigation</button>
                <button className="btn" >stays</button>
                <button className="btn" >inside</button>
                <button className="btn" >the modal</button>
            </form>
        </Modal>
        </div>
    );
    }
}

export default ModalElement;