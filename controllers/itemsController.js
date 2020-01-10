const db = require("../models");

// Defining methods for the ItemsController
module.exports = {
  findAll: function(req, res) {
    db.Item
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    console.log(req.params.userId)
    db.Item
      .find({userId: req.params.userId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    // console.log(db.Item)
    db.Item
      .create(req.body)
      .then(function(dbUser) {
        // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
        // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        // { _id: req.params.id }, { items: dbUser._id }, { new: true }
        return db.User.findOneAndUpdate({}, { $push: { items: dbUser._id } }, { new: true });
      })
      
      .then(function(dbModel) {
        // If we were able to successfully update a Product, send it back to the client
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Item
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Item
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByTerm: function(req, res) {
    db.Item
      .find({itemName: new RegExp(req.params.term)})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};