var express = require('express');
var router = express.Router();

require('../models/connection');



// //--> code comming from orientexpress2
// router.delete('/trips', (req, res) => {
//   Trip.deleteMany().then(data => {
//     res.json({ allTrips: data });
// });
// });


module.exports = router;
