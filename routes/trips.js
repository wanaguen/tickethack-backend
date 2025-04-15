var express = require('express');
var router = express.Router();

require('../models/connection');

const Trip = require('../models/trips');


// --> route to find all trips (departure and arrival) and for a specific date (YYYY-MM-DD)
router.get('/', (req, res) => {
  const { departure, arrival, date } = req.body;

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
  }).then(data => {
    res.json({ searchTrips: data });
  }).catch(err => {
    res.status(500).json({ error: 'No trip found.' });
  });
});



// router.get('/', async (req, res) => {
//   const { departure, arrival, date } = req.query;

//   try {
//     // Créer les bornes ISO pour la journée
//     const startOfDay = new Date(`${date}T00:00:00.000Z`);
//     const endOfDay = new Date(`${date}T23:59:59.999Z`);

//     const data = await Trip.find({
//       departure,
//       arrival,
//       date: {
//         $gte: startOfDay.toISOString(),
//         $lte: endOfDay.toISOString()
//       }
//     });

//     res.json({ searchTrips: data });
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la recherche' });
//   }
// });

module.exports = router;
