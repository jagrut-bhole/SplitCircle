import type { Request,Response,NextFunction } from "express";

type reqHandler = (
    req : Request,
    res : Response,
    next : NextFunction
) => Promise<any> | void;

export const asyncHandler = (asyncRequest: reqHandler) => {
    return(req:Request,res:Response,next:NextFunction) => {
        Promise.resolve(asyncRequest(req,res,next)).catch(next);
    }
}