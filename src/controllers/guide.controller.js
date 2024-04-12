const moment = require("moment");
const db = require("../models");

const { guide : Guide } = db;

// 게시판 CRUD

exports.create = async (req, res) => {
    const { category, title, content } = req.body
    const guide = new Guide({
        category,
        title,
        content,
        createdAt : moment().format("YYYY-MM-DD hh:mm:ss")
    })
    await guide.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}

exports.read = async (req, res) => {
    await Guide.findOne({ _id: req.params.guide_id })
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}

exports.load = async (req, res) => {
    await Guide.find({})
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

    Guide.findOneAndUpdate({ _id: req.params.guide_id }, req.body)
        .then(()=>{
            res.json({ message : "updated" })
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.delete = async (req, res) => {
    await Guide.deleteOne({ _id: req.params.guide_id })
        .then(()=>{
            res.status(204).end()
        })
        .catch((err)=>{
            res.json(err)
        })
}