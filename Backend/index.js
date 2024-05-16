const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./DB");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtkey = "hello";
const cookieParser = require("cookie-parser");


app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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
    const token = jwt.sign({ userId: user._id }, jwtkey, { expiresIn: "2h" });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({ message: "Login successful" }); 
  } catch (error) {
    console.error("Error processing login request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to verify token
app.get('/verify', verifyToken, (req, res) => {
  res.json({ status: true, message: "Token is valid" });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.cookies.token;
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

// Add logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});