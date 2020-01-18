import React from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import Modal from 'react-modal';
import { Input } from "../../components/Form";

export const Results = props => ( 
        <div>
         <h5>Search Results:</h5>
         <div>      
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            // style={customStyles}
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
    </div>
)

