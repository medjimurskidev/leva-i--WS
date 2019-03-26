const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
});

app.post('/messages', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {
    console.log('user connected')
    console.log(socket.client.id)

    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});

http.listen(3000, function () {
    console.log('listening on *:3000');
});