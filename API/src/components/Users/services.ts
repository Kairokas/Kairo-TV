import { UserInterface } from "./interfaces";
import getDataFromDB from "../../functions";

const usersServices = {
    findUserByUsername: async (username: string) => {
        let user = await getDataFromDB(`SELECT * FROM Users WHERE username = '${username}'`);
        //console.log(user);
        //let user = usersFromDB.find(element => element.username === username);

        //let user: UserInterface | undefined = data;
        return user;
    },
    getAllUsers: async () => {
        let users = await getDataFromDB(`SELECT * FROM Users`);
        //console.log(users);
        return users;
    },
    // createUser: (user: UserInterface): boolean => {
    //     const newUser: UserInterface = {
    //         email: user.email,
    //         password: user.password,
    //         username: user.username
    //     };

    //     let newUserExists: UserInterface | undefined = usersFromDB.find(element => element.username === user.username);
        
    //     if (newUserExists) {
    //         return false;
    //     } else {
    //         // või lisame andmebaasi
    //         usersFromDB.push(newUser);
    //         //console.log(users);
    //         return true;
    //     }
    // },
    // deleteUser: (username: string) => {
    //     usersFromDB.filter(element => element.username === username);

    //     console.log(usersFromDB);
    // }
};

export default usersServices;