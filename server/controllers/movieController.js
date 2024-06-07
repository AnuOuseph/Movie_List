import { readFile } from 'fs/promises';

const MOVIES_FILE_PATH = './movie.json';

export default {

    getMovies: async(req, res, next ) => {
        try {
            const data = await readFile(MOVIES_FILE_PATH, 'utf8');
            const movies = JSON.parse(data);
            return res.status(201).json({ message: "movie fetched successfully", data: movies });
        } catch (error) {
            next(error)
        }
    },

    searchMovies: async(req, res, next ) => {
        try {
            const title = req.query.title;
            if (!title) {
                return res.status(200).json({ message: "Movie Not Found", data: [] });
            }
    
            const data = await readFile(MOVIES_FILE_PATH, 'utf8');
            const movies = JSON.parse(data);
            const filteredMovies = movies.filter(movie =>
                movie.title.toLowerCase().includes(title.toLowerCase())
            );
    
            return res.status(200).json({ message: "Search successfull", data: filteredMovies });
        } catch (error) {
            next(error);
        }
    },

}