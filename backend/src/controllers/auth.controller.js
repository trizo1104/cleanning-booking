const generateToken = require("../lib/utils");
const User = require("../models/user");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { email, password, name, phone } = req.body;
  try {
    if (!email || !password || !name || !phone)
      return res.status(400).json({ mess: "Fill all fields" });
    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json({ mess: "Invalid phone number" });
    }
    const checkEmailExist = await User.findOne({ email });
    if (checkEmailExist)
      return res.status(400).json({ mess: "Email is already exist" });
    if (password.length < 8)
      return res.status(400).json({ mess: "Password at least 8 characters" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      role: "user",
      phone,
      password: hashPass,
    });

    if (newUser) {
      await newUser.save();

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

    const checkPass = await bcrypt.compare(password, user.password);

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

const signInforEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Employee.findOne({ email });

    if (!user || !["admin", "staff"].includes(user.role)) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const checkPass = await bcrypt.compare(password, user.password);

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

const signUpEmployee = async (req, res) => {
  const { email, password, name, phone, role } = req.body;

  try {
    if (!email || !password || !name || !phone) {
      return res.status(400).json({ mess: "Please fill all fields" });
    }

    // if (!["staff", "admin"].includes(role)) {
    //   return res.status(400).json({ mess: "Inavlid role" });
    // }

    const checkEmailExist = await Employee.findOne({ email });
    if (checkEmailExist) {
      return res.status(400).json({ mess: "Email exsit" });
    }

    if (password.length < 8) {
      return res.status(400).json({ mess: "Password at least 8 characters" });
    }

    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json({ mess: "Invalid phone number" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      name,
      email,
      phone,
      role: "staff",
      password: hashPass,
      status: "active",
    });

    await newEmployee.save();
    // generateToken(newEmployee._id, newEmployee.role, res);

    return res.status(201).json({
      _id: newEmployee._id,
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
    });
  } catch (error) {
    console.error("Sign up employee error:", error);
    return res.status(500).json({ mess: "Lỗi máy chủ" });
  }
};

const signOut = async (req, res) => {
  try {
    // res.cookie("jwt", "", { maxAge: 0 });
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
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

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log("auth error: ", error);
    return res.status(500).json({ mess: "Internal server" });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const users = await Employee.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log("auth error: ", error);
    return res.status(500).json({ mess: "Internal server" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted success" });
  } catch (error) {
    console.log("auth error: ", error);
    return res.status(500).json({ mess: "Internal server" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin account" });
    }

    await Employee.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete employee error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  auth,
  signInforEmployee,
  signUpEmployee,
  getAllUser,
  getAllEmployee,
  deleteUser,
  deleteEmployee,
};
