import { moviesFromDB } from "../../mockData";
import { MovieInterface } from "./interfaces";

const moviesServices = {
    findAllMovies: () => {
        // Siin pöördume vist DB poole pärides kasutajad?
        // Aletrnatiiv oleks siin lause koostada aga eraldi fail kursori, connectioni jms. haldamiseks
        return moviesFromDB;
    },
    findMoviesByKeyword: (keyword: string) => {
        let matchingMovies: MovieInterface[] = [];

        moviesFromDB.forEach(movie => {
            if (movie.movieTitle.includes(keyword)) {
                matchingMovies.push(movie);
            }
        });
        
        return matchingMovies;
    },
    createMovie: (movie: MovieInterface): boolean => {
        let newMovieExists: MovieInterface | undefined = moviesFromDB.find(element => element.movieTitle === movie.movieTitle);
        
        if (newMovieExists) {
            return false;
        } else {
            // või lisame andmebaasi
            moviesFromDB.push(movie);

            return true;
        }
    },
    findMovieById: (id: number) => {
        let movie: MovieInterface | undefined = moviesFromDB.find(element => element.id === id);
        
        return movie;
    },
    deleteMovie: (id: number) => {
        // peaksime tegelt andmebaasist kustutama
        //
        const newMoviesFromDB = moviesFromDB.filter(element => !(element.id === id));

        console.log(newMoviesFromDB);
    }
}

export default moviesServices;