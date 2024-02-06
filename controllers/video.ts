import express, { Request, Response, Router } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import { Watchlist } from '../Entities/watchlist';
import { Video } from '../Entities/video';
import { Readable, Transform } from 'stream';
const pipeline = promisify(require('stream').pipeline);


export const addVideo = async (req: Request, res: Response) => {
    try {
        const { watchlistId } = req.params;
        const id = parseInt(watchlistId);

        // Check if the watchlist exists
        const watchlist = await Watchlist.findOneBy({ id });
        if (!watchlist) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Watchlist not found'
            });
        }

        // Check if a video file is included in the request
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'No video file provided'
            });
        }

        // Process the uploaded video
        const videoData = req.file.buffer;
        const videoName = req.file.originalname;

        // Create a Video entity
        const video = Video.create({
            name: videoName,
            url: `/videos/${videoName}`,
            watchlist: watchlist,
        });
        const path = `./public/videos/${videoName}`;

        await pipeline(
            Readable.from(videoData),
            fs.createWriteStream(path)
        );
        await video.save();

        return res.json({
            status: 'success',
            code: 200,
            message: 'Video added successfully'
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        return res.status(500).json({
            status: 'error',
            code: 500,
            message: 'Internal Server Error',
            error: 'Internal Server Error'
        });
    }
};



