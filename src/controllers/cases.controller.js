const moment = require("moment");
const mongoose = require("mongoose");
const db = require("../models");
const { isAdminRequest } = require("../utils/auth");

const { cases: Case } = db;

const now = () => moment().format("YYYY-MM-DD HH:mm:ss");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const escapeRegex = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
        const { category, title, content } = req.body;
        if (!category || !title || !content) {
            return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
        }
        const cases = new Case({ category, title, content, createdAt: now() });
        await cases.save();
        return res.status(201).json({ message: "Success", id: cases._id });
    } catch (err) {
        console.error("[cases.create]", err.message);
        return res.status(500).json({ message: "등록에 실패했습니다." });
    }
};

exports.read = async (req, res) => {
    try {
        if (!isValidId(req.params.case_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const result = await Case.findById(req.params.case_id);
        if (!result) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        return res.json(result);
    } catch (err) {
        console.error("[cases.read]", err.message);
        return res.status(500).json({ message: "조회에 실패했습니다." });
    }
};

exports.load = async (req, res) => {
    try {
        const result = await Case.find({}).sort({ _id: -1 });
        return res.json(result);
    } catch (err) {
        console.error("[cases.load]", err.message);
        return res.status(500).json({ message: "목록 조회에 실패했습니다." });
    }
};

exports.update = async (req, res) => {
    try {
        if (!requireAdmin(req, res)) return;
        if (!isValidId(req.params.case_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Case.findById(req.params.case_id);
        if (!doc) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

        const { category, title, content } = req.body;
        if (category !== undefined) doc.category = category;
        if (title !== undefined) doc.title = title;
        if (content !== undefined) doc.content = content;
        doc.updatedAt = now();
        await doc.save();
        return res.json({ message: "updated" });
    } catch (err) {
        console.error("[cases.update]", err.message);
        return res.status(500).json({ message: "수정에 실패했습니다." });
    }
};

exports.delete = async (req, res) => {
    try {
        if (!requireAdmin(req, res)) return;
        if (!isValidId(req.params.case_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Case.findById(req.params.case_id);
        if (!doc) return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        await Case.deleteOne({ _id: doc._id });
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        console.error("[cases.delete]", err.message);
        return res.status(500).json({ message: "삭제에 실패했습니다." });
    }
};

exports.search = async (req, res) => {
    try {
        const { keyword } = req.body;
        const safe = escapeRegex(keyword || "");
        const option = {
            $or: [
                { title: { $regex: safe } },
                { content: { $regex: safe } },
                { category: { $regex: safe } },
            ],
        };
        const resultCase = await Case.find(option).sort({ _id: -1 });
        return res.status(200).json(resultCase);
    } catch (err) {
        console.error("[cases.search]", err.message);
        return res.status(500).json({ message: "검색에 실패했습니다." });
    }
};
