const crypto = require("crypto");

// 관리자용 서명 토큰 (stateless HMAC). 비밀번호를 저장/전송하지 않기 위함.
// 서버 env ADMIN_TOKEN_SECRET 가 있어야 동작한다.
const SECRET = process.env.ADMIN_TOKEN_SECRET || "";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7일

const sign = (payloadB64) =>
    crypto.createHmac("sha256", SECRET).update(payloadB64).digest("base64url");

const issueToken = (id) => {
    if (!SECRET) return null;
    const payloadB64 = Buffer.from(JSON.stringify({ id, iat: Date.now() })).toString("base64url");
    return `${payloadB64}.${sign(payloadB64)}`;
};

// 유효하면 payload 객체, 아니면 null
const verifyToken = (token) => {
    if (!SECRET || typeof token !== "string") return null;
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;

    const expected = sign(payloadB64);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    let payload;
    try {
        payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    } catch {
        return null;
    }
    if (!payload || typeof payload.iat !== "number") return null;
    if (Date.now() - payload.iat > MAX_AGE_MS) return null;
    return payload;
};

// 요청에서 관리자 토큰 추출(Authorization 헤더 또는 body.token) 후 검증
const isAdminRequest = (req) => {
    const header = req.headers && req.headers.authorization;
    const fromHeader = header && header.startsWith("Bearer ") ? header.slice(7) : null;
    const token = fromHeader || (req.body && req.body.token);
    return verifyToken(token) !== null;
};

module.exports = { issueToken, verifyToken, isAdminRequest };
