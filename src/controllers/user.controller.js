const db = require("../models");
const { issueToken } = require("../utils/auth");

const { user : User } = db;


exports.signin = async (req, res) => {
    try {
        const { id, password } = req.body
        const result = await User.findOne({ id })
        if(!result){
            return res.json({message : "InvaildID"})
        }
        if(result.password !== password){
            return res.json({message : "InvaildPassword"})
        }
        // 비밀번호 등 민감 정보는 응답에서 제외하고 관리자 토큰을 발급
        return res.status(200).json({ message: "Success", token: issueToken(result.id) })
    } catch (err) {
        console.error("[user.signin]", err.message)
        return res.status(500).json({ message: "로그인에 실패했습니다." })
    }
}

