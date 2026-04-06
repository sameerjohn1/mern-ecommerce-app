const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = {
  registerUser,
};
