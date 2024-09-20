const mongoose = require("mongoose");

// Connect to MongoDB database
mongoose.connect('mongodb+srv://sharmashubu4600:18jan2001@ecommerce.v4mpu.mongodb.net/?retryWrites=true&w=majority&appName=ECommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err.message));

// Define schema
const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Define model
const User = mongoose.model("User", schema);

module.exports = User;
