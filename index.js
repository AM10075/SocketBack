const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors())
app.get("/", (req, res) => {
  res.send("App GET");
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("Client Connected");
  client.on("message", (data) => {
    console.log(data);
    client.broadcast.emit("receiveMessage", data.message);
  });
  client.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("http://localhost:4000");
});
