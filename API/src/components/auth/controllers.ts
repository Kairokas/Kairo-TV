import { Request, Response } from "express";
import { loginServices } from "./services";
import jwt from 'jsonwebtoken';

export const authController = {
    login: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        
        if(!username || !password) {
            return res.status(401).json({
                success: false,
                message: 'Login failed',
                error: 'Username or password missing'
            });
        }

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
    tokenOK: async (req: Request, res: Response) => {
        let jwt_password:string;
        const token:string | undefined = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No token provided',
            });
        }

        if (process.env.JWT_PASSWORD) {
            jwt_password = process.env.JWT_PASSWORD;
        } else {
            throw new Error("JWT_PASSWORD environment variable is not set")
        }

        const payload = jwt.verify(token, jwt_password);

        if (typeof payload === 'string') {
            res.status(401).json(
                {
                    success: false,
                    error: 'Invalid token',
                }
            );
        } else {
            res.status(200).json(
                {
                    success: true,
                    message: 'Token OK!',
                    user: payload.username
                }
            );
        }
    }
}