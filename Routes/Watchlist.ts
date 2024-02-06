import express from 'express';
import multer from 'multer';
import { getWatchlistVideos, createWatchlist, deleteWatchlist } from '../controllers/watchlist';
import { addVideo } from '../controllers/video';

const router = express.Router();
//multer setup for video upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getWatchlistVideos', getWatchlistVideos);
router.post('/createWatchlist', createWatchlist);
router.get('/deleteWatchlist/:id', deleteWatchlist);
router.post('/uploadVideo/:watchlistId', upload.single('video'), addVideo)


export = router;
