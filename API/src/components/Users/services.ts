import { usersFromDB } from "../../mockData";
import { UserInterface } from "./interfaces";
require('dotenv').config();
const mariadb = require('mariadb');

const usersServices = {
    findUserByUsername: (username: string): UserInterface | undefined => {
        let user: UserInterface | undefined = usersFromDB.find(element => element.username === username);
        
        return user;
    },
    getAllUsers: async () => {
        let conn;
        // console.log(process.env);
        const pool = mariadb.createPool({
            host: process.env.APP_DB_HOST,
            user: process.env.APP_DB_USER,
            password: process.env.APP_DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // async function asyncFunction() {
        //     let conn;
        //     try {
        //         conn = await pool.getConnection();
        //         const rows = await conn.query("SELECT * from Users");
        //         console.log(rows); //[ {val: 1}, meta: ... ]
        //         const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //         console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

        //     } catch (err) {
        //         throw err;
        //     } finally {
        //         if (conn) return conn.end();
        //     }
        // }

        // await asyncFunction();

        conn = await pool.getConnection();
        let sql = `SELECT * FROM Users`;
        let result = await conn.query(sql);
        delete result.meta;
        //console.log(result);

        // Siin pöördume vist DB poole pärides kasutajad?
        // Aletrnatiiv oleks siin lause koostada aga eraldi fail kursori, connectioni jms. haldamiseks
        return result;
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