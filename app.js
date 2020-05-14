"use strict";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const fs = require('fs')
const epxress = require("express");
const app = epxress();
const port = process.env.PORT || 3000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");
app.use(cors());

let questionData = JSON.parse(fs.readFileSync('./questions.json', 'utf8'))
// ==================================================

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('question-data', () => {
    socket.emit('question-data', questionData)
  })
});

// ==================================================

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
