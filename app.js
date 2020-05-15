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

  // ========
  // USERS
  // ========
  let users = [];
  socket.on("fetchUsers", (data) => {
    if (data) {
      users.push({
        name: data,
        score: 0,
      });
    }
    io.emit("fetchUsers", users);
  });

  socket.on("dashboardTogether", (data) => {
    socket.broadcast.emit("dashboardTogether", true);
  });

  socket.on("startTogether", (data) => {
    socket.broadcast.emit("startTogether", true);
  });

  socket.on("changePageTogether", (data) => {
    socket.broadcast.emit("changePageTogether", true);
  });

  socket.on("showResultTogether", (data) => {
    io.emit("showResultTogether", true);
  });

  socket.on("backToHomeTogether", (data) => {
    users = [];
    io.emit("backToHomeTogether", true);
  });
});

// ==================================================

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
