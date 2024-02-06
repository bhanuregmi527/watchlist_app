import { Request, Response } from 'express';
import { Video } from '../Entities/video';

// getWatchlistVideos
const getWatchlistVideos = async (req: Request, res: Response) => {
    const watchlistId = req.params.watchlistId;

    try {
        const videos = await Video.find({ where: { watchlist: { id: Number(watchlistId) } } });
        res.json({ videos });
    } catch (error) {
        console.error('Error retrieving watchlist videos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export = getWatchlistVideos;
