const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    res.json({
      token,
      message: "Login Successful",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error",
    });
  }
});

module.exports = router;