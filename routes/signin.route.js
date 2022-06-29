/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// const SignInController = require('../controllers/signin.controller');

router.route('/').post(async (req, res) => {
  // Create user
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      status: 'error',
      message: 'Incorrect Email or Password',
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      'secret123',
    );

    return res.json({ status: 'ok', user: token });
  }
  return res.status(400).json({
    success: false,
    status: 'error',
    message: 'Incorrect Email or Password',
  });
});

module.exports = router;
