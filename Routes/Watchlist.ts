import express from 'express';
import getWatchlistVideos from '../controllers/watchlist';

const router = express.Router();

router.get('/getWatchlistVideos', getWatchlistVideos);

export = router;
