import { TVSeriesInterface } from "./components/TVSeries/interfaces";
import { MovieInterface } from "./components/Movies/interfaces";
import { UserInterface } from "./components/Users/interfaces";

const usersFromDB: UserInterface[] = [
    {
        username: 'Jurra1',
        email: 'juhan@juurikas.ee',
        password: 'ArnoLaksKooli!',
    },
    {
        username: 'Maasikas69',
        email: 'kalle@hot.ee',
        password: 'parool123',
    }
];

const moviesFromDB: MovieInterface[] = [
    {
        id: 1,
        movieTitle: 'Texas Chainsaw Massacres',
        releaseYear: 1989,
        locationURI: 'https://telia.tv/api/v1/texas22',
        price: 20
    },
    {
        id: 2,
        movieTitle: 'Avengers',
        releaseYear: 2020,
        locationURI: '\\\\tln-s2\\filmid\\Marvel\\',
        price: 20
    }
];

const tvSeriesFromDB: TVSeriesInterface[] = [
    {
        id: 1,
        seriesTitle: 'Big Bang Theory',
        releaseYear: 2004,
        episodes: 846,
        locationURI: '\\\\tln-s2\\filmid\\2000ndad\\bbt\\',
        price: 10
    },
    {
        id: 2,
        seriesTitle: 'You',
        releaseYear: 2021,
        episodes: 45,
        locationURI: '\\\\tln-s2\\filmid\\2010ndad\\',
        price: 10
    }
];

export { usersFromDB, moviesFromDB, tvSeriesFromDB };
