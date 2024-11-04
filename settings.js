// routes/settings.js
const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

// Get settings by user ID
router.get('/:userId', auth, async (req, res) => {
    try {
        const settings = await Settings.findOne({ userId: req.params.userId });
        if (!settings) {
            return res.status(404).json({ msg: 'Settings not found' });
        }
        res.json(settings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update settings
router.put('/:userId', auth, async (req, res) => {
    try {
        const settings = await Settings.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
        res.json(settings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;