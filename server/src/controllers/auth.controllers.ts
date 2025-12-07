import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { prisma } from "../index.js";
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken, hashedPassword, isPasswordCorrect } from "../services/auth.services.js";
import { JWTpayload } from "../types/auth.types.js";

const options = {
    httpOnly:true,
    secure:true
}

import { EmailServices } from "../services/email.services.js";
const emailService = new EmailServices();

export const registerController = asyncHandler(async(req:Request,res:Response) => {

        // 1. Get data from req.body
        // 2. Validate: check if user already exists
        // 3. Hash password
        // 4. Create user in database
        // 5. Generate tokens
        // 6. Send response
        
        try {
            const {username,email,name,password} = req.body as {
                username?:string,
                email?:string,
                name?:string,
                password?:string
            };
    
            if (!username || !email || !name || !password) {
                throw new Error("All fields are required!");
            }
            
            const existingUser  = await prisma.user.findFirst({
                where:{
                    OR:[
                        {email},
                        {username}
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

            await emailService.sendWelcomeEmail(
                user.name,
                user.email,
                user.username
            )
    
            const accessToken = generateAccessToken(user.id,email)
            const refreshToken = generateRefreshToken(user.id,email)
    
            const userResponse = {
                id:user.id,
                name:user.name,
                username: user.username,
                email:user.email,
                createdAt: user.createdAt
            }
    
    
            res.cookie('refresh_token',refreshToken,options);
            res.cookie('access_token',accessToken,options);
    
            res.json({
                message : "User Register successfully!!",
                status : 201,
                user: userResponse,
            }).status(201)
        } catch (error) {
         return res.status(500).json({
            message: "Server error while user registration, please try again"
         })   
        }
    
})

export const loginController = asyncHandler( async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body;

        if(!email || !password) {
            throw new Error("Please provide the credentials!!");
        }

        const userCheck = await prisma.user.findFirst({
            where:{email:email}
        })

        if(!userCheck){
           return res.status(401).json({
            message:"User does not exists!!",
            status:401
           })
        }

        const passwordCheck = await isPasswordCorrect(password,userCheck.password)

        if (!passwordCheck) {
            return res.status(401).json({
                message: "Invalid Password!!",
                status: 401
            })
        }

        const accessToken = generateAccessToken(userCheck.id,userCheck.email);
        const refreshToken = generateRefreshToken(userCheck.id,userCheck.email);

        const userResponse = {
            id:userCheck.id,
            email:userCheck.email,
            username:userCheck.username,
            name:userCheck.name,
            createdAt:userCheck.createdAt,
        }

        res.cookie('refresh_token',refreshToken,options); 
        res.cookie('access_token',accessToken,options);

        res.status(200).json({
            message:"User Login Successfully!!",
            statusCode:200,
            user:userResponse
        });
    } catch (error: any) {
        console.log("Error: ", error.message);
        return res.status(500).json({
            message: "Error while user LoggedIn",
            error: error.message,
            statusCode: 500
        });
    }
});

export const refreshAccesssToken = asyncHandler(async(req:Request,res:Response) => {
        // 1. Get refreshToken from req.body
        // 2. Verify refresh token
        // 3. Extract userId from decoded token
        // 4. Find user in database
        // 5. Generate new access token
        // 6. Send response
    try{

    const incomingToken = req.cookies?.refresh_token || req.body.refresh_token;

    if (!incomingToken) {
        return res.status(401).json(
            {
                message:"Refresh Token not provided!!"
            }
        )
    }

    const decodeToken = await jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET as string) as JWTpayload;

    if (!decodeToken) {
        res.status(401).json(
            {
                message: "Invalid Refresh Token!!"
            }
        )
    }

    const user = await prisma.user.findFirst({
        where: {
            id:decodeToken.userId
        }
    })

    if(!user) {
        return res.status(401).json(
            {
                message:"User Not Found!! - Invalid Refresh Token!!"
            }
        )
    }

    const newAccessToken = generateAccessToken(user.id,user.email);
    const newRefreshToken = generateRefreshToken(user.id,user.email);

    res.status(200).json(
        {
            message: "Tokens Refreshed Successfully!!",
            access_token: newAccessToken,
            refresh_token:newRefreshToken
        }
    )

    } catch(error:any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token Expired!! - please login again.."
            })
        }

        if(error.name === 'JSONWebTokenError') {
            return res.status(401).json(
                {
                    message: "Invalid Refresh Token!!"
                }
            )
        }
    }
})

export const logoutController = asyncHandler(async(req:Request,res:Response) => {
    try {
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');

        return res.status(201).json({
            message:"User Logged Out Successfully!!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error while logging out!!!"
        })
    }
})

export const changePasswordController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const {oldPassword, newPassword} = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Please provide old and new password!!"
            });
        }

        if (oldPassword === newPassword) {
            return res.json({
                message: "New password cannot be same as old password!!"
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                id: req.user?.id
            }
        })

        if (!user) {
            throw new Error("User not found!!");
        }

        const passwordCheck = await isPasswordCorrect(oldPassword,user.password);

        if (!passwordCheck) {
            return res.json({
                message: "Old password is incorrect!!"
            });
        }

        const newPasswordHashed = await hashedPassword(newPassword);

        await prisma.user.update({
            where: {
                id: user.id
            }, 
            data: {
                password: newPasswordHashed
            }
        });

        await emailService.sendPasswordChangeConfirmation(
            user.name,
            user.email
        )

        return res.status(201).json({
            message: "Password Changed Successfully!!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error while changing the password!!"
        });
    }
})

export const changeEmailController = asyncHandler(async(req:Request,res:Response) => {
    try {
        const {password , newEmail} = req.body;

        if(!password || !newEmail) {
            return res.status(400).json({
                message: "Please provide password and new email!!"
            })
        }

        const user =  await prisma.user.findUnique({
            where: {
                id: req.user?.id
            }
        })

        if(!user) {
            return res.status(400).json({
                message: "User not found!!"
            })
        }

        if(user.email === newEmail) {
            return res.status(400).json({
                message: "New email cannot be same as old email!!" 
            })
        }

        const passwordCheck = await isPasswordCorrect(password, user.password);

        if (!passwordCheck) {
            return res.status(400).json({
                message: "Password Entered is wrong!!"
            });
        }

        const emailUpdated = await prisma.user.update({
            where: {
                id:user.id
            },
            data: {
                email: newEmail
            }
        });

        await emailService.sendEmailChangeNotification(
            emailUpdated.name,
            user.email,
            emailUpdated.email
        )
        
        const userResponse = {
            id:user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return res.status(200).json({
            message: `Email has been updated to ${newEmail}`,
            user: userResponse,
            status: 200
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error while changing the email!!"
        })
    }
})

export const userProfile = asyncHandler(async(req:Request,res:Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id
            }
        });

        if (!user) {
            return res.status(401).json({
                message:"User not Found!!"
            })
        }

        const userResponse = {
            id:user.id,
            name:user.name,
            username:user.name,
            email:user.email,
            createdAt:user.createdAt
        }

        return res.status(200).json({
            message: "User profile fetched successfully!!",
            user: userResponse
        });
    } catch (error:any) {
        console.log("Error: ",error.message);
        return res.status(500).json({
            message: "Server error while fetching the user profile"
        });
    }
})