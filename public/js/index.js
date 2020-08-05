

let socket = io();

socket.on('connect', function(){
    console.log('Connected to server')
    
})

//listen to a socket 
socket.on('newMessage', message => {
    console.log('newMessage', message)
})

socket.on('disconnect', function(){
    console.log('Disconnected from server')
})

