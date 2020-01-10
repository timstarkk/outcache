import axios from "axios";

export default {
    saveItem: function(itemData) {
        console.log(itemData)
        return axios.post("/item", itemData)
    },
    saveImage: function(imageData) {
        console.log(typeof imageDate)
        return axios.post("/image", imageData)
    }
};