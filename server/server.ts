import * as express from 'express'
import * as cors from 'cors'
import * as path from 'path';
import { Application } from "express";
import { getConfig } from './get-config';
import * as socketio from 'socket.io';
import { createServer } from 'http'
import { addUser, removeUser, getUsersInRoom, users } from './utils/user';

//npm install --save-dev ts-node nodemon cors
const port = process.env.PORT || 9000
const app: Application = express();
const server = createServer(app)
const io = socketio.listen(server)
const distDir = path.join(__dirname, "../dist/ngrx-tic-tac-toe");
app.use(cors())
app.use(express.static(distDir));

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })
        if (error) return callback(error)
        console.log(users)
        //Set the room
        socket.join(options.room.trim())
        const count = getUsersInRoom(user.room).length - 1
        //Notify user that they've joined
        socket.emit('onConnect', { action: null, message: `Welcome to the game, ${count == 0 ? "waiting on opponent" : "your opponent is waiting for you"}...` })

        //Notify other users of the player
        socket.to(user.room).emit("onConnect", { action: "reset", message: `${user.name} has joined...` })

        //Emit number of users in the room
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        console.log(users)
        io.to(user.room).emit("setTurn", ({ turn: users[0] }))
        callback()
    })

    socket.on('getDefaultPlayers', (callback) => {
        callback(getConfig())
    })

    socket.on('moveMade', (options, callback) => {
        //Set user turn
        const user = users.find(user => user.id == socket.id)
        io.to(user.room).emit("setTurn", ({ turn: users.filter(u => u.room == user.room).find(u => user.id != u.id) }))
        io.to(user.room).emit("recieveMove", (options))
        callback()
    })

    socket.on('leaveGame', () => {
        let user = removeUser(socket.id)
        if (user) {
            socket.to(user.room).emit('onConnect', { action: null, message: `${user.name} has left the game...` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })

    socket.on('disconnect', () => {
        let user = removeUser(socket.id)
        if (user) {
            socket.to(user.room).emit('onConnect', { action: null, message: `${user.name} has left the game...` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }
    })
})

server.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})
