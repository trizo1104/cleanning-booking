const jwt = require("jsonwebtoken");

const generateToken = (userId, role, res) => {
  const token = jwt.sign({ userId, role }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return token;
};

module.exports = generateToken;
