const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
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

const logoutUser = async (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logout successful" });
};

// auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
