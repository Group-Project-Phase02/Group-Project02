const { Room } = require("../models");

class RoomController {
  static findAll(cb) {
    Room.findAll({
      order: [["id", "ASC"]],
    })
      .then((rooms) => {
        cb(null, rooms);
      })
      .catch((err) => {
        cb(err);
      });
  }

  static create(roomName, cb) {
    let values = {
      name: roomName,
    };

    Room.create(values)
      .then((createdRoom) => {
        cb(null, createdRoom.dataValues);
      })
      .catch((err) => {
        cb(err);
      });
  }
}

module.exports = RoomController;
