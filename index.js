const http = require("http");
const express = require("express");
const data = require("./data.json");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// app.use(express.json());
app.use(cors()); // Apply CORS middleware to the Express app

let duration = 0;
let url = "";
let query = "";
let groupID = "...";
let isPlay = false;

var extensionCode = "code";

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Send the data to the client

  socket.on("message", (data) => {
    duration = data["key"];
    url = data["url"];
    groupID = data["groupID"];
    isPlay = data["isPlay"];
    console.log(
      `message: ' + ${
        duration + "   " + url + "   " + groupID + "   " + isPlay
      }`
    );
    io.emit("message", {
      timer: duration,
      url: url,
      isPlay: isPlay,
      extensionCode: extensionCode
    });
  });

  socket.on("htmlCode", (data) => {
    extensionCode = data["extensionCode"];
    console.log(extensionCode);
  });

});

io.on("disconnect", (socket) => {
  console.log("user disconnected");
});

server.listen(8000, () => console.log("listening on *:3000"));
