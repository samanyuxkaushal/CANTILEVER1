const express = require('express');
const User = require('../models/user.model');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// --- Get Current User's Profile ---
// GET /api/users/me
// Protected: Yes
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user.id is available from the authMiddleware
    // .select('-password') excludes the password field from the result
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// --- Update User's Profile ---
// PUT /api/users/me
// Protected: Yes
router.put('/me', authMiddleware, async (req, res) => {
    const { name, bio } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        user.name = name || user.name;
        user.bio = bio || user.bio;

        await user.save();
        res.json({ message: 'Profile updated successfully.' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// --- Update User's Current Location ---
// POST /api/users/location
// Protected: Yes
router.post('/location', authMiddleware, async (req, res) => {
  const { longitude, latitude } = req.body;

  if (longitude === undefined || latitude === undefined) {
    return res.status(400).json({ message: 'Longitude and latitude are required.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.currentLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    await user.save();
    res.json({ message: 'Location updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// --- Get Nearby Users ---
// GET /api/users/nearby?lng=...&lat=...
// Protected: No (or Yes, depending on app logic)
router.get('/nearby', async (req, res) => {
    const { lng, lat } = req.query;
    const maxDistance = 50000; // 50 kilometers

    if (!lng || !lat) {
        return res.status(400).json({ message: 'Longitude and latitude query parameters are required.' });
    }

    try {
        const users = await User.find({
            currentLocation: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: maxDistance
                }
            }
        }).select('-password'); // Exclude sensitive data
        
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

