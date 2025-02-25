const express = require("express");
const bcrypt = require("bcrypt"); // bcrypt for password hashing
const User = require("../models/User");
const router = express.Router();

// POST route for creating a new user
router.post("/create", async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthdate } = req.body;
    if (!firstName || !lastName || !email || !password || !birthdate) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthdate,
    });

    await newUser.save(); // Save the user to the database
    res.status(201).json(newUser); // Respond with the newly created user
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Use bcrypt.compare correctly with await
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
});


module.exports = router;
