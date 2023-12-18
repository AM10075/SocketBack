import http from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
app.get("/", (req,res)=>{
    res.send("App GET")
})
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (client) => {
  console.log("Client Connected");
  client.on("message", (data) => {
    console.log(data)
    client.broadcast.emit("receiveMessage", data.message)
  });
  client.on("disconnect", () => {
    console.log("Client Disconnected")
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT,()=>{
    console.log("http://localhost:4000")
});
