import { TVSeriesInterface } from "./interfaces";

const tvSeriesServices = {
    // findAllTvSeries: () => {
    //     // Siin pöördume vist DB poole pärides kasutajad?
    //     // Aletrnatiiv oleks siin lause koostada aga eraldi fail kursori, connectioni jms. haldamiseks
    //     return tvSeriesFromDB;
    // },
    // findTvSeriesByKeyword: (keyword: string) => {
    //     let matchingTvSeries: TVSeriesInterface[] = [];

    //     tvSeriesFromDB.forEach(tvSeries => {
    //         if (tvSeries.seriesTitle.includes(keyword)) {
    //             matchingTvSeries.push(tvSeries);
    //         }
    //     });
    //     console.log(matchingTvSeries);
    //     return matchingTvSeries;
    // },
    // createTvSeries: (tvSeries: TVSeriesInterface): boolean => {
    //     let newTvSeriesExists: TVSeriesInterface | undefined = tvSeriesFromDB.find(element => element.seriesTitle === tvSeries.seriesTitle);
        
    //     if (newTvSeriesExists) {
    //         return false;
    //     } else {
    //         // või lisame andmebaasi
    //         tvSeriesFromDB.push(tvSeries);

    //         return true;
    //     }
    // },
    // findTvSeriesById: (id: number) => {
    //     let tvSeries: TVSeriesInterface | undefined = tvSeriesFromDB.find(element => element.id === id);
        
    //     return tvSeries;
    // },
    // deleteTvSeries: (id: number) => {
    //     const newTvSeriesFromDB = tvSeriesFromDB.filter(element => !(element.id === id));

    //     console.log(newTvSeriesFromDB);
    // }
}

export default tvSeriesServices;
