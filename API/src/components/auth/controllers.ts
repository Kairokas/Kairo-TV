import { Request, Response } from "express";
import { loginServices } from "./services";

export const authController = {
    login: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const token = await loginServices.login(username, password);

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Login failed',
                error: 'Wrong username or password'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Here, have a token.',
            token: token
        });
    },
}