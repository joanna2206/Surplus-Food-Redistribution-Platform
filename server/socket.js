let io;

const initSocket = (server) => {

    io = require("socket.io")(server, {

        cors: {

            origin: "http://localhost:5173",

            methods: ["GET", "POST"]

        }

    });

    io.on("connection", (socket) => {

        console.log("🟢 User Connected:", socket.id);

        // ===============================
        // Join Room
        // ===============================
        socket.on("join", (data) => {

            socket.join(data.userId);

            console.log(`${data.role} joined room ${data.userId}`);

        });

        socket.on("disconnect", () => {

            console.log("🔴 User Disconnected:", socket.id);

        });

    });

};

const getIO = () => {

    if (!io) {

        throw new Error("Socket.io not initialized!");

    }

    return io;

};

module.exports = {

    initSocket,

    getIO

};