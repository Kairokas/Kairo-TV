import { Request, Response } from "express";
import { UserInterface } from "./interfaces";
import usersServices from "./services";

const usersControllers = {
    getAllUsers: async (req: Request, res: Response) => {
        const users = await usersServices.getAllUsers();
        
        res.status(200).json({
            success: true,
            message: 'List of users registered.',
            users: users
        });
    },
    getUserByUsername: async (req: Request, res: Response) => {
        const username = req.params.username;
        let user = await usersServices.findUserByUsername(username);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `Requested user at your command.`,
                user: user
            });
        }
    },
    createUser: async (req: Request, res: Response) => {
        const { email, password, username } = req.body;

        const newUser: UserInterface = {
            email,
            password,
            username
        };

        if (usersServices.checkPWCompatibility(password)) {
            if (await usersServices.createUser(newUser)) {
            
                return res.status(201).json({
                    success: true,
                    message: `User with username ${username} created`,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: `User with username ${username} already exists`
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: `Password doesn't meet it's requirements (8 characters, 1 uppercase letter and 1 symbol)`
            });
        }
    },
    deleteUser: async (req: Request, res: Response) => {
        const username = req.params.username;

        let user = await usersServices.findUserByUsername(username);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            });
        } else {
            usersServices.deleteUser(username);

            return res.status(201).json({
                success: true,
                message: `User ${username} deleted.`
            });
        }
    }
};

export default usersControllers;
