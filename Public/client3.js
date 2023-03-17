var socket = io();
var color = 'black'
for (var y = 0; y < 40; y++) {

    for (var x = 0; x < 40; x++) {
        let box = document.createElement('button');
        box.setAttribute('type', 'button');
        box.setAttribute('onclick', 'onPress('+x+','+y+')');
        box.setAttribute('class', 'box');
        box.setAttribute('id', 'box' + x + ',' + y);
        document.getElementById('Game').append(box);
    }
}

function onPress(x, y) {
    document.getElementById('box' + x + ',' + y).style.background = color;
    socket.emit('box change', {'x': x, 'y': y, 'color': color});
}
function changeColor(colorChange) {
    
    color = colorChange
    document.getElementById('colorSelectColor').style.background = color;
}
function changeCustomColor(boxnum) {
    var colorhex = document.getElementById('hextext').value;
    var box = document.getElementById('customBox' + boxnum);
    box.style.background = colorhex;
    box.onclick = function (){ changeColor(colorhex); };
}
function sendMessage() {
    var username = document.getElementById('username').value;
    var chatinput = document.getElementById('chattext');
    var message = chatinput.value;
    chatinput.value = '';
    socket.emit('send message', {'username': username, 'message': message});
}

socket.on('whole grid', function (msg) {
    for (var y = 0; y < 40; y++) {
        for (var x = 0; x < 40; x++) {
            document.getElementById('box' + x + ',' + y).style.background = String(msg.grid[x][y]);
        }
    }
});

socket.on('userUpdate', function (users) {
    document.getElementById("liveUsers").innerHTML = "Users Live: " + users;
});

socket.on('server send', function (msg) {
    var message = document.createElement('div');
    message.setAttribute('class', 'message');
    var user = document.createElement('b');
    user.setAttribute('id', 'cool');
    user.append(msg.username + ': ');
    message.append(user);
    message.append(msg.message);
    document.getElementById('chat').prepend(message);
});

