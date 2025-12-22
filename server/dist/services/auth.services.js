import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function hashedPassword(password) {
    return await bcrypt.hash(password, 10);
}
export async function isPasswordCorrect(password, passwordHashed) {
    return await bcrypt.compare(password, passwordHashed);
}
export function generateAccessToken(userId, email) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiry = process.env.ACCESS_TOKEN_EXPIRY;
    if (!secret || !expiry) {
        throw new Error("Access token or expiry not defined!!1");
    }
    //@ts-ignore
    return jwt.sign({
        userId,
        email,
    }, secret, {
        expiresIn: expiry,
    });
}
export function generateRefreshToken(userId, email) {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiry = process.env.REFRESH_TOKEN_EXPIRY;
    if (!expiry || !secret) {
        throw new Error("Refresh token or expiry not defined!!");
    }
    //@ts-ignore
    return jwt.sign({
        userId,
        email,
    }, secret, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
}
//# sourceMappingURL=auth.services.js.map