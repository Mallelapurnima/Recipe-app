const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/recipe-app', {
      useNewUrlParser: true,
    });

    console.log('db is connected successfully!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}
module.exports = connectToDatabase