const TELEGRAM_API = "https://api.telegram.org";
const HOMEPAGE_URL = "https://www.lawandpeople.co.kr/counsel";
const CONTENT_PREVIEW_LIMIT = 1000;

const stripHtml = (html) => {
    if (!html) return "";
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
};

const truncate = (text, max) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max)}...` : text;
};

const HEADERS = {
    create: "🆕 신규 상담 문의",
    update: "✏️ 상담 수정됨",
    delete: "🗑️ 상담 삭제됨",
};

const buildCounselMessage = (action, { category, title, name, phone, content, createdAt, updatedAt }) => {
    const body = truncate(stripHtml(content), CONTENT_PREVIEW_LIMIT);
    return [
        `${HEADERS[action] || HEADERS.create} [${category || "미분류"}]`,
        "",
        `👤 ${name || "-"}`,
        `📞 ${phone || "-"}`,
        `📝 ${title || "-"}`,
        `🕒 작성: ${createdAt || "-"}`,
        updatedAt ? `🕒 수정: ${updatedAt}` : null,
        "",
        "────────",
        body || "(내용 없음)",
        "────────",
        "",
        `🔗 ${HOMEPAGE_URL}`,
    ].filter((line) => line !== null).join("\n");
};

const send = async (action, counsel) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping notification");
        return;
    }

    try {
        const text = buildCounselMessage(action, {
            category: counsel.category,
            title: counsel.title,
            name: counsel.name,
            phone: counsel.phone,
            content: counsel.content,
            createdAt: counsel.createdAt,
            updatedAt: counsel.updatedAt,
        });

        const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[Telegram] notification failed:", response.status, errorText);
        }
    } catch (err) {
        console.error("[Telegram] notification error:", err.message);
    }
};

exports.sendCounselNotification = (counsel) => send("create", counsel);
exports.sendCounselActionNotification = (action, counsel) => send(action, counsel);
