import express from 'express';
import * as showController from '../controllers/showController.js';

const router = express.Router();

router.get('/', showController.getShows);
// router.get('/:id', showController.getSingleShow);
// router.post('/', showController.createSingleShow);
// router.put('/:id', showController.updateSingleShow);
// router.delete('/:id', showController.deleteSingleShow);

export default router;