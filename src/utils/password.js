const crypto = require("crypto");

// 저장 형식: scrypt$<saltHex>$<hashHex>
const PREFIX = "scrypt$";
const KEYLEN = 64;

const hashPassword = (plain) => {
    const salt = crypto.randomBytes(16);
    const hash = crypto.scryptSync(String(plain ?? ""), salt, KEYLEN);
    return `${PREFIX}${salt.toString("hex")}$${hash.toString("hex")}`;
};

// 평문(plain)이 저장값(stored)과 일치하는지 확인.
// 기존 평문 비밀번호도 호환(레거시 fallback). 비교는 항상 timing-safe.
const verifyPassword = (plain, stored) => {
    if (typeof stored !== "string" || stored.length === 0) return false;
    const input = String(plain ?? "");

    if (stored.startsWith(PREFIX)) {
        const [, saltHex, hashHex] = stored.split("$");
        if (!saltHex || !hashHex) return false;
        let expected;
        try {
            expected = Buffer.from(hashHex, "hex");
        } catch {
            return false;
        }
        const actual = crypto.scryptSync(input, Buffer.from(saltHex, "hex"), expected.length);
        return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
    }

    // 레거시 평문 비교
    const a = Buffer.from(input);
    const b = Buffer.from(stored);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
};

const isHashed = (stored) => typeof stored === "string" && stored.startsWith(PREFIX);

module.exports = { hashPassword, verifyPassword, isHashed };
