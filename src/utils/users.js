const users = [];

const addUser = (name, room, id) => {
    name.trim()
    room.trim().toLowerCase()

    const usersInProvidedRoom = users.filter((user)=> user.room === room )

    const isNameAlreadyExistInRoom = usersInProvidedRoom.find((user)=>{
        return user.name === name || user.name.toLowerCase() === name.toLowerCase()
    })

    if(isNameAlreadyExistInRoom){
        return { error: "Chose another name"}
    }

    const user = {name, room, id}
    users.push(user)
    return user
}

const getUsersInRoom = (room) => {
    room.trim().toLowerCase()
    return users.filter((user)=> user.room === room)
}

const getUser = (id) => {
    return users.filter((user)=>{return user.id === id})
}

const removeUser = (id) => {
    const indexOfUser = users.findIndex((user)=> user.id == id)
    if(indexOfUser !== -1){
        return users.splice(indexOfUser, 1)[0]
    }
}

module.exports = {
    addUser,
    getUsersInRoom,
    getUser,
    removeUser
}