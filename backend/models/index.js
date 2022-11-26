const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * @description exported db object
 */
const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.todo = require('./todo.model');

module.exports = db;