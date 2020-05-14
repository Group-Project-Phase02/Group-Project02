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
// ==================================================
let updatedData = []
let questionId = 1

io.on("connection", (socket) => {

  socket.on("fetchQuestions", () => {
    socket.emit("fetchQuestions", questions);
  });

  socket.on("updateData", data => {
    updatedData.push(data)
    io.emit('updateData', updateData)
  })

  socket.on("nextQuestion", id => {
    let currentQuestion = index;
    let nextQuestion = currentQuestion + 1;
    io.emit("nextQuestion", nextQuestion);
  })
});

// ==================================================

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
