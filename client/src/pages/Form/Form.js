import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import { Input, FormBtn, Label } from "../../components/Form";
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
    description: '',
    loading: false,
    user: this.props.auth
  };

  componentDidMount(){
    let id = this.props.auth.user.id
    API.getUser(id)
    .then(res => {
      console.log(res.data[0].zipcode)
      this.setState({
        userInfo: res.data,
        zipcode: res.data[0].zipcode
      })
      console.log(this.state.zipcode)
    })
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
        img: this.state.img,
        description: this.state.description,
        userId: this.props.auth.user.id,
        userName: this.props.auth.user.name,
        zipcode: this.state.zipcode
      }

      API.saveItem(itemData)
        .then(res => {
          console.log(res.data);
          console.log("added")
        })
        .then(this.props.history.push("/dashboard"))
        .catch(err => console.log(err));

      //   return<Redirect to={{pathname: "/" }} />
    }

  };

  render() {
    const { user } = this.props.auth;
    console.log(user)
    return (
          <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s12 m8 offset-m2 z-depth-2 anyCard">
                  <h3>Add an Item</h3>
                  <form>
                    <label>Add an image  </label>
                    <div>
                      <input
                        className="form-control"
                        type="file"
                        name="file"
                        label="Upload an Image"
                        placeholder="Upload an image"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.loading ? (
                      <h3>Loading...</h3>
                    ) : (
                        <div><img src={this.state.img} style={{ width: '300px' }} /></div>
                      )}
                  </form>
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
                    value={this.state.zipcode}
                    onChange={this.handleInputChange}
                    name="zipcode"
                    label="Zipcode"
                    placeholder="Where is the item located? (5-Digit Zip Code)"
                  />
                  <Input
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    name="price"
                    label="Price"
                    placeholder="What is the cost per a day of this item"
                  />
                  <Input
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    name="description"
                    label="Description"
                    placeholder="Tell me something about the item"
                  />
                  <FormBtn
                    onClick={this.handleFormSubmit}
                    className="btn btn-info"
                  >
                    Submit
                  </FormBtn>
                </form>
              </div>
              </div>
              </div>
    );
  }
}

Form.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Form);

