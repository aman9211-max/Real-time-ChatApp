
const socket = io();
let messageArea = document.querySelector('.message__area');

let Name;

let textarea = document.querySelector('#textarea');

do {
    Name = prompt('please enter your Name : ')
} while(!Name)
if(textarea)
    textarea.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            sendMessage(e.target.value);
        }
    })

function sendMessage(msg) {
    let message = {
        user : Name, 
        message : msg.trim()
    }
    //apppend message

    appendMessage(message, 'outgoing');


    //send to the server

    socket.emit('message', message);
}

function appendMessage(msg,type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markUp = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv);
    scrollToBottom();
    textarea.value = '';
}

socket.on('msg', (message) => {
    // console.log(message);
    appendMessage(message, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}