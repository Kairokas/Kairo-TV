import { UserInterface } from "./interfaces";
import { getDataFromDB, insertDataToDB, deleteDataFromDB } from "../../functions";

const usersServices = {
    findUserByUsername: async (username: string) => {
        let user = await getDataFromDB(`SELECT email, username FROM Users WHERE username = '${username}'`);
        //console.log(user);
        //let user = usersFromDB.find(element => element.username === username);

        //let user: UserInterface | undefined = data;
        return user;
    },
    getAllUsers: async () => {
        let users = await getDataFromDB(`SELECT email, username FROM Users`);
        //console.log(users);
        return users;
    },
    createUser: async (user: UserInterface) => {
        const newUser: UserInterface = {
            email: user.email,
            password: user.password,
            username: user.username
        };

        let newUserExists = await getDataFromDB(`SELECT email, username FROM Users WHERE username = '${user.username}'`);
        
        if (newUserExists) {
            return false;
        } else {
            // enne krüptime parooli ja siis saltime ka veel
            insertDataToDB("INSERT INTO Users value (?, ?, ?)", [user.email, user.password, user.username]);

            return true;
        }
    },
    deleteUser: (username: string) => {
        deleteDataFromDB(`DELETE FROM Users WHERE username = '${username}'`)
    },
    // https://www.section.io/engineering-education/password-strength-checker-javascript/
    checkPWCompatibility(password: string):boolean {
        let regexRequirements = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        
        if (regexRequirements.test(password)) {
            return true;
        } else {
            return false;
        }
    }
};

export default usersServices;