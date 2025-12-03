declare namespace Express {
    export interface Request {
        user?: {
            id: string;
            email: string;
            username: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}