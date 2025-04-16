var express = require('express');
var router = express.Router();

require('../models/connection');

const Booking = require('../models/bookings');

// --> route to add a single trip in the bookings collection (from Cart page)
router.post('/', (req, res) => {
    const departure = req.body.departure
    const arrival = req.body.arrival
    const date = req.body.date
    const price = req.body.price
  
    const newBooking = new Booking({
      departure: departure,
      arrival: arrival,
      date: date,
      price: price,

    });
    newBooking.save().then(() => {
     Booking.find().then(data => {
        res.json({ tripBooking: data });
      });
    }
    )});


// --> route to display all bookings
router.get('/', (req, res) => {
  Booking.find().then(data => {
       res.json({ allBookings: data });
     });
 });


module.exports = router;
