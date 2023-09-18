const { ErrorHandler } = require("../middlewares/error");
const user = require("../models/user");
let sendCookie = require("../utils/features");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email }).select("+password");
    if (!User) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }
    sendCookie(User, res, `Welcome back ${User.name}`, 201);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const User = await user.findOne({ email });
    if (User) {
      return next(new ErrorHandler("User is alerady Registered", 40));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    getID = await user.create({
      name,
      email,
      password: hashPassword,
    });

    sendCookie(getID, res, "Successfully registered.", 201);
  } catch (error) {
    next(error);
  }
};

const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    userDetial: req.User,
  });
};

const logout = (req, res) => {
  res
    .status(201)
    .cookie("token", null, {
      httpOnly: true,  
      expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure:process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message: "Logged out",
    });
};

module.exports = { login, register, getMyProfile, logout };
