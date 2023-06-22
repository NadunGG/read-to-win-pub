const mongoose = require('mongoose');
const remoteDbUrl = process.env.DB_URL;
const localDbUrl = 'mongodb://localhost:27017/bookstore';
const mongoDB = async function () {
  await mongoose
    .connect(remoteDbUrl || localDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MONGO CONNECTION OPEN!');
    })
    .catch((err) => {
      console.log('OH NO! MONGO CONNECTION ERROR!!!!!');
      console.log('Check Whether mongod Server is Running Before Starting Express Server!!');
      console.log(err);
    });
};

module.exports = mongoDB;
