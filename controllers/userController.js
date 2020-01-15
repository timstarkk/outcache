
const db = require("../models");

// Defining methods for the ItemsController
module.exports = {
    getUser: function(req, res) {
    console.log("getUser req.prams" + req.params)
    console.log("getUser id params:" + req.params.id)
    db.User
      .find({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}