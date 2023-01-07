import { UserInterface, UserInterfaceFromDB, UserInterfaceWithRolesFromDB } from "./interfaces";
import { getDataFromDB, insertDataToDB, deleteDataFromDB } from "../../functions";
import bcrypt from 'bcrypt';

const usersServices = {
    findUserByUsername: async (username: string) => {
        // siin teeme joini users ja rollide vahel, et teada saada kasutaja õigused
        // let user:UserInterfaceFromDB | undefined = await getDataFromDB(`SELECT email, username, password FROM User WHERE username = ?`, [username]);
        let user:any = await getDataFromDB(`SELECT ID, email, username, password FROM User WHERE username = ?`, [username]);

        if (typeof user !== 'undefined') {
            user = user[0];
        }
        //console.log(user);
        //let user = usersFromDB.find(element => element.username === username);

        //let user: UserInterface | undefined = data;
        return user;
    },
    getUserRoles: async (username: string) => {
        let roles:string[] = [];
        let userRolesRows:string[] = await getDataFromDB(`SELECT Username, Rolename FROM UserRoles WHERE username = ?`, [username]);

        userRolesRows.map((row:any) => {roles.push(row.Rolename);});
        //console.log(roles);
        const userRoles: UserInterfaceWithRolesFromDB = {
            username: username,
            roles: roles
        };
        //console.log(userRoles);
        return userRoles;
    },
    getAllUsersWithRoles: async () => {
        //let usersRoles:{username: string | undefined, roles: string[] | undefined};
        let usersRoles:any = {};
        let usersRolesRows:string[] = await getDataFromDB(`SELECT Username, Rolename FROM UserRoles`, undefined);

        // for (let key in usersRolesRows) {
        //     let value = usersRolesRows[key];
        //     console.log(JSON.stringify(key) + " : " + JSON.stringify(value))
        // }

        // const usersRoles: UserInterfaceWithRolesFromDB = {
        //     username: username,
        //     roles: roles
        // };

        usersRolesRows.map((item:any) => {
            if (usersRoles.hasOwnProperty(item.Username)) {
                usersRoles[item.Username]['roles'].push(item.Rolename);
            } else {
                usersRoles[item.Username] = {username: item.Username, roles: [item.Rolename]}
            }
        });

        return Object.values(usersRoles);
    },
    getAllUsers: async () => {
        let users = await getDataFromDB(`SELECT email, username FROM User`, undefined);
        //console.log(users);
        return users;
    },
    createUser: async (user: UserInterface) => {
        let saltRounds:number;

        if (process.env.SALT_ROUNDS) {
            saltRounds = parseInt(process.env.SALT_ROUNDS);
        } else {
            throw new Error("SALT_ROUNDS environment variable is not set")
        }

        const newUser: UserInterface = {
            email: user.email,
            password: user.password,
            username: user.username
        };

        let newUserExists = await getDataFromDB(`SELECT email, username FROM User WHERE username = ?`, [newUser.username]);
        
        if (newUserExists) {
            return false;
        } else {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            const DBResponse = await insertDataToDB("INSERT INTO User (Username, Password, Email) VALUE (?, ?, ?)", [user.username, hashedPassword, user.email]);

            insertDataToDB("INSERT INTO UserRoles (UserID, Username, RoleID, Rolename) VALUE (?, ?, ?, ?)", [DBResponse.insertId, user.username, 2, 'user']);

            return true;
        }
    },
    deleteUser: (username: string) => {
        deleteDataFromDB(`DELETE FROM User WHERE username = ?`, [username])
    },
    // https://www.section.io/engineering-education/password-strength-checker-javascript/
    checkPWCompatibility(password: string):boolean {
        let regexRequirements = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        
        if (regexRequirements.test(password)) {
            return true;
        } else {
            return false;
        }
    },
    doesUserExist: async (username: string) => {
        let userExists = await getDataFromDB(`SELECT username FROM User WHERE username = ?`, [username]);
        
        if (userExists) {
            return true;
        } else {
            return false;
        }
    },
    updateUserRoles: async (newUser: UserInterfaceWithRolesFromDB) => {
        const user:UserInterfaceFromDB = await usersServices.findUserByUsername(newUser.username);
        // kui oli admin kasutaja, siis muudeti tavaks
            // remove admin row
        // kui oli tava kasutaja, siis muudeti adminiks
            // insert admin row
        // kui uueks rolliks lisati admini roll
        if (newUser.roles.includes('admin')) {
            insertDataToDB("INSERT INTO UserRoles (UserID, Username, RoleID, Rolename) VALUE (?, ?, ?, ?)", [user.ID, user.username, 1, 'admin']);
        } else {
            deleteDataFromDB(`DELETE FROM UserRoles WHERE username = ? AND Rolename = ?`, [newUser.username, 'admin'])
        }

        return true;
    }
};

export default usersServices;