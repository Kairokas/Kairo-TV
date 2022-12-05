import { UserInterface, UserInterfaceFromDB, UserInterfaceWithRolesFromDB } from "./interfaces";
import { getDataFromDB, insertDataToDB, deleteDataFromDB } from "../../functions";

const usersServices = {
    findUserByUsername: async (username: string) => {
        // siin teeme joini users ja rollide vahel, et teada saada kasutaja õigused
        let user:UserInterfaceFromDB | undefined = await getDataFromDB(`SELECT email, username, password FROM User WHERE username = ?`, [username]);
        //console.log(user);
        //let user = usersFromDB.find(element => element.username === username);

        //let user: UserInterface | undefined = data;
        return user;
    },
    getUserRoles: async (username: string) => {
        let roles:string[] = [];
        let id:number;
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
        let usersRoles:any[] = [];
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
            if (usersRoles.length == 0) {
                usersRoles.push({username: item.Username, roles: [item.Rolename]})
            }
            
            usersRoles.forEach((user)=>{
                if (user.username != item.Username) {
                    usersRoles.push({username: item.Username, roles: [item.Rolename]})
                } else {
                    user.roles.push(item.Rolename);
                }
            });

            // if (!usersRoles.includes(item.username)) {
            //     usersRoles.push({username: item.Username, roles: [item.Rolename]})
            //     // usersRoles[item.Username] = [item.Rolename];
            // } else {
            //     usersRoles.forEach((user)=>{
            //         if (user.username === item.Username) {
            //             user.roles.push(item.Rolename);
            //         }
            //     });
            //     //usersRoles[item.Username].push(item.Rolename);
            // }
        });

        //console.log(usersRolesRows);
        console.log(usersRoles);
        // return usersRoles;
    },
    getAllUsers: async () => {
        let users = await getDataFromDB(`SELECT email, username FROM User`, undefined);
        //console.log(users);
        return users;
    },
    createUser: async (user: UserInterface) => {
        const newUser: UserInterface = {
            email: user.email,
            password: user.password,
            username: user.username
        };

        let newUserExists = await getDataFromDB(`SELECT email, username FROM User WHERE username = ?`, [newUser.username]);
        
        if (newUserExists) {
            return false;
        } else {
            // enne krüptime parooli ja siis saltime ka veel
            insertDataToDB("INSERT INTO User VALUE (?, ?, ?)", [user.email, user.password, user.username]);

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
    }
};

export default usersServices;