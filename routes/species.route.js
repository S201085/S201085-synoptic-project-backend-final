const router = require('express').Router();
const Species = require('../models/species.model');
// Get all species
router.route('/').get(async (req, res) => {
  const species = await Species.find(req.query, {
    __v: 0,
  });
  return res.status(200).send(species);
});

// Genesis
router.route('/').post(async (req, res) => {
  // Create new species
  const newSpecies = new Species({
    common_name: req.body.common_name,
    latin_name: req.body.latin_name,
    image: req.body.image,
    description: req.body.description,
  });
  await newSpecies.save();
  return res.status(200).send(newSpecies);
});

// Exodus
router.route('/:speciesId').put(async (req, res) => {
  // Update Species
  const { speciesId } = req.params;
  const species = await Species.findByIdAndUpdate(speciesId, req.body, { new: true });
  return res.status(200).send(species);
});

// Leviticus
router.route('/:speciesId').delete(async (req, res) => {
  // Delete Species
  const { speciesId } = req.params;
  const species = await Species.findByIdAndDelete(speciesId);
  return res.status(200).send(species);
});

module.exports = router;
