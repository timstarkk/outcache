const db = require("../models");

// Defining methods for the ItemsController
module.exports = {


createRented: function(req, res) {
    console.log("-------")
    console.log(req.body)
    // console.log(db.Item)
    db.Rented
      .create(req.body)
      .then(function(dbItem) {
        return db.Item.findOneAndUpdate({_id: req.body.itemId}, { $push: { rented: dbItem._id } }, { new: true });
      })
      .then(function(dbModel) {
        // If we were able to successfully update a Product, send it back to the client
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
    },
    findByRented: function(req, res) {
      console.log("+++++++++++++")
      console.log(req.params.userId + "   >>>>findByRented")
      db.Item
        .find({userId: req.params.userId})
        .where('rented').exists()
        .populate('rented')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // findByRented: function(req, res) {
    //   console.log("rented")
    //   console.log(req.params)
    //   db.Rented
    //     .find({userId: req.params.userId})
    //     .then(dbModel => jes.json(dbModel))
    //     .catch(err => res.status(422).json(err))
    // }
}
    