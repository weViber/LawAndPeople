const db = require("../models");

const { cases : Case, counsel : Counsel, guide : Guide, video : Video } = db;

// 게시판 CRUD

exports.search = async (req, res) => {
    const { keyword }= req.body
    const option = { $or: [{ "title": { $regex:keyword } }, { "content": { $regex: keyword} }, { "category": { $regex: keyword} }]}
    const resultCase = await Case.find(option).sort({"_id" : -1})
    const resultCounsel = await Counsel.find(option).sort({"_id" : -1})
    const resultGuide = await Guide.find(option).sort({"_id" : -1})
    const resultVideo = await Video.find(option).sort({"_id" : -1})

    res.json({ 
        resultCase, 
        resultCounsel, 
        resultGuide, 
        resultVideo
    })
}
