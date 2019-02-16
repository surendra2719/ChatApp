
import axios from 'axios';
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4000')

export function chatServices(data) {
    return axios('/getAllUsers',
        {
            method: "GET",
            data: data

        })
}

export function chatDisplay(Sender, Receiver, req) {
    // let request = {
    //     senderId: Sender,
    //     recieverId: Receiver,
    //     message: req
    // }
    // socket.emit("new_msg", request);
    // socket.on("emitMsg", (result) => {
    //     console.log("recieved data to services-->", result);
    // })
}
export function userChatArray(data) {
    return axios('/getAllChats', {
        method: "GET",
        data: data
    })
}