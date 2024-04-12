const moment = require("moment");
const db = require("../models");

const { cases : Case } = db;

// 게시판 CRUD

exports.create = async (req, res) => {
    const { category, title, content } = req.body
    const cases = new Case({
        category,
        title,
        content,
        createdAt : moment().format("YYYY-MM-DD hh:mm:ss")
    })
    await cases.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}

exports.read = async (req, res) => {
    await Case.findOne({ _id: req.params.case_id })
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}

exports.load = async (req, res) => {
    await Case.find({})
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
    Case.findOneAndUpdate({ _id: req.params.case_id }, req.body)
        .then(()=>{
            res.status(200).json({ message : "updated" })
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.delete = async (req, res) => {
    await Case.deleteOne({ _id: req.params.case_id })
        .then(()=>{
            res.status(200).json({ message : "Success"})
            // res.status(204).end()
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.search = async (req, res) => {
    const { keyword }= req.body
    const option = { $or: [{ "title": { $regex:keyword } }, { "content": { $regex: keyword} }, { "category": { $regex: keyword} }]}
    const resultCase = await Case.find(option).sort({"_id" : -1})
    res.status(200).json(resultCase)
}