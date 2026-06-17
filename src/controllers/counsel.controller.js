const moment = require("moment");
const mongoose = require("mongoose");
const db = require("../models");
const telegram = require("../utils/telegram");
const { hashPassword, verifyPassword } = require("../utils/password");
const { isAdminRequest } = require("../utils/auth");

const { counsel: Counsel } = db;

const now = () => moment().format("YYYY-MM-DD HH:mm:ss");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);
const PUBLIC = "-password"; // 응답에서 비밀번호 제외

// 게시판 CRUD

exports.create = async (req, res) => {
    try {
        const { category, title, content, name, phone, password } = req.body;
        if (!category || !title || !content || !name || !phone || !password) {
            return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
        }

        const counsel = new Counsel({
            category,
            title,
            content,
            name,
            phone,
            password: hashPassword(password),
            createdAt: now(),
        });
        await counsel.save();
        await telegram.sendCounselNotification(counsel);

        return res.status(201).json({ message: "Success", id: counsel._id });
    } catch (err) {
        console.error("[counsel.create]", err.message);
        return res.status(500).json({ message: "상담 등록에 실패했습니다." });
    }
};

exports.read = async (req, res) => {
    try {
        if (!isValidId(req.params.counsel_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const result = await Counsel.findById(req.params.counsel_id).select(PUBLIC);
        if (!result) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }
        return res.json(result);
    } catch (err) {
        console.error("[counsel.read]", err.message);
        return res.status(500).json({ message: "조회에 실패했습니다." });
    }
};

exports.load = async (req, res) => {
    try {
        const result = await Counsel.find({}).select(PUBLIC).sort({ _id: -1 });
        return res.json(result);
    } catch (err) {
        console.error("[counsel.load]", err.message);
        return res.status(500).json({ message: "목록 조회에 실패했습니다." });
    }
};

// 비밀번호 확인(수정/삭제 진입 전 게이트). 관리자 토큰이면 통과.
exports.verify = async (req, res) => {
    try {
        if (!isValidId(req.params.counsel_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Counsel.findById(req.params.counsel_id);
        if (!doc) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }
        if (isAdminRequest(req) || verifyPassword(req.body && req.body.password, doc.password)) {
            return res.json({ ok: true });
        }
        return res.status(403).json({ ok: false, message: "비밀번호가 일치하지 않습니다." });
    } catch (err) {
        console.error("[counsel.verify]", err.message);
        return res.status(500).json({ message: "확인에 실패했습니다." });
    }
};

exports.update = async (req, res) => {
    try {
        if (!isValidId(req.params.counsel_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Counsel.findById(req.params.counsel_id);
        if (!doc) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }
        if (!isAdminRequest(req) && !verifyPassword(req.body && req.body.password, doc.password)) {
            return res.status(403).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        // 수정 허용 필드 화이트리스트 (password/createdAt 등은 변경 불가)
        const { category, title, content, name, phone } = req.body;
        if (category !== undefined) doc.category = category;
        if (title !== undefined) doc.title = title;
        if (content !== undefined) doc.content = content;
        if (name !== undefined) doc.name = name;
        if (phone !== undefined) doc.phone = phone;
        doc.updatedAt = now();

        await doc.save(); // 스키마 validator 실행
        await telegram.sendCounselActionNotification("update", doc);

        const safe = doc.toObject();
        delete safe.password;
        return res.json({ message: "updated", counsel: safe });
    } catch (err) {
        console.error("[counsel.update]", err.message);
        return res.status(500).json({ message: "수정에 실패했습니다." });
    }
};

exports.delete = async (req, res) => {
    try {
        if (!isValidId(req.params.counsel_id)) {
            return res.status(400).json({ message: "잘못된 요청입니다." });
        }
        const doc = await Counsel.findById(req.params.counsel_id);
        if (!doc) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }
        const password = req.body && req.body.password;
        if (!isAdminRequest(req) && !verifyPassword(password, doc.password)) {
            return res.status(403).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        await Counsel.deleteOne({ _id: doc._id });
        await telegram.sendCounselActionNotification("delete", doc);

        return res.status(200).json({ message: "deleted" });
    } catch (err) {
        console.error("[counsel.delete]", err.message);
        return res.status(500).json({ message: "삭제에 실패했습니다." });
    }
};
