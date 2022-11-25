const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    todos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Todo",
          index: true
        }
      ]
  })
);

module.exports = User;