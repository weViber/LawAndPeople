const moment = require("moment");
const mongoose = require("mongoose");
const db = require("../models");
const { isAdminRequest } = require("../utils/auth");

const { video: Video } = db;

const now = () => moment().format("YYYY-MM-DD HH:mm:ss");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const requireAdmin = (req, res) => {
    if (!isAdminRequest(req)) {
        res.status(401).json({ message: "관리자 권한이 필요합니다." });
        return false;
    }
    return true;
};

// 게시판 CRUD (관리자 전용 콘텐츠: 생성/수정/삭제는 관리자 토큰 필요)

exports.create = async (req, res) => {
    try {
        if (!requireAdmin(req, res)) return;
        const { title, url, keyword } = req.body;
        if (!title || !url || !keyword) {
            return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
        }
        const video = new Video({ title, url, keyword, createdAt: now() });
        await video.save();
        return res.status(201).json({ message: "Success", id: video._id });
    } catch (err) {
        console.error("[video.create]", err.message);
        return res.status(500).json({ message: "등록에 실패했습니다." });
    }
};

exports.read = async (req, res) => {
    try {
        if (!isValidId(req.params.video_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const result = await Video.findById(req.params.video_id);
        if (!result) return res.status(404).json({ message: "동영상을 찾을 수 없습니다." });
        return res.json(result);
    } catch (err) {
        console.error("[video.read]", err.message);
        return res.status(500).json({ message: "조회에 실패했습니다." });
    }
};

exports.load = async (req, res) => {
    try {
        const result = await Video.find({}).sort({ _id: -1 });
        return res.json(result);
    } catch (err) {
        console.error("[video.load]", err.message);
        return res.status(500).json({ message: "목록 조회에 실패했습니다." });
    }
};

exports.update = async (req, res) => {
    try {
        if (!requireAdmin(req, res)) return;
        if (!isValidId(req.params.video_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Video.findById(req.params.video_id);
        if (!doc) return res.status(404).json({ message: "동영상을 찾을 수 없습니다." });

        const { title, url, keyword } = req.body;
        if (title !== undefined) doc.title = title;
        if (url !== undefined) doc.url = url;
        if (keyword !== undefined) doc.keyword = keyword;
        doc.updatedAt = now();
        await doc.save();
        return res.json({ message: "updated" });
    } catch (err) {
        console.error("[video.update]", err.message);
        return res.status(500).json({ message: "수정에 실패했습니다." });
    }
};

exports.delete = async (req, res) => {
    try {
        if (!requireAdmin(req, res)) return;
        if (!isValidId(req.params.video_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Video.findById(req.params.video_id);
        if (!doc) return res.status(404).json({ message: "동영상을 찾을 수 없습니다." });
        await Video.deleteOne({ _id: doc._id });
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        console.error("[video.delete]", err.message);
        return res.status(500).json({ message: "삭제에 실패했습니다." });
    }
};
