// models/Settings.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    privacy: {
        lastSeen: { type: String, default: 'everyone' },
        profilePhoto: { type: String, default: 'everyone' }
    },
    notifications: {
        messages: { type: String, default: 'on' },
        groups: { type: String, default: 'on' }
    },
    security: {
        twoStepVerification: { type: Boolean, default: false },
        encryption: { type: Boolean, default: true }
    },
    appearance: {
        theme: { type: String, default: 'light' },
        fontSize: { type: String, default: 'medium' }
    },
    advanced: {
        backupFrequency: { type: String, default: 'daily' },
        dataUsage: { type: String, default: 'wifi' }
    }
});

module.exports = mongoose.model('Settings', settingsSchema);