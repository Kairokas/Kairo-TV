import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const globalMiddlewares = {
    checkCreationData: function(resource: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (resource === "users") {
                const { email, username, password } = req.body;
    
                if (!email || !username || !password) {
                    return res.status(400).json({
                        success: false,
                        message: `Some data is missing (email, username, password)`
                    });
                };
                
                next();
            } else if (resource === "movies") {
                const { movieTitle, releaseYear, locationURI, price } = req.body;
    
                if (!movieTitle || !releaseYear || !locationURI  || !price) {
                    return res.status(400).json({
                        success: false,
                        message: `Some data is missing (movieTitle, releaseYear, locationURI, price)`
                    });
                };
    
                next();
            } else if (resource === "tvseries") {
                const { seriesTitle, releaseYear, episodes, seasons, locationURI, price } = req.body;
    
                if (!seriesTitle || !releaseYear || !episodes || !seasons || !locationURI  || !price) {
                    return res.status(400).json({
                        success: false,
                        message: `Some data is missing (seriesTitle, releaseYear, episodes, locationURI, price)`
                    });
                };
    
                next();
            }
        }
    },
    isLoggedIn: async function (req: Request, res: Response, next: NextFunction) {
        let jwt_password;
        const token = req.headers.authorization;
        //const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
            error: 'No token provided',
            });
        }

        if (process.env.JWT_PASSWORD) {
            jwt_password = process.env.JWT_PASSWORD;
        } else {
            throw new Error("JWT_PASSWORD environment variable is not set")
        }

        try {
            const payload = jwt.verify(token, jwt_password);

            res.locals.user = payload;

            return next();
        } catch(err) {
            console.log("saime errori:" + err);
            return res.status(401).json({
                error: 'Invalid token',
            });
        }
    },
    isAdmin: async function (req: Request, res: Response, next: NextFunction) {
        if (res.locals.user.roles.includes("admin")) {
            return next();
        } else {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
        
    }
    // checkCreationData: (req: Request, res: Response, next: NextFunction, resource: string) => {
        
    //}
}

export default globalMiddlewares;

// TODO
// VB eraldi interface'de juurde middleservicetena? andmete valideerimine (sümbolite eemaldus, email, numbrid, andmefailide asukoht, kuupäev, parool, kasutajanimi)
