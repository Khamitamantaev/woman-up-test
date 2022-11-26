const mongoose = require("mongoose");

/**
 * @description Todo model
 */
const Todo = mongoose.model(
    'Todo',
    new mongoose.Schema({
        name: {
            type: String,
        },
        done: {
            type: Boolean,
        }
    }, { timestamps: true})
);


module.exports = Todo;