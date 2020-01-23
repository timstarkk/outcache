import axios from "axios";

export default {
    getUser: function (id) {
        console.log(id)
        return axios.get("/user/" + id)
    },
    saveItem: function (itemData) {
        console.log(itemData)
        return axios.post("/item", itemData)
    },
    saveImage: function (imageData) {
        console.log(typeof imageDate)
        return axios.post("/image", imageData)
    },
    saveRented: function (rentedData) {
        console.log(rentedData)
        return axios.post("/rented", rentedData)
    },
    requestItems: function () {
        console.log('we made it to requestItems')
        // console.log(itemName);
        return axios.get("/item")
    },
    findByUserId: function (userId) {
        console.log(userId)
        return axios.get("/item/" + userId)
    },
    findByRentals: function (itemId) {
        console.log(itemId + "findByRentals API.js")
        return axios.get("/rentals/" + itemId)
    },
    findByTerm: function (term, zip) {
        console.log(`${term} & ${zip}`);
        return axios.get("/search/" + term + "/" + zip)
    },
    approveRental: function (rentalInfo) {
        console.log(rentalInfo)
        return axios.post("/rentalApprove", rentalInfo)
    },
    saveRentalIdInUser: function (rentalId) {
        console.log(rentalId)
        return axios.post("/rentalId", rentalId)
    },
    saveHeart: function (itemId) {
        console.log(itemId)
        return axios.post("/heart", itemId)
    },
    removeHeart: function (removeInfo) {
        console.log(removeInfo)
        return axios.post("/removeHeart", removeInfo)
    }
    // findRentalIdInUser: function (userId) {
    //     console.log(userId)
    //     return axios.get("/rentalId/" + userId)
    // }
    // findByZipCode: function (zip) {
    //     console.log(zip)
    //     return axios.get("/search/" + zip)
    // }
};
