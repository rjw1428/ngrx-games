export const users = []

export const addUser = ({ id, name, type, symbol, color, room }) => {
    if (!room) room = makeRoomId(5)
    if (!name || !type) return { error: "Name and type are required" }
    name = name.trim()
    const exitingUser = users.find(user => user.room === room && user.type == type && user.id === id)
    if (exitingUser) return { error: "Name is already in use, please try again" }

    const user = { id, name, room, symbol, color, type, hasReset: true }
    if (users.filter(user => user.room == room && user.type == user.t).length >= 2) return { error: "Room is full" }
    users.push(user)
    return { error: undefined, user }
}

export const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    return (index >= 0) ? {error: undefined, user: users.splice(index, 1)[0]} : { error: "User ID not found", user: undefined }
}

export const getUser = (id) => {
    return users.find(user => user.id === id)
}

export const getUsersInRoom = (room) => {
    if (room) return users.filter(user => user.room === room.trim())
}

function makeRoomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
