import express, { Application, Request, Response, NextFunction } from 'express';
const functions = require("./functions");
import globalMiddlewares from './middlewares';
import moviesControllers from './components/Movies/controllers';
import usersControllers from './components/Users/controllers';
import tvSeriesControllers from './components/TVSeries/controllers';
import { authController } from './components/auth/controllers';
const cors = require('cors')

// sebida siia vb veel infi juurde, mida logida võiks
const logger = (req: Request, res: Response, next: NextFunction) => {
    // kirjutame faili ka selle sisu
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.url} ${JSON.stringify(req.headers)}`);
    next();
};

const PORT = 3000;

export const app:Application = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost'}));
// mingi middleware välja mõtlemine ehk konkreetse routi jaoks?
app.use(logger);
 
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json(
        {
            success: true,
            message: 'Meiega on kõik OK!! Anna päringutel minna!'
        }
    );
});

app.get('/api/v1/token', globalMiddlewares.isLoggedIn, authController.tokenOK);

app.post('/api/v1/login', authController.login);

/* 
kasutajate
blokk
*/
// päri kõik kasutajad
app.get('/api/v1/users', globalMiddlewares.isLoggedIn, usersControllers.getAllUsers);

app.get('/api/v1/usersroles', globalMiddlewares.isLoggedIn, usersControllers.getAllUsersWithRoles);

app.get('/api/v1/userexists/:username', usersControllers.userExists);

// Kasutaja pärimine kasutajanime alusel
app.get('/api/v1/users/:username',  globalMiddlewares.isLoggedIn, usersControllers.getUserByUsername);

// lisa uus kasutaja
app.post('/api/v1/users', globalMiddlewares.isLoggedIn, globalMiddlewares.checkCreationData('users'), usersControllers.createUser);

// kustuta kasutaja
app.delete('/api/v1/users/:username', globalMiddlewares.isLoggedIn, globalMiddlewares.isAdmin, usersControllers.deleteUser);
// nii oleks VB parem isegi olnud
// app.delete('/api/v1/users:username', usersControllers.deleteUser);

/* 
filmide
blokk
*/
app.get('/api/v1/movies', globalMiddlewares.isLoggedIn, moviesControllers.getAllMovies);

// Filmide pärimine pealkirja sisu järgi
// Keyword, sest tagastatalse kõik filmid, mis sisaldavad pealkirjas otsitavat
app.get('/api/v1/movies/:titleKeyword', globalMiddlewares.isLoggedIn, moviesControllers.getMovieTitlesByKeyword);

app.get('/api/v1/movies&id=:id', globalMiddlewares.isLoggedIn, moviesControllers.getMoviesById);

app.post('/api/v1/movies', globalMiddlewares.isLoggedIn, globalMiddlewares.isAdmin, globalMiddlewares.checkCreationData('movies'), moviesControllers.createMovie);

app.delete('/api/v1/movies&id=:id', globalMiddlewares.isLoggedIn, globalMiddlewares.isAdmin, moviesControllers.deleteMovie);

/* 
telesaadete
blokk
*/
app.get('/api/v1/tvseries', globalMiddlewares.isLoggedIn, tvSeriesControllers.getAllTvSeries);

app.get('/api/v1/tvseries/:titleKeyword', globalMiddlewares.isLoggedIn, tvSeriesControllers.getTvSeriesTitlesByKeyword);

app.get('/api/v1/tvseries&id=:id', globalMiddlewares.isLoggedIn, tvSeriesControllers.getTvSeriesById);

app.post('/api/v1/tvseries', globalMiddlewares.isLoggedIn, globalMiddlewares.isAdmin, globalMiddlewares.checkCreationData('tvseries'), tvSeriesControllers.createTvSeries);

app.delete('/api/v1/tvseries&id=:id', globalMiddlewares.isLoggedIn, globalMiddlewares.isAdmin, tvSeriesControllers.deleteTvSeries);

app.listen(PORT, () => { console.log('Server is running'); });

// TODO
// patch päringud andmete muutmiseks
// testida kõik route'd
// interface/tüüpe rohkem kirjeldada igalpool.. ntks SQL kasutajate pärimisel [UserInterfaceWithRolesFromDB]
// rollid teatud routidele
// kuidas front-endile asju pärida API'st
// regex parameetritele?
