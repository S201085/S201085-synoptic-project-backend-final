const { emailValidator } = require('raysk-vali');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

async function signUp(req, res) {
  const { username, email, password } = req.body;
  //   email validation
  if (!emailValidator(email)) {
    return res.status(400).json({
      success: false,
      message: 'Email is not valid',
    });
  }
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
      message: 'User created successfully',
      user: newUser,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
}
module.exports = {
  signUp,
};
