const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exists with the same email",
      });

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
