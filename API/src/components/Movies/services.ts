import { MovieInterface } from "./interfaces";
import getDataFromDB from "../../functions";

const moviesServices = {
    findAllMovies: async () => {
        let movies = await getDataFromDB(`SELECT * FROM Movies`);        

        return movies;
    },
    findMoviesByKeyword: async (keyword: string) => {
        let matchingMovies = await getDataFromDB(`SELECT * FROM Movies WHERE Title LIKE '%${keyword}%'`);
        
        return matchingMovies;
    },
    // createMovie: async (movie: MovieInterface) => {
    //     let newMovieExists: MovieInterface | undefined = moviesFromDB.find(element => element.movieTitle === movie.movieTitle);
        
    //     if (newMovieExists) {
    //         return false;
    //     } else {
    //         // või lisame andmebaasi
    //         moviesFromDB.push(movie);

    //         return true;
    //     }
    // },
    findMovieById: async (id: number) => {
        let movie = await getDataFromDB(`SELECT * FROM Movies WHERE ID = ${id}`);
        
        return movie;
    },
    // deleteMovie: async (id: number) => {
    //     // peaksime tegelt andmebaasist kustutama
    //     //
    //     const newMoviesFromDB = moviesFromDB.filter(element => !(element.id === id));

    //     console.log(newMoviesFromDB);
    // }
}

export default moviesServices;