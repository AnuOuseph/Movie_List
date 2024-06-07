import express from 'express';
import cors from 'cors';
import http from 'http';

import movieRouter from './routes/movie.js';
import { handleError } from './utils/errorHandler.js';

const app = express();
const port = 5000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

// Routing Middlewares
app.use('/api/movies', movieRouter);

// ErrorHandling Middleware
app.use((err, req, res, next) => {
    handleError(err, res);
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});