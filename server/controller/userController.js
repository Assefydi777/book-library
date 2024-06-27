// db connection
const dbConnection = require("../db/dbConfig.js");

// Encryption package
const argon2 = require("argon2");

// Status codes like 200, 301, 400 and 500
const { StatusCodes } = require("http-status-codes");

// JWT package
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  try {
    // Check if User is already registered
    const userQuery =
      "SELECT user_name FROM users WHERE user_name = $1 OR email = $2";
    const { rows: user } = await dbConnection.query(userQuery, [
      username,
      email,
    ]);
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already exists" });
    }

    // Check if password is strong
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    // Encrypt password before storing
    const hashedPassword = await argon2.hash(password);

    // Register User
    const insertQuery = `
      INSERT INTO users (user_name, first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`;
    const { rows: result } = await dbConnection.query(insertQuery, [
      username,
      firstname,
      lastname,
      email,
      hashedPassword,
    ]);

    const userId = result[0].id;

    const userCreatedQuery =
      "SELECT user_name, first_name, id FROM users WHERE id = $1";
    const { rows: userCreated } = await dbConnection.query(userCreatedQuery, [
      userId,
    ]);
    console.log("User Created: ", userCreated);

    res.status(StatusCodes.CREATED).json({
      msg: "User created",
      username: userCreated[0].user_name,
      id: userCreated[0].id,
      firstname: userCreated[0].first_name,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal error, something went wrong, try again later!",
      err: error,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields" });
  }

  try {
    // Check if User email is found
    const userQuery =
      "SELECT user_name, first_name, id, password FROM users WHERE email = $1";
    const { rows: user } = await dbConnection.query(userQuery, [email]);

    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Credential" });
    }

    // Compare the password
    const isPasswordMatching = await argon2.verify(user[0].password, password);

    // If password not matching
    if (!isPasswordMatching) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid Credential" });
    }

    // On success sign the JWT
    const { user_name, id, first_name } = user[0];
    const token = jwt.sign({ user_name, id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(StatusCodes.OK).json({
      msg: "User login successful",
      id,
      user_name,
      first_name,
      token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal error, something went wrong, try again later!",
      err: error,
    });
  }
}

module.exports = { register, login };
