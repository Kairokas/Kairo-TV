import { usersFromDB } from "../../mockData";
import { UserInterface } from "./interfaces";

const usersServices = {
    findUserByUsername: (username: string): UserInterface | undefined => {
        let user: UserInterface | undefined = usersFromDB.find(element => element.username === username);
        
        return user;
    },
    getAllUsers: () => {
        // Siin pöördume vist DB poole pärides kasutajad?
        // Aletrnatiiv oleks siin lause koostada aga eraldi fail kursori, connectioni jms. haldamiseks
        return usersFromDB;
    },
    createUser: (user: UserInterface): boolean => {
        const newUser: UserInterface = {
            email: user.email,
            password: user.password,
            username: user.username
        };

        let newUserExists: UserInterface | undefined = usersFromDB.find(element => element.username === user.username);
        
        if (newUserExists) {
            return false;
        } else {
            // või lisame andmebaasi
            usersFromDB.push(newUser);
            //console.log(users);
            return true;
        }
    },
    deleteUser: (username: string) => {
        usersFromDB.filter(element => element.username === username);

        console.log(usersFromDB);
    }
};

export default usersServices;