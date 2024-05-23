// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./DB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stripe = require('stripe')

const jwtkey = "hello";

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error processing signup request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, jwtkey, { expiresIn: "5000h" });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error processing login request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/data', async (req, res) => {
  const cartItems = req.body.cartItems;
  console.log("Received cart items:", cartItems);

  try {
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity, // Ensure this is sent correctly from the frontend
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/dashboard', // Updated port to match your frontend
      cancel_url: 'http://localhost:5173/cancel',  // Updated port to match your frontend
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: 'Unable to create payment intent' });
  }
});

app.get('/verify', verifyToken, (req, res) => {
  res.json({ status: true, message: "Token is valid" });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, jwtkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
