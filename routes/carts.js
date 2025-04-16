var express = require('express');
var router = express.Router();

require('../models/connection');

// const Trip = require('../models/trips');
const Cart = require('../models/carts');


// --> commming from orientexpress2
router.post('/', (req, res) => {
    const departure = req.body.departure
    const arrival = req.body.arrival
    const date = req.body.date
    const price = req.body.price
  
    const newCart = new Cart({
      departure: departure,
      arrival: arrival,
      date: date,
      price: price,

    });
    newCart.save().then(() => {
     Cart.find().then(data => {
        res.json({ tripCart: data });
      });
    }
    )});



// Route pour supprimer un document dans notre base cart
router.delete('/', (req, res) => {
  Cart.deleteOne({ _id: req.body.id }).then(data => {
    if (data === undefined) {
        res.json({ result: false, error: 'trajet non trouvé' });
    }
    res.json({ result: true });
});
});


module.exports = router;
