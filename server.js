// server.js
const app = require('express')();
const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        // methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('A user connected : ', socket.id);

    // Listen for chat snippets
    socket.on('snippets', (snippet, room) => {
        // Broadcast the snippets to all connected members
        if (room == "") {
            io.emit('snippets', snippet);
        } else {
            // Broadcast the snippets to only room members
            socket.to(room).emit('snippets', snippet);
        }
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