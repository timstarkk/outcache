import axios from "axios";

export default {
    getUser: function(id){
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
    findByTerm: function (term) {
        console.log(term)
        return axios.get("/item/" + term)
    }
};
