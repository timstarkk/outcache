import axios from "axios";

export default {
    saveItem: function(itemData) {
        console.log(itemData)
        return axios.post("/item", itemData)
    }
};