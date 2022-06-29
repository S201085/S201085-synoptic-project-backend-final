const router = require('express').Router();
// const { emailValidator } = require('raysk-vali');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
// const SignUpController = require('../controllers/signup.controller');

// Genesis
router.route('/').post(async (req, res) => {
  // Create user

  try {
    const { username, email, password } = req.body;
    //   email validation
    // if (!emailValidator(email)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Email is not valid',
    //   });
    // }
    // create new user object and save to database
    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(12)),
    });
    try {
      await newUser.save();
      return res.status(200).json({
        success: true,
        status: 'User created successfully',
        user: newUser,
      });
    } catch (e) {
      if (e.keyPattern.username === 1) {
        return res.status(400).json({
          success: false,
          status: 'error',
          message: 'Username taken, please try another',
        });
      }
      if (e.keyPattern.email === 1) {
        return res.status(400).json({
          success: false,
          status: 'error',
          message: 'Account already exists with that email, please try another',
        });
      }
      return res.status(400).send(e);
    }
  } catch (err) {
    return err;
  }
});

module.exports = router;
