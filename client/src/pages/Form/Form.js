import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import Wrapper from "../../components/Wrapper";


class Form extends Component {
  state = {
    itemName: "",
    category: "",
    price: "",
    toResults: false,
    results: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.itemName) {

      let itemData = {
          itemName: this.state.itemName.trim(),
          category: this.state.category.trim(),
          price: this.state.price.trim()
      }

      API.saveItem(itemData)
        .then(res => {
          console.log(res.data);
          console.log("added")
        })
        .catch(err => console.log(err));
        
    //   return<Redirect to={{pathname: "/" }} />
    }
    
  };

  render() {
    // if (this.state.toResults) {
    //   return <Redirect to={{
    //     pathname: "/results",
    //     data: { results: this.state.results }
    //   }} />
    // }
    return (
      <div>
          <Wrapper>
          <form>
            <Input
              value={this.state.itemName}
              onChange={this.handleInputChange}
              name="itemName"
              label="Item Name"
              placeholder="What is the Item"
            />
            <Input 
              value={this.state.category}
              onChange={this.handleInputChange}
              name="category"
              label="Category"
              placeholder="What is the category of the item etc...Camping,Climing,Hiking"
            />
            <Input 
              value={this.state.price}
              onChange={this.handleInputChange}
              name="price"
              label="Price"
              placeholder="What is the cost per a day of this item"
            />
            <FormBtn         
              onClick={this.handleFormSubmit}
              className="btn btn-info"
            >
              Search
            </FormBtn>
          </form>
          </Wrapper>
      </div>
    );
  }
}

export default Form;