const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var fs = require('fs');

var users = 0
var grid = fs.readFileSync('Grid.json');
grid = JSON.parse(grid);

app.use(express.static(__dirname + '/public1'));
app.use(express.static(__dirname + '/client3.js'));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/info', (req, res) => {
    res.sendFile(__dirname + '/info.html');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    users++;
    io.emit('userUpdate', users);
    socket.emit('whole grid', grid);

    socket.on('box change', (msg) => {

        if (msg.x > 39 || msg.x < 0 || msg.y > 39 || msg.y < 0 || msg.color == '') {
            return 
        }
        if (Number.isInteger(Number(msg.x) == false){
            return
        }
        console.log(msg.x + ', ' + msg.y + ': ' + msg.color);
        grid.grid[msg.x][msg.y] = msg.color;
        

        io.emit('whole grid', grid);
    });
    socket.on('send message', (msg) => {
        if (msg.message !== '' && msg.username !== '') {
            io.emit('server send', msg);
        }
    });

    socket.on('disconnect', () => {
        users = users -1;
        io.emit('userUpdate', users);
    });

});

server.listen(80, () => {
    console.log('listening on *:80');
});
