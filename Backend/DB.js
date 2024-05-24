const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/FINAL")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define schema
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Define model
const User = mongoose.model("User", schema);

module.exports = User;
