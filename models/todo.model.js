const mongoose = require("mongoose");
const Todo = mongoose.model(
    'Todo',
    new mongoose.Schema({
        name: {
            type: String,
        },
        done: {
            type: Boolean,
        },
    })
);


module.exports = Todo;