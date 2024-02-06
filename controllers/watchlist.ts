import { Request, Response } from 'express';
import { Video } from '../Entities/video';
import { Watchlist } from '../Entities/watchlist'

// getWatchlistVideos
export const getWatchlistVideos = async (req: Request, res: Response) => {
    const watchlistId = req.params.watchlistId;

    try {
        const watchlist = await Watchlist.find({ where: { isDeleted: false } });
        res.json({ watchlist });
    } catch (error) {
        console.error('Error retrieving watchlist videos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        // Save the watchlist to the database
        await watchlist.save();
        return res.status(201).json({ watchlist });
    } catch (error) {
        console.error('Error creating watchlist:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteWatchlist = async (req: Request, res: Response) => {
    const watchlistId: string = req.params.id;
    const id = parseInt(watchlistId)

    try {
        // Find the watchlist
        const watchlist = await Watchlist.findOneBy({ id });

        // Check if watchlist exists
        if (!watchlist) {
            return res.status(404).json({ error: 'Watchlist not found' });
        }
        watchlist.isDeleted = true;
        // Save the updated watchlist
        await watchlist.save();

        return res.json({ message: 'Watchlist  deleted successfully' });
    } catch (error) {
        console.error('Error  deleting watchlist:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
