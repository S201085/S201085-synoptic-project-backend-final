const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Sighting = require('../models/sighting.model');

router.route('/').get(async (req, res) => {
  // Get all sightings by a user
  if (req.headers['x-access-token']) {
    const token = req.headers['x-access-token'];
    try {
      const decoded = jwt.verify(token, 'secret123');
      const decodedId = decoded.id;
      const userSightings = await Sighting.find({ userId: decodedId }).sort({ createdAt: -1 });
      return res.json(userSightings);
    } catch (error) {
      // eslint-disable-next-line no-console
      return res.json({ status: 'error', error: ' failed get request because of invalid token' });
    }
  }
  // Get specific sighting by Id
  if (req.headers['get-by']) {
    const requiredId = req.headers['get-by'];

    try {
      const requiredSightingData = await Sighting.find({
        _id: requiredId,
      });
      return res.json(requiredSightingData);
    } catch (error) {
    // eslint-disable-next-line no-console

      return res.json({ status: 'error', error: ' failed get required number of results' });
    }
  }
  // DELETE specific sighting by Id
  if (req.headers['delete-by']) {
    const requiredId = req.headers['delete-by'];

    try {
      const requiredSightingData = await Sighting.findByIdAndDelete(requiredId);
      return res.status(200).send({
        success: true,
        message: 'Sighting Deleted',
        sightingId: requiredSightingData,
      });
    } catch (error) {
      // eslint-disable-next-line no-console

      res.status(400).json({
        success: false,
        message: 'Failed to delete Sighting',
        errorMessage: error,
      });
    }
  }

  // Get specific number of sightings
  if (req.headers['number-required'] && !req.headers.visibility) {
    const requiredResults = req.headers['number-required'];
    try {
      const requiredSightings = await Sighting.find(req.query, {
        __v: 0,
      }).sort({ createdAt: -1 }).limit(requiredResults);
      return res.json(requiredSightings);
    } catch (error) {
      // eslint-disable-next-line no-console

      return res.json({ status: 'error', error: ' failed get required number of results' });
    }
  }

  // Fallback Get every sighting
  try {
    const allSightings = await Sighting.find(req.query, {
      __v: 0,
    }).sort({ createdAt: -1 });
    return res.json(allSightings);
  } catch (error) {
    // eslint-disable-next-line no-console

    return res.json({ status: 'error', error: ' failed get request because no sightings met request' });
  }
});

router.route('/recent').get(async (req, res) => {
// Get specific number of public sightings
  try {
    // eslint-disable-next-line max-len
    const requiredSightings = await Sighting.find({ visibility: 'everyone' }).sort({ createdAt: -1 }).limit(5);
    return res.json(requiredSightings);
  } catch (error) {
    // eslint-disable-next-line no-console

    return res.json({ status: 'error', error: ' failed get required number of results' });
  }
});

// Create a sighting
router.route('/').post(async (req, res) => {
  // eslint-disable-next-line no-console
  const token = req.headers['x-access-token'];
  try {
    const decoded = jwt.verify(token, 'secret123');
    const decodedId = decoded.id;
    const decodedUsername = decoded.username;
    const newSighting = new Sighting({
      userId: decodedId,
      username: decodedUsername,
      species: req.body.species,
      quantity: req.body.quantity,
      description: req.body.description,
      sightingType: req.body.sightingType,
      sightingDateTime: req.body.sightingDateTime,
      freedom: req.body.freedom,
      visibility: req.body.visibility,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      image: req.body.uploadedFile,
    });
    await newSighting.save();
    return res.json({ status: 'ok' });
  } catch (error) {
    // eslint-disable-next-line no-console
    return res.json(error);
  }
});
// update a sighting
router.route('/edit').post(async (req, res) => {
  try {
    await Sighting.findByIdAndUpdate(req.body.id, req.body);

    return res.json({ status: 'ok' });
  } catch (error) {
    return res.json({ status: 'error', error: 'failed post because of invalid token' });
  }
});
module.exports = router;
