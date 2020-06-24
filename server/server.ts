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

// Heroku will server all routes through what Angular configures
app.get('*', (req, res) => {
    res.sendFile(path.resolve(distDir, 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })
        if (error) return callback(error)
        //Set the room
        socket.join(user.room.trim())
        const count = getUsersInRoom(user.room).length - 1
        console.log(`[Join Game] ${user.name} has joined ${user.room}  (${count + 1}/2)`)

        //Notify user that they've joined
        socket.emit('onConnect', { action: null, message: count == 0 ? null : "Your opponent is waiting for you..." })

        //Notify other users of the player
        socket.to(user.room).emit("onConnect", { action: "reset", message: `${user.name} has joined...` })

        //Emit number of users in the room
        io.in(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        io.in(user.room).emit("setTurn", ({ turn: users.filter(userRef => userRef.room == user.room)[0] }))
        callback()
    })
    
    socket.on('moveMade', (options, callback) => {
        //Set user turn
        const user = users.find(user => user.id == socket.id)
        const opponent = users.find(u => u.room == user.room && u.id != user.id)
        if (user && opponent) {
            if (user.hasReset ^ opponent.hasReset) return callback('Opponent has not reset yet...')
            user.hasReset = false
            opponent.hasReset = false
            io.in(user.room).emit("setTurn", ({ turn: users.filter(u => u.room == user.room).find(u => user.id != u.id) }))
            io.in(user.room).emit("recieveMove", (options))
            return callback()
        }
        return callback("Move cannot be made, of the players is missing from the game...")
    })

    socket.on('whatRoom', (options, callback) => {
        const creator = users.find(user => user.room == options.room)
        if (!creator) return callback({ error: "Room has been closed" })
        socket.emit('recieveRoomInfo', { name: creator.room, type: creator.type, creator: creator.name })
    })

    socket.on('reset', (callback) => {
        const user = users.find(u => u.id == socket.id)
        user.hasReset = true
    })

    socket.on('leaveGame', () => {
        leaveGame(socket)
    })

    socket.on('disconnect', () => {
        leaveGame(socket)
    })
})

const leaveGame = (socket: SocketIO.Socket) => {
    const { error, user } = removeUser(socket.id)
    if (user) {
        socket.leave(user.room)
        const users = getUsersInRoom(user.room)
        const count = users.length - 1
        console.log(`[Leave Game] ${user.name} has left ${user.room}  (${count + 1}/2)`)

        socket.to(user.room).emit('onConnect', { action: null, message: `${user.name} has left the game...` })
        socket.to(user.room).emit('roomData', { room: user.room, users: users })
        const other = users.find(u => u.id != socket.id && u.room == user.room)
        if (other)
            other.hasReset = true
    }

}

server.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})
