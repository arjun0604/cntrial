// routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all messages
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().populate('sender', '-password').populate('receiver', '-password');
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get messages by sender and receiver
router.get('/:senderId/:receiverId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.params.senderId, receiver: req.params.receiverId },
                { sender: req.params.receiverId, receiver: req.params.senderId }
            ]
        }).populate('sender', '-password').populate('receiver', '-password');
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Send message
router.post('/', auth, async (req, res) => {
    try {
        const { sender, receiver, content } = req.body;
        const message = new Message({
            sender,
            receiver,
            content
        });
        await message.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;