import { Request, Response } from 'express';
import { Video } from '../Entities/video';
import { Watchlist } from '../Entities/watchlist'

// getWatchlistVideos
export const getWatchlistVideos = async (req: Request, res: Response) => {
    const watchlistId = req.params.watchlistId;

    try {
        const watchlist = await Watchlist.find({ where: { isDeleted: false } });

        return res.json({
            status: 'success',
            code: 200,
            message: 'Watchlist videos retrieved successfully',
            data: { watchlist }
        });
    } catch (error) {
        console.error('Error retrieving watchlist videos:', error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error'
        });
    }
};

// Create Watchlist
export const createWatchlist = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        // Check if name is provided
        if (!name) {
            return res.status(400).json({ error: 'Name is required for creating a watchlist.' });
        }
        // Create a new watchlist
        const watchlist = Watchlist.create({ name });
        await watchlist.save();
        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Watchlist created successfully',
            data: { watchlist }
        });
    } catch (error) {
        console.error('Error creating watchlist:', error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error'
        });
    }
};

export const deleteWatchlist = async (req: Request, res: Response) => {
    const watchlistId: string = req.params.id;
    const id = parseInt(watchlistId);

    try {
        // Find the watchlist
        const watchlist = await Watchlist.findOneBy({ id });

        // Check if watchlist exists
        if (!watchlist) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Watchlist not found'
            });
        }

        watchlist.isDeleted = true;

        // Save the updated watchlist
        await watchlist.save();

        return res.json({
            status: 'success',
            code: 200,
            message: 'Watchlist deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting watchlist:', error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error'
        });
    }
};


export const listVideosInWatchlist = async (req: Request, res: Response) => {
    try {
        const { watchlistId } = req.params;
        const id = parseInt(watchlistId);

        // Find the watchlist
        const watchlist = await Watchlist.findOneBy({ id });
        if (!watchlist) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Watchlist not found'
            });
        }

        // Find videos associated with the watchlist
        const videos = await Video.find({ where: { watchlist, isDeleted: false } });

        return res.json({
            status: 'success',
            code: 200,
            message: 'Videos in watchlist retrieved successfully',
            data: { videos }
        });
    } catch (error) {
        console.error('Error listing videos:', error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error' // You may choose to include additional error details if needed
        });
    }
};


export const removeVideoFromWatchlist = async (req: Request, res: Response) => {
    try {
        const { watchlistId, videoId } = req.params;
        const watchlistIdInt = parseInt(watchlistId);
        const videoIdInt = parseInt(videoId);

        // Find the watchlist
        const watchlist = await Watchlist.findOneBy({ id: watchlistIdInt });
        if (!watchlist) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Watchlist not found'
            });
        }

        // Find the video in the watchlist
        const video = await Video.findOne({ where: { id: videoIdInt, watchlist } });
        if (!video) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Video not found in the watchlist'
            });
        }
        // Remove the video from the watchlist
        video.isDeleted = true;
        await video.save();

        return res.json({
            status: 'success',
            code: 200,
            message: 'Video removed from watchlist successfully'
        });
    } catch (error) {
        console.error('Error removing video from watchlist:', error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error'
        });
    }
};