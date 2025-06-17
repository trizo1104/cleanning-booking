const User = require("../models/user");

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select(
      "name email"
    );
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy danh sách nhân viên" });
  }
};

module.exports = { getEmployees };
