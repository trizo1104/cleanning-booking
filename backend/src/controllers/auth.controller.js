const generateToken = require("../lib/utils");
const User = require("../models/user");
const bycrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name)
      return res.status(400).json({ mess: "Fill all fields" });

    const checkEmailExist = await User.findOne({ email });
    if (checkEmailExist)
      return res.status(400).json({ mess: "Email is already exist" });
    if (password.length < 8)
      return res.status(400).json({ mess: "Password at least 8 characters" });

    const salt = await bycrypt.genSalt(10);
    const hashPass = await bycrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      role: "user",
      password: hashPass,
    });

    if (newUser) {
      generateToken(newUser._id, newUser.role, res);
      newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        name,
        email,
        role: newUser.role,
      });
    }
  } catch (error) {
    console.log("sign up error", error);
    return res.status(500).json({ mess: "internal server" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ mess: "Email or Password is wrong!" });

    const checkPass = await bycrypt.compare(password, user.password);

    if (!checkPass)
      return res.status(400).json({ mess: "Email or Password is wrong!" });

    generateToken(user._id, user.role, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      role: user.role,
    });
  } catch (error) {
    console.log("sign in error", error);
    return res.status(500).json({ mess: "internal server" });
  }
};

const signOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ mess: "Logout successfully!" });
  } catch (error) {
    console.log("logout error: ", error);
    return res.status(500).json({ mess: "Internal server" });
  }
};

const auth = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("auth error: ", error);
    return res.status(500).json({ mess: "Internal server" });
  }
};

module.exports = { signUp, signIn, signOut, auth };
