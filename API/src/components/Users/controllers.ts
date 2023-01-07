import { Request, Response } from "express";
import { UserInterface, UserInterfaceWithRolesFromDB, UsernameInterfaceFromDB } from "./interfaces";
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
        const user: undefined | UsernameInterfaceFromDB = await usersServices.findUserByUsername(username);
        
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
    getAllUsersWithRoles: async (req: Request, res: Response) => {
        const users = await usersServices.getAllUsersWithRoles();
        
        res.status(200).json({
            success: true,
            message: 'List of users registered with roles.',
            users: users
        });
    },
    getUserRoles: async (req: Request, res: Response) => {
        const username:string = req.params.username;
        const user: undefined | UsernameInterfaceFromDB = await usersServices.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            });
        } else {
            const userWithRoles:UserInterfaceWithRolesFromDB = await usersServices.getUserRoles(username);

            return res.status(200).json({
                success: true,
                message: `List of user roles`,
                user: user.username,
                roles: userWithRoles.roles
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
    },
    userExists: async (req: Request, res: Response) => {
        const username = req.params.username;
        const userExists: boolean = await usersServices.doesUserExist(username);
        
        if (!userExists) {
            return res.status(200).json({
                success: false,
                message: `User not found`
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `User does exist.`
            });
        }
    },
    updateUserRoles: async (req: Request, res: Response) => {
        const { username, roles } = req.body;
        const newUser:UserInterfaceWithRolesFromDB = {
            username: username,
            roles: roles
        }

        let user = await usersServices.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            });
        } else {
            usersServices.updateUserRoles(newUser);

            return res.status(201).json({
                success: true,
                message: `User ${username} updated.`
            });
        }
    }
};

export default usersControllers;
