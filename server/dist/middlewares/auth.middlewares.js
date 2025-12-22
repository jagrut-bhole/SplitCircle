import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";
export const jwtVerify = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies?.access_token;
        if (!accessToken) {
            return res.status(401).json({
                message: "Tokens not Found!! Please Login Again..",
            });
        }
        const decodeToken = (await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET));
        const user = await prisma.user.findUnique({
            where: {
                id: decodeToken.userId,
            },
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid access - User not found!!",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token Expired!!",
            });
        }
        if (error.name === "JSONWebTokenError") {
            return res.status(401).json({
                message: "Invalid Access Token!!",
            });
        }
        return res.status(401).json({
            message: "Authentication failed!!",
        });
    }
});
//# sourceMappingURL=auth.middlewares.js.map