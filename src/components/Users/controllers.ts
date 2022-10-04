import { Request, Response } from "express";
import { UserInterface } from "./interfaces";
import usersServices from "./services";

const usersControllers = {
    getAllUsers: (req: Request, res: Response) => {
        const users = usersServices.getAllUsers();
        
        res.status(200).json({
            success: true,
            message: 'List of users registered.',
            users: users
        });
    },
    getUserByUsername: (req: Request, res: Response) => {
        const username = req.params.username;
        let user: UserInterface | undefined = usersServices.findUserByUsername(username);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Requested user at your command.`,
            data: {
                user: user
            },
        });
    },
    createUser: (req: Request, res: Response) => {
        const { email, password, username } = req.body;

        const newUser: UserInterface = {
            email,
            password,
            username
        };

        if (usersServices.createUser(newUser)) {
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
    },
    deleteUser: (req: Request, res: Response) => {
        const username = req.params.username;

        let user: UserInterface | undefined = usersServices.findUserByUsername(username);
        
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
