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

// ==================================================

io.on("connection", (socket) => {
  console.log("a user connected");
});

// ==================================================

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
