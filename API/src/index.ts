import express, { Request, Response, NextFunction } from 'express';
const functions = require("./functions");
import globalMiddlewares from './middlewares';
import moviesControllers from './components/Movies/controllers';
import usersControllers from './components/Users/controllers';
import tvSeriesControllers from './components/TVSeries/controllers';

const app = express();

app.use(express.json());

const PORT = 3000;

// sebida siia vb veel infi juurde, mida logida võiks
const logger = (req: Request, res: Response, next: NextFunction) => {
    // kirjutame faili ka selle sisu
    console.log(`${new Date().toISOString} ${req.method} ${req.url}`);
    next();
};

// mingi middleware välja mõtlemine ehk konkreetse routi jaoks?
app.use(logger);
 
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json(
        {message: 'Meiega on kõik OK!! Anna päringutel minna!'}
    );
});

/* 
kasutajate
blokk
*/
// päri kõik kasutajad
app.get('/api/v1/users', usersControllers.getAllUsers);

// Kasutaja pärimine kasutajanime alusel
app.get('/api/v1/users/:username', usersControllers.getUserByUsername);

// lisa uus kasutaja
app.post('/api/v1/users', globalMiddlewares.checkCreationData('users'), usersControllers.createUser);

// kustuta kasutaja
app.delete('/api/v1/users/:username', usersControllers.deleteUser);
// nii oleks VB parem isegi olnud
//app.delete('/api/v1/users:username', usersControllers.deleteUser);

/* 
filmide
blokk
*/
app.get('/api/v1/movies', moviesControllers.getAllMovies);

// Filmide pärimine pealkirja sisu järgi
// Keyword, sest tagastatalse kik filmid, mis sisaldavad pealkirjas otsitavat
app.get('/api/v1/movies/:titleKeyword', moviesControllers.getMovieTitlesByKeyword);

app.get('/api/v1/movies&id=:id', moviesControllers.getMoviesById);

app.post('/api/v1/movies', globalMiddlewares.checkCreationData('movies'), moviesControllers.createMovie);

app.delete('/api/v1/movies&id=:id', moviesControllers.deleteMovie);

/* 
telesaadete
blokk
*/
app.get('/api/v1/tvseries', tvSeriesControllers.getAllTvSeries);

app.get('/api/v1/tvseries/:titleKeyword', tvSeriesControllers.getTvSeriesTitlesByKeyword);

app.get('/api/v1/tvseries&id=:id', tvSeriesControllers.getTvSeriesById);

app.post('/api/v1/tvseries', globalMiddlewares.checkCreationData('tvseries'), tvSeriesControllers.createTvSeries);

app.delete('/api/v1/tvseries&id=:id', tvSeriesControllers.deleteTvSeries);

app.listen(PORT, () => { console.log('Server is running'); });

// TODO
// patch päringud andmete muutmiseks