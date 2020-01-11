import axios from "axios";

export default {
    saveItem: function (itemData) {
        console.log(itemData)
        return axios.post("/item", itemData)
    },
    saveImage: function (imageData) {
        console.log(typeof imageDate)
        return axios.post("/image", imageData)
    },
    requestItems: function () {
        console.log('we made it to requestItems')
        // console.log(itemName);
        return axios.get("/item")
    },
    findByUserId: function (userId) {
        console.log(userId)
        return axios.get("/item/" + userId)
    }

};