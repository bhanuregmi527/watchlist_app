import express from 'express';
import connectToDatabase from './connection/connect';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Importing routes
import watchlistRoutes from './Routes/Watchlist';

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use('/api', watchlistRoutes);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}).catch((error: any) => {
    console.log(error);
    console.error(`Error running the server`);
});
