// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],

    }
});

io.on('connection', (socket) => {
    console.log('A user connected : ', socket.id);

    // Listen for chat messages
    socket.on('chat message', (message) => {
        console.log('Message:', message);
        // Broadcast the message to all connected clients
        io.emit('chat message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});