import { Request, Response } from "express";
import { TVSeriesInterface } from "./interfaces";
import tvSeriesServices from "./services";

const tvSeriesControllers = {
    getAllTvSeries: async (req: Request, res: Response) => {
        const tvSeries = await tvSeriesServices.findAllTvSeries();

        res.status(200).json({
            success: true,
            message: 'List of TV series in database.',
            tvSeries: tvSeries
        });
    },
    getTvSeriesTitlesByKeyword: async (req: Request, res: Response) => {
        const keyword = req.params.titleKeyword;
        let tvSeries = await tvSeriesServices.findTvSeriesByKeyword(keyword);
        
        if (!tvSeries) {
            return res.status(404).json({
                success: false,
                message: `No TV series titles match your searched keyword.`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Found titles which contain ${keyword} in them.`,
            tvSeries: tvSeries
        });
    },
    getTvSeriesById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let tvSeries = await tvSeriesServices.findTvSeriesById(id);
        
        if (!tvSeries) {
            return res.status(404).json({
                success: false,
                message: `TV series not found`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Requested TV series at your command.`,
            tvSeries: tvSeries
        });
    },
    createTvSeries: async (req: Request, res: Response) => {
        const { seriesTitle, releaseYear, episodes, seasons, locationURI, price } = req.body;

        const newTvSeries: TVSeriesInterface = {
            seriesTitle,
            releaseYear,
            episodes,
            seasons,
            locationURI,
            price
        };

        if (await tvSeriesServices.createTvSeries(newTvSeries)) {
            return res.status(201).json({
                success: true,
                message: `TV series with title ${seriesTitle} created`,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: `TV series with title ${seriesTitle} already exists`
            });
        }
    },
    deleteTvSeries: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        let tvSeries = await tvSeriesServices.findTvSeriesById(id);
        
        if (!tvSeries) {
            return res.status(404).json({
                success: false,
                message: `TV series not found`
            });
        } else {
            tvSeriesServices.deleteTvSeries(id);

            return res.status(201).json({
                success: true,
                message: `TV series with ID ${id} deleted.`
            });
        }
    }
}

export default tvSeriesControllers;
