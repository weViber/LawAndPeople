const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.cases = require("./cases.model");
db.counsel = require("./counsel.model");
db.guide = require("./guide.model");
db.video = require("./video.model");
db.user = require("./user.model");

module.exports = db;