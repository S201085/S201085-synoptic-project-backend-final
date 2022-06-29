const router = require('express').Router();
const Survey = require('../models/survey.model');
// Get all animals
router.route('/').get(async (req, res) => {
  const survey = await Survey.find(req.query, {
    __v: 0,
  });
  return res.status(200).send(survey);
});

module.exports = router;
