import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../index.js";
import { generateAccessToken, generateRefreshToken, hashedPassword } from "../services/auth.services.js";

export const registerController = asyncHandler(async(req,res) => {
        const {username,email,name,password} = req.body;

        if (!username || !email || !name || !password) {
            throw new Error("All fields are required!");
        }
        
        const existingUser  = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:email},
                    {username:username}
                ]
            }
        })

        if(existingUser ) {
            throw new Error("User already exists");
        }

        const passwordHashed = await hashedPassword(password)

        const user = await prisma.user.create({
            data:{
                name,
                email,
                username,
                password: passwordHashed
            }
        });

        const accessToken = generateAccessToken(user.id,email)
        const refreshToken = generateRefreshToken(user.id,email)

        const userResponse = {
            id:user.id,
            name:user.name,
            username: user.username,
            email:user.email,
            createdAt: user.createdAt
        }

        res.json({
            message : "User Register successfully!!",
            status : 201,
            user: userResponse,
            accessToken,
            refreshToken
        }).status(201)

})