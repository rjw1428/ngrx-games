export const users = []

export const addUser = ({ id, name, room, symbol, color }) => {
    if (!name || !room) return { error: "Name and symbol are required" }
    name = name.trim()
    const exitingUser = users.find(user => user.room === room && user.id === id)
    if (exitingUser) return { error: "ID is already in use" }
    const user = { id, name, room, symbol, color }
    if (users.filter(user=>user.room == room).length>=2) return { error: "Room is full"}
    users.push(user)
    return { error: undefined, user }
}

export const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    return (index >= 0) ? users.splice(index, 1)[0] : { error: "User ID not found" }
}

export const getUser = (id) => {
    return users.find(user => user.id === id)
}

export const getUsersInRoom = (room) => {
    if (room) return users.filter(user => user.room === room.trim())
}
