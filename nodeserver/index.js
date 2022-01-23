//node server which will handle socket io connection

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users= {};
io.on('connection',socket => {
    socket.on('new-user-joined' , name =>{ //new-user-joined is event listiner connect to js to get what you want
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    //if someone send , broadcast to everyone
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})