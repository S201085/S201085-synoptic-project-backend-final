const router = require('express').Router();
const User = require('../models/user.model');
// create user
router.route('/').post(async (req, res) => {
  const user = await User.find(req.query, {
    __v: 0,
  });
  return res.status(200).send(user);
});

module.exports = router;
