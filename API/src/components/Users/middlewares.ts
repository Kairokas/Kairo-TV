import { Request, Response, NextFunction } from "express";

const usersMiddlewares = {
    checkUpdateUserData: (req: Request, res: Response, next: NextFunction) => {
        const { email, oldPassword, newPassword } = req.body;
        
        if (email === '' && newPassword === '') {
            return res.status(404).json({
                success: false,
                error: 'Nothing to change',
            });
        }

        if (oldPassword === newPassword && email === '') {
            return res.status(401).json({
                success: false,
                error: "You can't use the same password twice!",
            });
        }
        
        return next();
    }
        //     if (resource === "users") {
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