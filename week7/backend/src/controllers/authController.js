const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { validateEmail, validatePassword } = require("../utils/validators");

const registerUser = async (req, res, next) => {
  try {
    let { fullName, emailAddress, password } = req.body;

    emailAddress = emailAddress.trim().toLowerCase();
    fullName = fullName.trim();

    if (!fullName || !emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validateEmail(emailAddress)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters and include uppercase, lowercase and number."
      });
    }

    const existingUser = await User.findOne({ emailAddress });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      fullName,
      emailAddress,
      hashedPassword
    });

    return res.status(201).json({
      message: "User registered successfully",
      token: generateToken(createdUser._id),
      user: {
        id: createdUser._id,
        fullName: createdUser.fullName,
        emailAddress: createdUser.emailAddress
      }
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let { emailAddress, password } = req.body;

    emailAddress = emailAddress.trim().toLowerCase();

    if (!emailAddress || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validateEmail(emailAddress)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not registered. Please sign up first." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    return res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullName: user.fullName,
        emailAddress: user.emailAddress
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
