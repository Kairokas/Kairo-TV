import { Request, Response, NextFunction } from "express";

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
    }
    // checkCreationData: (req: Request, res: Response, next: NextFunction, resource: string) => {
        
    //}
}

export default globalMiddlewares;

// TODO
// VB eraldi interface'de juurde middleservicetena? andmete valideerimine (sümbolite eemaldus, email, numbrid, andmefailide asukoht, kuupäev, parool, kasutajanimi)
