import type { Request, Response, NextFunction } from "express";
type reqHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | void;
export declare const asyncHandler: (asyncRequest: reqHandler) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map