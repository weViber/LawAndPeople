const mongoose = require("mongoose");
const moment = require("moment");

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    keyword: { type: String, required: true },
    createdAt: { type: String, default: moment().format("YYYY-MM-DD hh:mm:ss") },
    updatedAt: { type: String },
})

const Video = mongoose.model("video", videoSchema);

module.exports = Video;