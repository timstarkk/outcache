import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import { Input, FormBtn, PicInput } from "../../components/Form";
import Wrapper from "../../components/Wrapper";


class Form extends Component {
  state = {
    itemName: "",
    category: "",
    price: "",
    pic: "",
    toResults: false,
    results: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSelectedFile = event => {

		
	};

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.itemName) {

      let itemData = {
          itemName: this.state.itemName.trim(),
          category: this.state.category.trim(),
          price: this.state.price.trim(),
          img: this.state.img
      }

      // let imageData = this.state.img

      // API.saveImage(imageData)
      //   .then(res => {
      //     console.log(res.data);
      //     console.log("image added")
      //   })

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
            <PicInput 
              value={this.state.img}
              onChange={this.handleSelectedFile}
              name="img"
              label="Image"
              placeholder="What image do you have for the item"
            />
            <FormBtn         
              onClick={this.handleFormSubmit}
              className="btn btn-info"
            >
              Submit
            </FormBtn>
          </form>
          </Wrapper>
      </div>
    );
  }
}

export default Form;