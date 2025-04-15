const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://tlecoeur:Putain2merde@cluster0.cgmf2qe.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));
