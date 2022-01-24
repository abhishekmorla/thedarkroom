const socket = io('https://nameless-river-55706.herokuapp.com/');

const form = document.getElementById('send-container')

const messageInput = document.getElementById('messageinp')

const messageContainer = document.querySelector(".containerformiddleimg")



var audio1 = new Audio('ding.mp3')
var audio2 = new Audio('left.wav')

const append = (message , position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left')
    {
        audio1.play();
    }
    else if (position == 'center')
    {
        audio2.play();
    }

}


const names = prompt("Enter your name to join");

socket.emit('new-user-joined' , names);

//if new user join , receieve from server
socket.on('user-joined' , names => {
    append(`${names} joined the chat`, 'center')
})

//if server send message , receive it
socket.on('receive' , data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left' , name => {
    append(`${name} left the chat`, 'center')
})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}` , 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
