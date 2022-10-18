import { MovieInterface } from "./interfaces";
import { getDataFromDB, insertDataToDB, deleteDataFromDB } from "../../functions";

const moviesServices = {
    findAllMovies: async () => {
        let movies = await getDataFromDB(`SELECT * FROM Movies`);        

        return movies;
    },
    findMoviesByKeyword: async (keyword: string) => {
        let matchingMovies = await getDataFromDB(`SELECT * FROM Movies WHERE Title LIKE '%${keyword}%'`);
        
        return matchingMovies;
    },
    createMovie: async (movie: MovieInterface) => {
        const newMovie: MovieInterface = {
            movieTitle: movie.movieTitle,
            releaseYear: movie.releaseYear,
            locationURI: movie.locationURI,
            price: movie.price
        }

        let newMovieExists = await getDataFromDB(`SELECT * FROM Movies WHERE Title = '${movie.movieTitle}'`);
        
        if (newMovieExists) {
            return false;
        } else {
            insertDataToDB("INSERT INTO Movies value (?, ?, ?, ?)", [movie.movieTitle, movie.releaseYear, movie.locationURI, movie.price]);

            return true;
        }
    },
    findMovieById: async (id: number) => {
        let movie = await getDataFromDB(`SELECT * FROM Movies WHERE ID = ${id}`);
        
        return movie;
    },
    deleteMovie: async (id: number) => {
        deleteDataFromDB(`DELETE FROM Movies WHERE ID = '${id}'`)
    }
}

export default moviesServices;