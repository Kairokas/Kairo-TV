import { TVSeriesInterface } from "./interfaces";
import { getDataFromDB, insertDataToDB, deleteDataFromDB } from "../../functions";

const tvSeriesServices = {
    findAllTvSeries: async () => {
        let tvSeries = await getDataFromDB(`SELECT * FROM TvSeries`);

        return tvSeries;
    },
    findTvSeriesByKeyword: async (keyword: string) => {
        let matchingTvSeries = await getDataFromDB(`SELECT * FROM TvSeries WHERE Title LIKE '%${keyword}%'`);
        
        return matchingTvSeries;
    },
    createTvSeries: async (tvSeries: TVSeriesInterface) => {
        const newTvSeries: TVSeriesInterface = {
            seriesTitle: tvSeries.seriesTitle,
            releaseYear: tvSeries.releaseYear,
            episodes: tvSeries.episodes,
            seasons: tvSeries.seasons,
            locationURI: tvSeries.locationURI,
            price: tvSeries.price
        }

        let newTvSeriesExists = await getDataFromDB(`SELECT * FROM TvSeries WHERE Title = '${tvSeries.seriesTitle}'`);
        
        if (newTvSeriesExists) {
            return false;
        } else {
            insertDataToDB("INSERT INTO TvSeries value (?, ?, ?, ?, ?, ?)", [tvSeries.seriesTitle, tvSeries.releaseYear, tvSeries.episodes, tvSeries.seasons, tvSeries.locationURI, tvSeries.price]);

            return true;
        }
    },
    findTvSeriesById: async (id: number) => {
        let tvSeries = await getDataFromDB(`SELECT * FROM TvSeries WHERE ID = ${id}`);
        
        return tvSeries;
    },
    deleteTvSeries: async (id: number) => {
        deleteDataFromDB(`DELETE FROM TvSeries WHERE ID = '${id}'`)
    }
}

export default tvSeriesServices;
