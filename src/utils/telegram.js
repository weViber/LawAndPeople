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

const buildCounselMessage = ({ category, title, name, phone, content, createdAt }) => {
    const body = truncate(stripHtml(content), CONTENT_PREVIEW_LIMIT);
    return [
        `🆕 신규 상담 문의 [${category || "미분류"}]`,
        "",
        `👤 ${name || "-"}`,
        `📞 ${phone || "-"}`,
        `📝 ${title || "-"}`,
        `🕒 ${createdAt || "-"}`,
        "",
        "────────",
        body || "(내용 없음)",
        "────────",
        "",
        `🔗 ${HOMEPAGE_URL}`,
    ].join("\n");
};

exports.sendCounselNotification = async (counsel) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping notification");
        return;
    }

    try {
        const text = buildCounselMessage({
            category: counsel.category,
            title: counsel.title,
            name: counsel.name,
            phone: counsel.phone,
            content: counsel.content,
            createdAt: counsel.createdAt,
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
