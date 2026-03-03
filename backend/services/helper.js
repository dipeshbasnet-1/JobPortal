const crypto = require("crypto");

function generateUniqueId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateHmacSha256Hash(data, secret) {
    if (!data || !secret) throw new Error("Both data and secret are required");
    return crypto.createHmac("sha256", secret).update(data).digest("base64");
}

module.exports = { generateUniqueId, generateHmacSha256Hash };