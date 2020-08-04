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
    console.log('A new User just connected')

    // when th user is disconnected
    socket.on('disconnect', () => {
        console.log('User was disconnected!!')
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


// the client side is going to be making the connect 
// the server side is going to be taking the cinnection and allowing them
// socket.io helps handle connectioin very easy
// socket.io doesnt work well with app.use 
// it works well with http server protocols
//