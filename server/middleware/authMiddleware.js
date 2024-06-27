const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    // Pass the execution back to the controller back to main loop
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = authMiddleWare;