const express = require('express');
const http = require('http');
const socketIoClient = require('socket.io-client');

const clientSocket = socketIoClient('http://localhost:3000'); // Renamed to clientSocket to avoid confusion
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    path: '/torquegenius'
});

app.use(express.json());

app.post('/api/v1/chatmessage/e9d35fab-ce40-40c8-b8bc-2972ee13f226', (req, res) => {
    const message = req.body.message;
    const chatbotId = req.body.chatbotId;
    io.emit('newMessage', { chatbotId, message });
    res.status(200).send({ success: true, message: 'Message received' });
});

io.on('connection', (serverSocket) => {  // Renamed to serverSocket to avoid confusion
    console.log('a user connected');

    serverSocket.on('sendMessage', ({ chatbotId, message }) => {
        const reply = "Some reply from your server";
        io.emit('newMessage', { chatbotId, message: { sender: 'Chatbot', text: reply, time: new Date().toLocaleTimeString() } });
    });

    serverSocket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

clientSocket.on('connect', () => {  // Using clientSocket here
    console.log('Connected to chatbot server');
});

clientSocket.on('chatbotMessage', (message) => {  // Using clientSocket here
    console.log('Received message:', message);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
