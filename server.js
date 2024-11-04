// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./js/config/db');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./js/routes/auth'));
app.use('/api/users', require('./js/routes/users'));
app.use('/api/messages', require('./js/routes/messages'));
app.use('/api/settings', require('./js/routes/settings'));

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (userId) => {
        socket.join(userId);
    });

    socket.on('sendMessage', async (data) => {
        const { sender, receiver, content } = data;
        try {
            const message = new Message({
                sender,
                receiver,
                content
            });
            await message.save();
            io.to(receiver).emit('newMessage', message);
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
process.on('SIGINT', () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });