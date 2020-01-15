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
  createItem: function(req, res) {
    console.log(req.body)
    // console.log(db.Item)
    db.Item
      .create(req.body)
      .then(function(dbUser) {
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
    console.log("made it to search")
    db.Item
      .find({$text: {$search: req.params.term}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByZipCode: function(req, res) {
    console.log("made it to search")
    db.Item
      .find({zipCode: req.params.zipCode})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};