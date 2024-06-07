import express from 'express';
import movieController from '../controllers/movieController.js';

const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/search', movieController.searchMovies);

export default router;