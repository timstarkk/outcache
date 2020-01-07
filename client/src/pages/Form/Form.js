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
    pic: "",
    toResults: false,
    results: [],
    img: '',
    loading: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChange = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'outcache')
    this.setState({
      loading: true
    })
    // setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/outcache/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    this.setState({
      img: file.secure_url,
      loading: false
    })
    // setImage(file.secure_url)
    // setLoading(false)
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.itemName) {

      let itemData = {
          itemName: this.state.itemName.trim(),
          category: this.state.category.trim(),
          price: this.state.price.trim(),
          img: this.state.img
        
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
    return (
      <div>
          <Wrapper>
          <div className="App">
            <h1>Upload Image</h1>
            <input
              type="file"
              name="file"
              placeholder="Upload an image"
              onChange={this.handleChange}
            />
            {this.state.loading ? (
              <h3>Loading...</h3>
            ) : (
              <img src={this.state.img} style={{ width: '300px' }} />
            )}
          </div>
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
              Submit
            </FormBtn>
          </form>
          </Wrapper>
      </div>
    );
  }
}

export default Form;