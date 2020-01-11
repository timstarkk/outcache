const db = require("../models");

// Defining methods for the ItemsController
module.exports = {


createRented: function(req, res) {
    
    console.log(req.body)
    // console.log(db.Item)
    db.Rented
      .create(req.body)
      .then(function(dbItem) {
        return db.Item.findOneAndUpdate({}, { $push: { rented: dbItem._id } }, { new: true });
      })
      .then(function(dbModel) {
        // If we were able to successfully update a Product, send it back to the client
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
    }
}
    