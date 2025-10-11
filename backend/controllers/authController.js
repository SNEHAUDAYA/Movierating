const validator = require('validator');
const userModel = require('../models/User');

// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required." });
        }

        name = name.trim();
        email = email.trim().toLowerCase();
        password = password.trim();

        if (name.length < 3 || name.length > 30) {
            return res.status(400).json({ success: false, message: "Name should be 3 to 30 characters." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email." });
        }

        if (password.length < 8 || password.length > 25) {
            return res.status(400).json({ success: false, message: "Password should be 8 to 25 characters." });
        }

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        // Save user (pre-save hook will hash password)
        const newUser = new userModel({
            username: name,
            email,
            password,
        });
        const user = await newUser.save();

        // Generate JWT token
        const token = user.getSignedJwtToken();

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin },
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        email = email.trim().toLowerCase();
        password = password.trim();

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email." });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        // Compare hashed password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

module.exports = { registerUser, loginUser };
