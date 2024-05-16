const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1/FINAL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Define schema
const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
});

// Define model
const User = mongoose.model("User", schema);

module.exports = User; 
