const mongoose = require('mongoose');


const cartV2Schema = mongoose.Schema({
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  });

const CartV2 = mongoose.model('cartsV2', cartV2Schema);

module.exports = CartV2;