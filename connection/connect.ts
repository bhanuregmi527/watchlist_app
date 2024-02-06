import { createConnection } from 'typeorm';
import { Watchlist } from '../Entities/watchlist';
import { Video } from '../Entities/video';
import { join } from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const connectToDatabase = async () => {
    try {
        const connection = await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'bhanu',
            database: 'watchlist',
            entities: [Watchlist, Video],
            logging: false,
            synchronize: true,
        });
        console.log('Connected to the database');
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};

export = connectToDatabase;
