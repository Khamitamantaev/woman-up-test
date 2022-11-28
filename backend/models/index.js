const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoosePaginate = require('mongoose-paginate-v2');
/**
 * @description exported db object
 */
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.todo = require("./todo.model")(mongoose, mongoosePaginate);

module.exports = db;