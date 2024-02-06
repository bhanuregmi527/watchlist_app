API Documentation

    1. Create Watchlist
        Endpoint: POST /api/createWatchlist
        Request Format:
        {
            "name": "My Watchlist"
        }
        Response Format:
        {
            "status": "success",
            "code": 201,
            "message": "Watchlist created successfully",
            "data": {
                "watchlist": {
                    "name": "Watchlist Name",
                    "id": 1,
                    "createdAt": "2024-02-06",
                    "isDeleted": false
                }
            }
        }
    2. List Watchlist Videos
        Endpoint: GET /api/listVideosInWatchlist/:watchlistId
        Response Format:
            {
                "status": "success",
                "code": 200,
                "message": "Videos in watchlist retrieved successfully",
                "data": {
                    "videos": [
                        {
                            "id": 2,
                            "name": "Outro.mp4",
                            "url": "/videos/Outro.mp4",
                            "isDeleted": false
                        },
                        {
                            "id": 3,
                            "name": "Outro.mp4",
                            "url": "/videos/Outro.mp4",
                            "isDeleted": false
                        },
                        {
                            "id": 4,
                            "name": "Outro.mp4",
                            "url": "/videos/Outro.mp4",
                            "isDeleted": false
                        }
                    ]
                }
            }
    3. Delete Watchlist
        Endpoint: DELETE /api/deleteWatchlist/:id
        Response Format:
        {
            "status": "success",
            "code": 200,
            "message": "Watchlist deleted successfully"
        }

        
    4.Add Video to Watchlist ( implemented stream pipeling to increase the speed of application)

        Endpoint: POST api/watchlists/:watchlistId
        Request Format:
        Body: Form data with video file
        Response Format:
            {
                "status": "success",
                "code": 200,
                "message": "Video added successfully"
            }
    5. Remove Video from Watchlist (Only Soft Delete)
            Endpoint: POST api/watchlists/:watchlistId/:videoId
            Response Format:
            {
                "status": "success",
                "code": 200,
                "message": "Video removed from watchlist successfully"
            }
    
    
Setup and Execution Instructions

    1. Clone the repository
    2. Install dependencies:
        npm install
    3. Create a .env file in the project root with the following environment variables:
        PORT=8080
        PASSWORD=your_db_password
        DB=Your_db_name
    4. Start the application:
        npm start

If you are using docker 

1. In connect.ts
         const connection = await createConnection({
            type: 'postgres',
            host: 'postgres',//change from localhost to postgres
            port: 5432,
            username: 'postgres',
            password: process.env.PASSWORD,
            database: process.env.DB,
            entities: [Watchlist, Video],
            logging: false,
            synchronize: true,
        });
2. docker-compose up --build
