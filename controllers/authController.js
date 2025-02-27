import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthdate } = req.body;

    if (!firstName || !lastName || !email || !password || !birthdate) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: "error" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email is already taken", status: "error" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthdate,
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      status: "success",
      data: { ...userData, token },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Error creating user", status: "error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", status: "error" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: "error" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", status: "error" });
    }

    const sessionToken = generateToken(user._id);
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      status: "success",
      data: { ...userData, sessionToken },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", status: "error" });
  }
};
