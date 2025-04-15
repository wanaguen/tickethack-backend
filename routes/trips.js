var express = require('express');
var router = express.Router();

require('../models/connection');

const Trip = require('../models/trips');


// // --> route GET to find all trips (departure and arrival) and for a specific date (YYYY-MM-DD)
// router.get('/', (req, res) => {
//   const { departure, arrival, date } = req.body;

//   // Convertir la date 'YYYY-MM-DD' en objets Date pour les bornes
//   const [year, month, day] = date.split('-');
//   const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
//   const endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

//   // Rechercher les trajets dans la base de données
//   Trip.find({
//     departure,
//     arrival,
//     date: {
//       $gte: startDate.toISOString(),
//       $lt: endDate.toISOString()
//     }
//   }).then(data => {
//     res.json({ searchTrips: data });
//   }).catch(err => {
//     res.status(500).json({ error: 'No trip found.' });
//   });
// });


// --> route POST to find all trips (departure and arrival) and for a specific date (YYYY-MM-DD)
router.post('/', (req, res) => {
  const departure = { $regex: new RegExp(req.body.departure, 'i')};
  const arrival = { $regex: new RegExp(req.body.arrival, 'i')};
  const date = req.body.date;

  // Convertir la date 'YYYY-MM-DD' en objets Date pour les bornes
  const [year, month, day] = date.split('-');
  const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  const endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

  // Rechercher les trajets dans la base de données
  Trip.find({
    departure,
    arrival,
    date: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString()
    }
  })
  .then(data => {
    res.json({ searchTrips: data });
  })
  .catch(err => {
    res.status(500).json({ error: 'No trip found.' });
  });
});



module.exports = router;
