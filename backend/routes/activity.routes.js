const express = require('express');
const Activity = require('../models/activity.model');
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/user.model');

const router = express.Router();

// --- Create a New Activity ---
// POST /api/activities
// Protected: Yes
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, activityType, location, activityTime, participantLimit } = req.body;

  try {
    const newActivity = new Activity({
      title,
      description,
      activityType,
      location,
      activityTime,
      participantLimit,
      createdBy: req.user.id,
      participants: [req.user.id], // Creator is the first participant
    });

    const activity = await newActivity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// --- Get Nearby Activities ---
// GET /api/activities/nearby?lng=...&lat=...
// Protected: No
router.get('/nearby', async (req, res) => {
    const { lng, lat } = req.query;
    const maxDistance = 50000; // 50 kilometers

    try {
        const activities = await Activity.find({
            "location.coordinates": {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: maxDistance
                }
            }
        }).populate('createdBy', 'name profilePicture'); // Populate creator info

        res.json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// --- Get a Single Activity by ID ---
// GET /api/activities/:id
// Protected: No
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('createdBy', 'name profilePicture')
      .populate('participants', 'name profilePicture'); // Get full participant details

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found.' });
    }
    res.json(activity);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// --- Join an Activity ---
// POST /api/activities/:id/join
// Protected: Yes
router.post('/:id/join', authMiddleware, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if (!activity) {
            return res.status(404).json({ msg: 'Activity not found' });
        }
        
        // Check if user is already a participant
        if (activity.participants.map(p => p.toString()).includes(req.user.id)) {
            return res.status(400).json({ msg: 'User already in this activity' });
        }

        activity.participants.push(req.user.id);
        await activity.save();

        res.json(activity.participants);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

