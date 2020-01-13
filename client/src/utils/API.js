import axios from "axios";

export default {
    saveItem: function(itemData) {
        console.log(itemData)
        return axios.post("/item", itemData)
    },
    findByUserId: function(userId) {
        console.log(userId)
        return axios.get("/item/" + userId)
    }
};