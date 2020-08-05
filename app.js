const path = require('path')
const express = require('express')

const ejs = require('ejs')
const socketIO = require('socket.io');
const http = require('http')

let app = express();
let server = http.createServer(app)
let io = socketIO(server);


const port = process.env.PORT || 3000;
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index')
})

// while listen for an event from the client or user
io.on('connection', socket => {
    console.log('A user is connected')

    socket.emit('newMessage', {
        from: 'Admin',
        to: 'welcome to the group chat',
        createAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getTime()
    })

    socket.on('createMessage', message => {
        console.log('createMessage', message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('user is disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


// socket is for sigular connections only 
// io is for general connectioin everyone connected


// the client side is going to be making the connect 
// the server side is going to be taking the cinnection and allowing them
// socket.io helps handle connectioin very easy
// socket.io doesnt work well with app.use 
// it works well with http server protocols
//