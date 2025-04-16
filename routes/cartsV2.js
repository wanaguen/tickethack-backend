var express = require('express');
var router = express.Router();

require('../models/connection');

const CartV2 = require('../models/cartsV2');
const Trip = require('../models/trips');


router.post('/', async (req, res) => {
    const tripId = req.body._id;
  
    try {
      // Vérifie si le trip existe
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ error: 'Voyage non trouvé' });
      }
  
      // Crée un cart avec une référence vers le trip
      const newCartV2 = new CartV2({ trip: tripId });
      await newCartV2.save();
  
      // Renvoie tous les items du panier avec trip "populé"
      const populatedCartV2 = await CartV2.find().populate('trip');
      res.json({ tripCart: populatedCartV2 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });



module.exports = router;