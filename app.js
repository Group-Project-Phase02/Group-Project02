"use strict";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const epxress = require("express");
const app = epxress();
const port = process.env.PORT || 3000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");
app.use(cors());

const fs = require("fs");
let rawQuestions = fs.readFileSync("questions.json");
let questions = JSON.parse(rawQuestions);

const RoomController = require("./controllers/room");

// ==================================================

io.on("connection", (socket) => {
  // ========
  // ROOMS
  // ========
  socket.on("fetchRooms", function () {
    RoomController.findAll(function (err, rooms) {
      socket.emit("fetchRooms", rooms);
    });
  });

  socket.on("createRoom", function (roomData) {
    RoomController.create(roomData, function (err, createdRoom) {
      io.emit("room-created", createdRoom);
    });
  });

  // ========
  // QUESTION
  // ========
  socket.on("fetchQuestions", () => {
    socket.emit("fetchQuestions", questions);
  });

  socket.on("updateScore", (player, score) => {
    //
  });

  socket.on("nextQuestion", (index) => {
    let currentQuestion = index;
    let nextQuestion = currentQuestion + 1;
    io.emit("nextQuestion", nextQuestion);
  });
});

// ==================================================

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
