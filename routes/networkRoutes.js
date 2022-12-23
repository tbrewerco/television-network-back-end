import express from 'express';
import * as networkController from '../controllers/networkController.js';

const router = express.Router();

router.get('/', networkController.getNetworks);
router.get('/:id', networkController.getSingleNetwork);
router.post('/', networkController.createSingleNetwork);
router.put('/:id', networkController.updateSingleNetwork);
router.delete('/:id', networkController.deleteSingleNetwork);

export default router;