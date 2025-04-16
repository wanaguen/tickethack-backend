var express = require('express');
var router = express.Router();

require('../models/connection');

const Trip = require('../models/trips');
const Cart = require('../models/carts');


// --> commming from orientexpress2
router.post('/', (req, res) => {
    const departure = req.body.departure
    const arrival = req.body.arrival
    const date = req.body.date
    const price = req.body.price
  
    const newTrip = new Trip({
      departure: departure,
      arrival: arrival,
      date: date,
      price: price,

    });
    newTrip.save().then(() => {
     Trip.find().then(data => {
        res.json({ tripCart: data });
      });
    }
    )});



//--> code comming from orientexpress2
router.delete('/', (req, res) => {
  Trip.deleteMany().then(data => {
    res.json({ allTrips: data });
});
});


module.exports = router;
