const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registration = async (req, res) => {
  const { firstname, lastname, email, password ,role} = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    res.status(200).json({ user,token, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  
  const { email, password } = req.body;

  if (!email || !password  ) {
    console.error("Missing data:", req.body);

    return res.status(400).json({user, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user, role: user.role });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registration, login, getUser };