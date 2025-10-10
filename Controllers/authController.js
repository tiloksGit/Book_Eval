const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const handleAuth = asyncHandler(async (req, res) => {
  const {emailID, password } = req.body;

  //confirm data
  if (!emailID || !password) {
    return res.status(400).json({ message: " All fields are required" });
  }

  const user = await User.findOne({ emailID }).select("+password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }
  const match = await bcrypt.compare(password, user.password);


  if (!match) {
    return res.status(400).json({ message: "Invalid Username or Password" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: user.username,
        branch: user.branch,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    accessToken,
    id: user._id,
    username: user.username,
    refreshToken: process.env.REFRESH_TOKEN_SECRET,
  });
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.headers.token;
  if (!cookies?.jwt) return res.status(401).json({ message: "unauthorized" });

  const refreshToken = cookies;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return err.status(403).json({ message: "forbidden" });
      const user = await User.findOne({ username: req.username });

      if (!user) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
            branch: user.branch,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "300s" }
      );

      res.json({ accessToken });
    })
  );
});

// const logout = asyncHandler(async (req, res) => {
//   const cookies = req.cookies;
//   console.log(req.cookies);
//   if (!cookies?.jwt)
//     return res.sendStatus(400).json({ message: "jwt cookie not found" });
//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//   res.json({ message: "You are logged out" });
// });

const logout = asyncHandler((req, res) => {
  const headers = req.headers.token;
  if (!headers) {
    return res.status(204); // Send a non-JSON response
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
  res.status(200).json({ message: "You are logged out" });
});

module.exports = { handleAuth, refresh, logout };