import socket from 'socket.io-client';

let socketInstance = null;


export const initializeSocket = (projectId) => {
    socketInstance = socket.connect('https://ai-chatconnect-backend.onrender.com', {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance;

}

export const reciveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb)
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data)
}

export const disconnectSocket = () => {
    if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
        console.log('Socket disconnected manually');
    }
};