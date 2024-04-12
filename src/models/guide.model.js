const mongoose = require("mongoose");
const moment = require("moment");

const guideSchema = new mongoose.Schema({
    category : { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, default: moment().format("YYYY-MM-DD hh:mm:ss") },
    updatedAt: { type: String },
})

const Guide = mongoose.model("guide", guideSchema);

module.exports = Guide;