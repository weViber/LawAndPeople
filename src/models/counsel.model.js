const mongoose = require("mongoose");
const moment = require("moment");

const counselSchema = new mongoose.Schema({
    category : { type: String, required: true },
    title: { type: String, required: true },
    name : { type: String, required: true },
    phone : { type: String, required: true },
    password : { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, default: moment().format("YYYY-MM-DD hh:mm:ss") },
    updatedAt: { type: String },
})

const Counsel = mongoose.model("counsel", counselSchema);

module.exports = Counsel;