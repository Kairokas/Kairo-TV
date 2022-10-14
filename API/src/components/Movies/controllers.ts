import { Request, Response } from "express";
import { MovieInterface } from "./interfaces";
import movieServices from "./services";

const moviesControllers = {
    getAllMovies: (req: Request, res: Response) => {
        const movies = movieServices.findAllMovies();

        res.status(200).json({
            success: true,
            message: 'List of movies in database.',
            movies: movies
        });
    },
    getMovieTitlesByKeyword: (req: Request, res: Response) => {
        const keyword = req.params.titleKeyword;
        let movies = movieServices.findMoviesByKeyword(keyword);
        
        if (movies.length == 0) {
            return res.status(404).json({
                success: false,
                message: `No movie titles match your searched keyword.`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Found titles which contain ${keyword} in them.`,
            movies: movies
        });
    },
    getMoviesById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let movie: MovieInterface | undefined = movieServices.findMovieById(id);
        
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: `Movie not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Requested movie at your command.`,
            movie: movie
        });
    },
    createMovie: (req: Request, res: Response) => {
        const { id, movieTitle, releaseYear, locationURI, price } = req.body;

        const newMovie: MovieInterface = {
            id,
            movieTitle,
            releaseYear,
            locationURI,
            price
        };

        if (movieServices.createMovie(newMovie)) {
            return res.status(201).json({
                success: true,
                message: `Movie with title ${movieTitle} created`,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: `Movie with title ${movieTitle} already exists`
            });
        }
    },
    deleteMovie: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        let movie: MovieInterface | undefined = movieServices.findMovieById(id);
        
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: `Movie not found`
            });
        } else {
            movieServices.deleteMovie(id);

            return res.status(201).json({
                success: true,
                message: `Movie ${movie.movieTitle} deleted.`
            });
        }
    }
};

export default moviesControllers;
