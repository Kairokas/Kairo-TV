import { Request, Response } from "express";
import { MovieInterface } from "./interfaces";
import movieServices from "./services";

const moviesControllers = {
    getAllMovies: async (req: Request, res: Response) => {
        const movies = await movieServices.findAllMovies();

        res.status(200).json({
            success: true,
            message: 'List of movies in database.',
            movies: movies
        });
    },
    getMovieTitlesByKeyword: async (req: Request, res: Response) => {
        const keyword = req.params.titleKeyword;
        let movies = await movieServices.findMoviesByKeyword(keyword);
        
        if (!movies) {
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
    getMoviesById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let movie = await movieServices.findMovieById(id);

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
    createMovie: async (req: Request, res: Response) => {
        const { movieTitle, releaseYear, locationURI, price } = req.body;

        const newMovie: MovieInterface = {
            movieTitle,
            releaseYear,
            locationURI,
            price
        };

        if (await movieServices.createMovie(newMovie)) {
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
    deleteMovie: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        let movie = await movieServices.findMovieById(id);
        
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: `Movie not found`
            });
        } else {
            movieServices.deleteMovie(id);

            return res.status(201).json({
                success: true,
                message: `Movie with ID ${id} deleted.`
            });
        }
    }
};

export default moviesControllers;
