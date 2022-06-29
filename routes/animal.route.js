const router = require('express').Router();
const Animal = require('../models/animal.model');
// Get all animals
router.route('/').get(async (req, res) => {
  const animal = await Animal.find(req.query, {
    __v: 0,
  });
  return res.status(200).send(animal);
});

// Genesis
router.route('/').post(async (req, res) => {
  // Create new animal
  const newAnimal = new Animal({
    species: req.body.species,
    latinName: req.body.latinName,
    gender: req.body.gender,
  });
  await newAnimal.save();
  return res.status(200).send(newAnimal);
});

// Exodus
router.route('/:animalId').put(async (req, res) => {
  // Update Animal
  const { animalId } = req.params;
  const animal = await Animal.findByIdAndUpdate(animalId, req.body, { new: true });
  return res.status(200).send(animal);
});

// Leviticus
router.route('/:animalId').delete(async (req, res) => {
  // Delete Animal
  const { animalId } = req.params;
  const animal = await Animal.findByIdAndDelete(animalId);
  return res.status(200).send(animal);
});

module.exports = router;
