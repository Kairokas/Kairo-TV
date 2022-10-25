import usersServices from '../Users/services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();

export const loginServices = {
    login: async (username: string, password: string) => {
        let saltRounds: number;
        let jwt_password: string;
        const user = await usersServices.findUserByUsername(username);

        // Alumise puudumisel
        if (process.env.SALT_ROUNDS) {
            saltRounds = parseInt(process.env.SALT_ROUNDS);
        } else {
            throw new Error("SALT_ROUNDS environment variable is not set")
        }

        if (process.env.JWT_PASSWORD) {
            jwt_password = process.env.JWT_PASSWORD;
        } else {
            throw new Error("JWT_PASSWORD environment variable is not set")
        }
        
        // kui kasutajat ei eksisteeri baasis
        if (!user) return false;
        
        // alloleva eemaldame kui saame hashitud paroolid andmebaasi poole
        // või kui saame front endis kasutajaid andmebaasi lisada/registreerida
        let fake_pw = await bcrypt.hash('VSjkziw', saltRounds);

        const match = await bcrypt.compare(password, fake_pw);

        // kui sisestati vale parool
        if (!match) return false;
        //console.log(match);
        // const userRoles = await usersServices.getUserRoles(username);
        const userRoles = ["user", "admin"];
        // const token = await jwtService.sign(user);
        const payload = {
            username: username,
            roles: userRoles
        };
        //console.log(payload);
        const token = jwt.sign(payload, jwt_password, { expiresIn: '20m' });

        return token;
    }
}