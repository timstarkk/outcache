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

class SearchPage extends Component {
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
    
    

    componentDidMount() {
        console.log('you went to the search page');
    };

    render() {
        return (
            <div className="" id="searchContainer">
                <div className="row">
                    <div className="col s12" id="resultsBox">
                        {/* will pass the search terms/parameters into Results*/}
                        <div className="container">
                            <form className="row">
                                <input className="col s9" type="text" placeholder="Search..."></input>
                                <button className="col s3" type="submit">Submit</button>
                            </form>
                        </div>

                        <Results />
                    </div>
                </div>
            </div>
        )
    }
}

SearchPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(SearchPage);

