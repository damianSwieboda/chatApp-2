const express = require('express');
const http = require('http');
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
var qs = require('qs');
const { addUser, getUsersInRoom, getUser, removeUser } = require('./utils/users')
const { generateMessage, generateLocation } = require('./utils/messages')

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket)=> {
    // addUser()

    console.log('New Websocket connection')

    socket.emit('message', generateMessage("Admin", "Welcome"))

    socket.broadcast.emit('message', generateMessage("Admin", 'User has joined'))


    socket.on('message', (message, callback)=>{

       const filter = new Filter()

       if(filter.isProfane(message)){
            return callback('Profane language is not allowed')
       }

       io.emit('message',  generateMessage("USER", message))

       callback()
    })
    

    socket.on('disconnect', () => {
        io.emit('message',  generateMessage("Admin", 'User left'))
    })
})

server.listen(port, ()=>{ // ! ! ! SERVER.LISTEN
    console.log(`Server listening on port ${port}`)
})