import { Request, Response, NextFunction } from "express";

const usersMiddlewares = {
    // checkCreationData: (req: Request, res: Response, next: NextFunction, resource: string) => {
    //     if (resource === "users") {
    //         console.log(req.body);
    //     }
    // }
    // checkCreateUserData: (req: Request, res: Response, next: NextFunction) => {
    //     //console.log('Middleware');
    //     const { email, username, password } = req.body;

    //     if (!email || !username || !password) {
    //         return res.status(400).json({
    //             success: false,
    //             message: `Some data is missing (email, username, password)`,
    //         });
    //     };
        
    //     next();
    // }
};

export default usersMiddlewares;