const moment = require("moment");
const db = require("../models");

const { video : Video } = db;

// 게시판 CRUD

exports.create = async (req, res) => {
    const { title, url, keyword } = req.body
    const video = new Video({
        title,
        url,
        keyword,
        createdAt : moment().format("YYYY-MM-DD hh:mm:ss")
    })
    await video.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}

exports.read = async (req, res) => {
    await Video.findOne({ _id: req.params.video_id })
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}

exports.load = async (req, res) => {
    await Video.find({})
        .sort({"_id" : -1})
        // .sort("-createdAt")
        .then(result=>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.update = async (req, res) => {
    req.body.updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");

    Video.findOneAndUpdate({ _id: req.params.video_id }, req.body)
        .then(()=>{
            res.json({ message : "updated" })
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.delete = async (req, res) => {
    await Video.deleteOne({ _id: req.params.video_id })
        .then(()=>{
            res.status(204).end()
        })
        .catch((err)=>{
            res.json(err)
        })
}