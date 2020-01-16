const db = require("../models");

// Defining methods for the ItemsController
module.exports = {


createRented: async function(req, res) {
    console.log("-------")
    console.log(req.body)
    console.log(req.body.renterId)
    try{
      const userPromise = db.User.findOneAndUpdate({_id: req.body.renterId}, { $push: { rentals: req.body.itemId   }}, {new: true })
      const itemPromise = db.Item.findOneAndUpdate({_id: req.body.itemId}, { $push: { rented: req.body }}, { new: true })
      const [userResp, itemResp] = await Promise.all([userPromise, itemPromise]);
      console.log("user", userResp);
console.log()
      console.log("item", itemResp)

        return res.json({user: userResp, item:itemResp})
      
    }
      catch(err) { res.status(422).json(err)};
    },
    findByRentals: function(req, res) {
      console.log("findByUserId:" + req.params.userId)
      db.Item
        .find({_id: req.params.itemId})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
}
    