const moment = require("moment");
const db = require("../models");

const { counsel : Counsel } = db;

// 게시판 CRUD

exports.create = async (req, res) => {
    const { category, title, content, name, phone, password } = req.body
    const counsel = new Counsel({
        category,
        title,
        content,
        name,
        phone,
        password,
        createdAt : moment().format("YYYY-MM-DD hh:mm:ss")
    })
    await counsel.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}

exports.read = async (req, res) => {
    await Counsel.findOne({ _id: req.params.counsel_id })
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}

exports.load = async (req, res) => {
    await Counsel.find({})
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

    Counsel.findOneAndUpdate({ _id: req.params.counsel_id }, req.body)
        .then(()=>{
            res.json({ message : "updated" })
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.delete = async (req, res) => {
    await Counsel.deleteOne({ _id: req.params.counsel_id })
        .then(()=>{
            res.status(200).json({ message : "deleted" })
        })
        .catch((err)=>{
            res.json(err)
        })
}