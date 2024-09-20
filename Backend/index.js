// server.js
const express = require("express");
const app = express();
const cors = require("cors");
const Razorpay = require("razorpay");
require('dotenv').config();
const User = require("./DB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// rzp_test_mkAsXNhrplFsgo   id
// fRtZeCj5syEeBrJhGKvB3oAn   secret

const jwtkey = "hello";

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello");
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET ,
});

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
    const token = jwt.sign({ userId: user._id }, jwtkey, { expiresIn: "5h" });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error processing login request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/data", async (req, res) => {
  const cartItems = req.body.cartItems;
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  console.log("Received cart items:", cartItems);
  console.log("Total Price:", totalPrice);

  try {
    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: totalPrice * 100, // Convert amount to paise
      currency: "INR",
      receipt: "order_rcptid_" + Math.floor(Math.random() * 1000000),
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ error: "Unable to create order" });
  }
});

app.get("/verify", verifyToken, (req, res) => {
  res.json({ status: true, message: "Token is valid" });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, jwtkey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: false, message: "Failed to authenticate token" });
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
