const router = require('express').Router();
const Admin = require('../models/admin.model');
// Get all animals
router.route('/').get(async (req, res) => {
  const admin = await Admin.find(req.query, {
    __v: 0,
  });
  return res.status(200).send(admin);
});

module.exports = router;
